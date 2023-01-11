import * as React from 'react';
import { SelectedFile, UploadedResult, Uploader3, UploadingFile } from 'uploader3';
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

const PreviewFile = (props: { file: SelectedFile | UploadingFile | UploadedResult }) => {
  const { file } = props;

  let src: string;
  if (file.status === 'uploading') {
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
  const [file, setFile] = React.useState<SelectedFile | UploadingFile | UploadedResult | null>();

  return (
    <div style={{ padding: 20 }}>
      <div>API single upload mode</div>
      <div>If upload file size &gt; 2MB throw error</div>
      <div style={{ padding: '20px 0' }}>
        <Uploader3
          api={'/api/upload/file'}
          multiple={false}
          crop={{
            aspectRatio: 1,
            size: { width: 400, height: 300 },
          }}
          onSelected={(file: SelectedFile) => {
            setFile(file);
          }}
          onUploading={(file: UploadingFile) => {
            setFile(file);
          }}
          onCompleted={(file: UploadedResult) => {
            setFile(file);
          }}
          onCropCancel={(file: SelectedFile) => {
            setFile(null);
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              backgroundColor: '#dcdcdc',
              color: '#333',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px solid #fff',
              position: 'relative',
            }}
          >
            {file ? (
              <PreviewFile file={file} />
            ) : (
              <span>
                <Icon icon={'material-symbols:cloud-upload'} color={'#65a2fa'} fontSize={60} />
              </span>
            )}
          </div>
        </Uploader3>
      </div>
    </div>
  );
}
