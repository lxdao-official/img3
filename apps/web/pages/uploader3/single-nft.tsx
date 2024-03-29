import React from 'react';
import { Icon } from '@iconify/react';
import type { CroppedFile, SelectedFile, UploadFile, UploadResult } from '@lxdao/uploader3';
import { Uploader3 } from '@lxdao/uploader3';
import type { Uploader3Connector } from '@lxdao/uploader3-connector';
import { createConnector } from '@lxdao/uploader3-connector';

import { PreviewFile } from '@/components/PreviewFile';
import { PreviewWrapper } from '@/components/PreviewWrapper';

export default function Demo() {
  const [file, setFile] = React.useState<SelectedFile | UploadFile | UploadResult | CroppedFile | null>();
  const [localToken, setLocalToken] = React.useState<string>('');
  const connector = React.useRef<null | Uploader3Connector.Connector>(null);

  React.useEffect(() => {
    let token = localStorage.getItem('nft-storage-token');
    if (!token) {
      const token = window.prompt('Please enter NFT.storage token');
      if (token) {
        localStorage.setItem('nft-storage-token', token);
      }
    }
    setLocalToken(token!);
    connector.current = createConnector('NFT.storage', {
      token: localStorage.getItem('nft-storage-token') || '',
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <div>NFT.storage single upload mode</div>
      <div>If upload file size &gt; 2MB throw error</div>
      <div>Your NFT.storage Token: {localToken.substring(0, 80)}...</div>
      <div style={{ padding: '20px 0' }}>
        <Uploader3
          connector={connector.current!}
          multiple={false}
          crop={{
            aspectRatio: 1,
            size: { width: 400, height: 300 },
          }}
          onChange={(files) => {
            console.log('onChange', files);
            setFile(files[0]);
          }}
          onUpload={(file) => {
            console.log('onUpload', file);
            setFile(file);
          }}
          onComplete={(file) => {
            console.log('onComplete', file);
            setFile(file);
          }}
          onCropCancel={(file) => {
            console.log('onCropCancel', file);
            setFile(null);
          }}
          onCropEnd={(file) => {
            console.log('onCropEnd', file);
            setFile(file);
          }}
        >
          <PreviewWrapper>
            {file ? (
              <PreviewFile file={file} />
            ) : (
              <span>
                <Icon icon={'material-symbols:cloud-upload'} color={'#65a2fa'} fontSize={60} />
              </span>
            )}
          </PreviewWrapper>
        </Uploader3>
      </div>
    </div>
  );
}
