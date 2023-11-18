import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import { file2base64 } from './file2base64';
import { UploaderCrop, UploaderCroppProps } from './UploaderCrop';
import { useFiles } from './useEditFile';

import type { Uploader3Connector } from '@lxdao/uploader3-connector';
import type { CroppedFile, SelectedFile, SelectedFiles, Uploader3Props } from './types';
import { acceptToMime } from './acceptToMime';

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

export const Uploader3: React.FC<React.PropsWithChildren<Uploader3Props>> = ({
  children,
  className,
  style,
  multiple = false,
  accept = ['.jpg', '.jpeg', '.png', '.gif'],
  api,
  crop = true,
  headers,
  connector,
  responseFormat,
  onComplete,
  onUpload,
  onCropEnd,
  onCropCancel,
  onChange,
}: Uploader3Props) => {
  const {
    currentFile,
    currentIndex,
    setCurrentFile,
    setCurrentIndex,
    setFiles,
    files: selectedFiles,
  } = useFiles<any[]>([]);

  let cropOptions: any = crop;

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
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
            body: JSON.stringify(image),
          })
            .then(async (res) => {
              if (res.ok) {
                let responseData = await res.json();

                if ('function' === typeof responseFormat) {
                  responseData = responseFormat(responseData);
                }

                const { url } = responseData;

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
            .then((result: { url: string; cid: string }) => {
              const { url, cid } = result;
              curFile = { ...curFile, status: 'done', url, ipfs: 'ipfs://' + cid };
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

  const afterCroppAction = useCallback(
    (file?: CroppedFile) => {
      if (currentIndex === selectedFiles.length - 1) {
        setShowCrop(false);
      } else {
        let nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
      }

      if (file) {
        doUpload([file]);
      }
    },
    [currentIndex, selectedFiles]
  );

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const files: SelectedFiles = acceptedFiles.map((file) => {
      const { name, type } = file;
      return { name, type, file, previewUrl: URL.createObjectURL(file), status: 'none' };
    });

    setFiles(files);
    onChange?.(files);

    if (enableCrop) {
      setShowCrop(true);
    } else {
      doUpload(files);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptToMime(accept),
    multiple,
    onDrop,
  });

  const handleCancel: Required<UploaderCroppProps>['onCancel'] = useCallback(() => {
    currentFile.status = 'cancel';
    onCropCancel?.({ ...currentFile });
    afterCroppAction();
  }, [currentFile]);

  const handleConfirm: Required<UploaderCroppProps>['onConfirm'] = useCallback(
    (params) => {
      const { imageData, thumbData, cropData } = params;
      const croppedFile = createCroppedFile(currentFile, {
        imageData,
        thumbData,
        crop: cropData,
      });
      setCurrentFile(croppedFile);
      onCropEnd?.(croppedFile);
      afterCroppAction(croppedFile);
    },
    [currentFile]
  );

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
        />
      ) : null}
    </>
  );
};
