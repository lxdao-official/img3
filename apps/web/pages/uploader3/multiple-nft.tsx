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
  createNFTStorageConnector,
  Connector,
} from 'uploader3';
import styled from 'styled-components';
// @ts-ignore
import { Img3 } from 'img3';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';

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
    src = file.imageData || file.url;
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

  const [localToken, setLocalToken] = React.useState<string>('');
  const connector = React.useRef<null | Connector>(null);

  useEffect(() => {
    let token = localStorage.getItem('nft-storage-token');
    if (!token) {
      const token = window.prompt('Please enter NFT.storage token');
      if (token) {
        localStorage.setItem('nft-storage-token', token);
        setLocalToken(token);
      }
    }
    setLocalToken(token!);
    connector.current = createNFTStorageConnector({
      token: localStorage.getItem('nft-storage-token') || '',
    });
  }, []);
  return (
    <div style={{ padding: 20 }}>
      <div>NFT.storage multiple upload mode</div>
      <div>If upload file size &gt; 2MB throw error</div>
      <div>Your NFT.storage Token: {localToken.substring(0, 20)}...</div>
      <div style={{ padding: '20px 0' }}>
        <Uploader3
          connector={connector.current!}
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
            console.log('onCrop', file);
            setFiles((files) => {
              return files.map((f) => {
                if (f.name === file.name) {
                  return file;
                }
                return f;
              });
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
