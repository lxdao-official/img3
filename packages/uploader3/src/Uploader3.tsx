import React, { useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import type { Uploader3Connector } from '@lxdao/uploader3-connector';
import { file2base64 } from './file2base64';
import type { CroppedFile, SelectedFile, SelectedFiles, Uploader3Props } from './types';
import { UploaderCrop, type UploaderCroppProps } from './UploaderCrop';
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

const Uploader3DefaultProps = {
  multiple: false,
  accept: ['.jpg', '.jpeg', '.png', '.gif'],
  crop: true,
};

export const Uploader3 = (props: Uploader3Props) => {
  const {
    children,
    className,
    style,
    multiple,
    accept,
    api,
    connector,
    onComplete,
    onUpload,
    onCropEnd,
    onCropCancel,
    onChange,
  } = props;

  const {
    currentFile,
    currentIndex,
    setCurrentFile,
    setCurrentIndex,
    setFiles,
    files: selectedFiles,
  } = useFiles<any[]>([]);

  let cropOptions: any = props.crop;

  if (cropOptions === true) {
    cropOptions = defaultCropOptions;
  }

  const enableCrop = useMemo(() => !!cropOptions || false, [cropOptions]);
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
        const image: Uploader3Connector.PostImageFile = { data: curFile.imageData, type: curFile.type };
        if (api) {
          return fetch(api, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(image),
          })
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
            .postImage(image)
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
    }
    if (file) {
      doUpload([file]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': accept! },
    multiple,
    onDrop: async (acceptedFiles) => {
      const files: SelectedFiles = acceptedFiles.map((file) => {
        return {
          name: file.name,
          type: file.type,
          file,
          previewUrl: URL.createObjectURL(file),
          status: 'none',
        };
      });

      setFiles(files);
      onChange?.(files);

      if (enableCrop) {
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
      {currentFile && cropOptions ? (
        <UploaderCrop
          size={cropOptions.size!}
          aspectRatio={cropOptions.aspectRatio!}
          show={showCrop}
          fileType={currentFile.type}
          fileUrl={currentFile.previewUrl!}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        ></UploaderCrop>
      ) : null}
    </>
  );
};

Uploader3.defaultProps = Uploader3DefaultProps;
