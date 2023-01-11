import * as React from 'react';
import {
  CroppedFile,
  SelectedFile,
  SelectedFiles,
  UploadedResult,
  UploadedResults,
  Uploader3,
  UploadingFile,
  UploadingFiles,
} from 'uploader3';
import styled from 'styled-components';
// @ts-ignore
import { Img3 } from 'img3';
import { Icon } from '@iconify/react';

const Status = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const PreviewFile = (props: { file: SelectedFile | UploadingFile | UploadedResult | CroppedFile }) => {
  const { file } = props;

  let src = '';
  if (file.status === 'uploading' || file.status === 'cropped') {
    src = file.thumbnailData || file.imageData;
  } else if (file.status === 'done') {
    src = file.url;
  } else {
    src = file.previewUrl;
  }

  return (
    <>
      <Img3 style={{ maxHeight: '100%', maxWidth: '100%' }} src={src} alt={file.name} />
      {file.status === 'uploading' && (
        <Status>
          <Icon icon={'line-md:uploading-loop'} color={'#65a2fa'} fontSize={40} />
        </Status>
      )}
      {file.status === 'error' && (
        <Status>
          <Icon icon={'iconoir:cloud-error'} color={'#ffb7b7'} fontSize={40} />
        </Status>
      )}
    </>
  );
};

export default function Demo() {
  const [files, setFiles] = React.useState<Array<SelectedFile | UploadingFile | UploadedResult | CroppedFile>>([]);

  return (
    <div style={{ padding: 20 }}>
      <div>API multiple upload mode</div>
      <div>If upload file size &gt; 2MB throw error</div>
      <div style={{ padding: '20px 0' }}>
        <Uploader3
          api={'/api/upload/file'}
          multiple={true}
          crop={true}
          onSelected={(files: SelectedFiles) => {
            setFiles(files);
          }}
          onUploading={(files: UploadingFiles) => {
            console.log('onUploading', files);
            setFiles(files);
          }}
          onCompleted={(files: UploadedResults) => {
            console.log('onCompleted', files);
            setFiles(files);
          }}
          onCropEnd={(file: CroppedFile) => {
            console.log('onCropEnd', file);
            setFiles((files) => {
              return files.map((f) => {
                if (f.name === file.name) {
                  return file;
                }
                return f;
              });
            });
          }}
          onCropCancel={(file) => {
            console.log('onCropCancel', file);
            setFiles((files) => {
              return files.filter((f) => f.name !== file.name);
            });
          }}
        >
          <div
            style={{
              borderRadius: 5,
              padding: '20px',
              display: 'flex',
              boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.8) inset',
              backgroundColor: '#0987ff',
              color: '#fff',
            }}
          >
            <Icon icon={'material-symbols:cloud-upload'} color={'#fff'} fontSize={24} />
            <span style={{ paddingLeft: 10 }}>Drop files or Click to select files</span>
          </div>
        </Uploader3>
        <div style={{ display: 'flex', padding: '20px 0' }}>
          {files.map((file) => {
            if (file) {
              return (
                <div
                  key={file.name + file.status}
                  data-status={file.status}
                  style={{
                    width: 150,
                    height: 150,
                    backgroundColor: '#dcdcdc',
                    color: '#333',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '2px solid #fff',
                    position: 'relative',
                    marginRight: 10,
                  }}
                >
                  <PreviewFile file={file} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}
