import React, { useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import { file2base64 } from './file2base64';
import { CroppedFile, SelectedFile, Uploader3Props } from './types';
import { CroppInstance, UploaderCropp, UploaderCroppProps } from './UploaderCropp';
import { useFiles } from './useEditFile';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const createCroppedFile = (
  file: SelectedFile,
  croppAttributes: Pick<CroppedFile, 'imageData' | 'thumbData' | 'crop'>
): CroppedFile => {
  return { ...file, ...croppAttributes, status: 'cropped' };
};

const defaultCropOptions = {
  size: { width: '500px', height: '400px' },
  aspectRatio: 1,
};

export const Uploader3 = (props: Uploader3Props) => {
  const {
    children,
    className,
    style,
    multiple = false,
    accept = ['.jpg', '.jpeg', '.png', '.gif'],
    api,
    connector,
    onComplete,
    onUpload,
    onCropEnd,
    onCropCancel,
    onChange,
  } = props;

  const isMultiple = useMemo(() => multiple || false, [multiple]);
  const {
    currentFile,
    currentIndex,
    setCurrentFile,
    setCurrentIndex,
    setFiles,
    files: selectedFiles,
  } = useFiles<any[]>([]);
  const cropRef = useRef<CroppInstance>(null);

  let crop: any = props.crop;
  if (crop === true) {
    crop = defaultCropOptions;
  }

  const hasCrop = useMemo(() => !!props.crop || false, [props.crop]);
  const [showCrop, setShowCrop] = useState(false);

  const triggerComplete = (file: any) => {
    onComplete?.(file);
  };

  const doUpload = (files: any) => {
    if (!api && !connector) {
      throw new Error('Either api or connector must be provided');
    }

    Promise.all(
      files.map(async (curFile: any) => {
        curFile = { ...curFile };
        curFile.status = 'uploading';
        if (!curFile.imageData) {
          curFile.imageData = await file2base64(curFile.file);
        }
        onUpload?.(curFile);
        if (api) {
          const formData = new FormData();
          formData.append('imageBase64', curFile.imageData);
          formData.append('type', curFile.type);
          formData.append('name', curFile.name);

          return fetch(api, { method: 'POST', body: formData })
            .then(async (res) => {
              if (res.ok) {
                const { url } = await res.json();
                curFile = { ...curFile, status: 'done', url };
              } else {
                const { message } = await res.json();
                curFile = { ...curFile, status: 'error', message };
              }
              triggerComplete(curFile);
            })
            .catch(() => {
              curFile = { ...curFile, status: 'error' };
              triggerComplete(curFile);
            });
        } else if (connector) {
          return connector
            .postImage({
              imageData: curFile.imageData,
              type: curFile.type,
              name: curFile.name,
            })
            .then((result) => {
              const { url, cid } = result;
              curFile = {
                ...curFile,
                status: 'done',
                url: url,
                ipfs: 'ipfs://' + cid,
              };
              triggerComplete(curFile);
            })
            .catch(() => {
              curFile = { ...curFile, status: 'error' };
              triggerComplete(curFile);
            });
        }
      })
    ).then(() => {
      // all done
    });
  };

  const afterCroppAction = (file?: CroppedFile) => {
    if (currentIndex === selectedFiles.length - 1) {
      setShowCrop(false);
    } else {
      let nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      const currentFile = selectedFiles[nextIndex];
      cropRef.current?.replaceUrl(currentFile.previewUrl);
    }
    if (file) {
      doUpload([file]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': accept! },
    multiple,
    onDrop: async (acceptedFiles) => {
      const files = acceptedFiles.map((file) => {
        return {
          name: file.name,
          type: file.type,
          file,
          previewUrl: URL.createObjectURL(file),
          status: 'none',
        };
      });

      const changedFiles = isMultiple ? files : files[0];
      setFiles(files);
      onChange?.(changedFiles as any);

      if (hasCrop) {
        setShowCrop(true);
      } else {
        doUpload(files);
      }
    },
  });

  const handleCancel: Required<UploaderCroppProps>['onCancel'] = () => {
    currentFile.status = 'cancel';
    onCropCancel?.({ ...currentFile });
    afterCroppAction();
  };
  const handleConfirm: Required<UploaderCroppProps>['onConfirm'] = (params) => {
    const { imageData, thumbData, cropData } = params;
    const croppedFile = createCroppedFile(currentFile, {
      imageData,
      thumbData,
      crop: cropData,
    });
    setCurrentFile(croppedFile);
    onCropEnd?.(croppedFile);
    afterCroppAction(croppedFile);
  };

  return (
    <>
      <Wrapper style={style} {...getRootProps({ className })}>
        {children}
        <input {...getInputProps()} />
      </Wrapper>
      {currentFile && crop ? (
        <UploaderCropp
          ref={cropRef}
          size={crop.size!}
          aspectRatio={crop.aspectRatio!}
          show={showCrop}
          fileType={currentFile.type}
          fileUrl={currentFile.previewUrl!}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        ></UploaderCropp>
      ) : null}
    </>
  );
};
