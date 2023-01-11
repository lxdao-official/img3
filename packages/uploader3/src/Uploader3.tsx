import * as React from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

import cloneDeep from 'lodash.clonedeep';

import { UploaderCropp, CroppInstance } from './UploaderCropp';
import { CroppedFile, SelectedFile, Uploader3Props } from './types';
import { file2base64 } from './file2base64';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const createCroppedFile = (
  file: SelectedFile,
  croppAttributes: Pick<CroppedFile, 'imageData' | 'thumbnailData' | 'crop'>
): CroppedFile => {
  return { ...file, ...croppAttributes, status: 'cropped' };
};

const defaultCropOptions = {
  size: { width: '500px', height: '400px' },
  aspectRatio: 1,
};

export const Uploader3 = (props: Uploader3Props) => {
  const { children, className, style, multiple, api, connector } = props;

  const isMultiple = React.useMemo(() => multiple || false, [multiple]);
  const selectedFiles = React.useRef<any>(null);
  const cropRef = React.useRef<CroppInstance>(null);
  let crop: any;

  if (props.crop === true) {
    crop = defaultCropOptions;
  } else {
    crop = props.crop;
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': props.accept! },
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

      selectedFiles.current = isMultiple ? files : files[0];

      props.onSelected?.(selectedFiles.current);
      setEditIndex(0);
      if (hasCrop) {
        setShowCrop(true);
      } else {
        await doUpload(selectedFiles.current);
      }
    },
  });

  const hasCrop = React.useMemo(() => !!props.crop || false, [props.crop]);
  const [showCrop, setShowCrop] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState<number>(-1);

  function doUpload(files: any) {
    if (!api && !connector) {
      throw new Error('Either api or connector must be provided');
    }

    let uploadingFile = cloneDeep(files);
    async function uploading() {
      let uploadingFiles: any[] = isMultiple ? uploadingFile : [uploadingFile];

      for (let i = 0; i < uploadingFiles.length; i++) {
        const file = uploadingFiles[i];
        file.status = 'uploading';
        if (!file.imageData) {
          file.imageData = await file2base64(file.file);
        }
        if (api) {
          const formData = new FormData();
          formData.append('imageBase64', file.imageData);
          formData.append('type', file.type);
          formData.append('name', file.name);

          (function (index) {
            const currentFile = uploadingFiles[index];
            fetch(api, { method: 'POST', body: formData })
              .then(async (res) => {
                if (res.ok) {
                  const { url } = await res.json();
                  uploadingFiles[index] = { ...currentFile, status: 'done', url };
                } else {
                  const { message } = await res.json();
                  uploadingFiles[index] = { ...currentFile, status: 'error', message };
                }
                props.onCompleted?.(isMultiple ? [...uploadingFiles] : uploadingFiles[0]);
              })
              .catch(() => {
                console.log('error', index);
                uploadingFiles[index] = { ...currentFile, status: 'error' };
                props.onCompleted?.(isMultiple ? [...uploadingFiles] : uploadingFiles[0]);
              });
          })(i);
        } else if (connector) {
          file.status = 'uploading';
          (function (index) {
            const currentFile = uploadingFiles[index];
            connector
              .postImage({
                imageData: file.imageData,
                type: file.type,
                name: file.name,
              })
              .then((cid) => {
                // sleep 1s
                // new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
                uploadingFiles[index] = {
                  ...currentFile,
                  status: 'done',
                  url: 'ipfs://' + cid,
                };
                props.onCompleted?.(isMultiple ? [...uploadingFiles] : uploadingFiles[0]);
                // });
              })
              .catch(() => {
                uploadingFiles[index] = { ...currentFile, status: 'error' };
                props.onCompleted?.(isMultiple ? [...uploadingFiles] : uploadingFiles[0]);
              });
          })(i);
        }
      }
      props.onUploading?.(isMultiple ? [...uploadingFiles] : { ...uploadingFile });
    }
    uploading().catch(() => {
      // ignore
    });
  }

  function getEditFile() {
    if (!selectedFiles.current) {
      return;
    }
    if (isMultiple) {
      return selectedFiles.current[editIndex];
    } else {
      return selectedFiles.current;
    }
  }

  const editFile = getEditFile();

  return (
    <>
      <Wrapper style={style} {...getRootProps({ className })}>
        {children}
        <input {...getInputProps()} />
      </Wrapper>
      {editFile && crop ? (
        <UploaderCropp
          ref={cropRef}
          size={crop.size!}
          aspectRatio={crop.aspectRatio!}
          show={showCrop}
          fileType={editFile.type}
          fileUrl={editFile.previewUrl!}
          onCancel={() => {
            let files = isMultiple ? selectedFiles.current : [selectedFiles.current];
            editFile.status = 'cancel';
            if (editIndex === files.length - 1) {
              setShowCrop(false);
              const croppedFiles = files.filter((f: { status: string }) => f.status === 'cropped');
              if (croppedFiles.length > 0) {
                doUpload(croppedFiles);
              }
            } else {
              let nextIndex = editIndex + 1;
              setEditIndex(nextIndex);
              const currentFile = files[nextIndex];
              cropRef.current?.replaceUrl(currentFile.previewUrl);
            }
            props.onCropCancel?.({ ...editFile });
          }}
          onConfirm={({ imageData, thumbnailData, cropData }) => {
            let files = isMultiple ? selectedFiles.current : [selectedFiles.current];
            const croppedFile = createCroppedFile(editFile, {
              imageData,
              thumbnailData,
              crop: cropData,
            });

            props.onCropEnd?.(croppedFile);

            files[editIndex!] = croppedFile;

            if (editIndex === files.length - 1) {
              setShowCrop(false);
              const uploadingFiles = isMultiple ? files : files[0];
              doUpload(uploadingFiles);
            } else {
              let nextIndex = editIndex + 1;
              setEditIndex(nextIndex);
              const currentFile = files[nextIndex];
              cropRef.current?.replaceUrl(currentFile.previewUrl);
            }
          }}
        ></UploaderCropp>
      ) : null}
    </>
  );
};

Uploader3.defaultProps = {
  multiple: false,
  accept: ['.png', '.jpeg', '.jpg', '.gif'],
};
