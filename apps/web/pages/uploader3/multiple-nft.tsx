import React, { useEffect, useRef, useState } from 'react';
import type { CroppedFile, SelectedFile, UploadFile, UploadResult } from '@lxdao/uploader3';
import { Uploader3 } from '@lxdao/uploader3';

import { PreviewFile } from '@/components/PreviewFile';
import { Icon } from '@iconify/react';
import { createConnector, type Uploader3Connector } from '@lxdao/uploader3-connector';
import { PreviewWrapper } from '@/components/PreviewWrapper';

export default function Demo() {
  const [files, setFiles] = useState<Array<SelectedFile | UploadFile | UploadResult | CroppedFile>>([]);

  const [localToken, setLocalToken] = useState<string>('');
  const connector = useRef<null | Uploader3Connector.Connector>(null);

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
    connector.current = createConnector('NFT.storage', {
      token: localStorage.getItem('nft-storage-token') || '',
    });
  }, []);
  return (
    <div style={{ padding: 20 }}>
      <div>NFT.storage multiple upload mode</div>
      <div>If upload file size &gt; 2MB throw error</div>
      <div>Your NFT.storage Token: {localToken?.substring(0, 80)}...</div>
      <div style={{ padding: '20px 0' }}>
        <Uploader3
          connector={connector.current!}
          multiple={true}
          crop={{
            aspectRatio: 4 / 3,
          }}
          onChange={(files) => {
            console.log('onChange', files);
            setFiles(files);
          }}
          onUpload={(file) => {
            console.log('onUpload', file);
            setFiles((files) => {
              return files.map((f) => {
                if (f.name === file.name) {
                  return file;
                }
                return f;
              });
            });
          }}
          onComplete={(file) => {
            console.log('onComplete', file);
            setFiles((files) => {
              return files.map((f) => {
                if (f.name === file.name) {
                  return file;
                }
                return f;
              });
            });
          }}
          onCropEnd={(file) => {
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
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px 0' }}>
          {files.map((file) => {
            if (file) {
              return (
                <PreviewWrapper key={file.name + file.status} data-status={file.status}>
                  <PreviewFile file={file} />
                </PreviewWrapper>
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
