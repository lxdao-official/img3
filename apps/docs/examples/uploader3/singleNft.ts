const App = `
import React from 'react';
import { Icon } from '@iconify/react';
import { Uploader3 } from '@lxdao/uploader3';
import { createConnector } from '@lxdao/uploader3-connector';

import { PreviewFile } from './PreviewFile';
import { PreviewWrapper } from './PreviewWrapper';

import type { Uploader3Connector } from '@lxdao/uploader3-connector';
import type { CroppedFile, SelectedFile, UploadFile, UploadResult } from '@lxdao/uploader3';

export default function App() {
  const [file, setFile] = React.useState<SelectedFile | UploadFile | UploadResult | CroppedFile | null>();
  const [localToken, setLocalToken] = React.useState<string>('');
  const connector = React.useRef<null | Uploader3Connector.Connector>(null);

  React.useEffect(() => {
    connector.current = createConnector('NFT.storage', {
      token: localToken,
    });
  }, [localToken]);

  return (
    <div style={{ padding: 10 }}>
      <input
        style={{ display: 'block', border: '1px solid #eee', padding: '4px 8px', marginBottom: 10, width: 300 }}
        placeholder='Input your NFT.storage token'
        onInput={(e) => {
          setLocalToken(e.target.value);
        }}
      />
      <Uploader3
        connector={connector.current!}
        multiple={false}
        crop={{
          aspectRatio: 9/16,
          size: { width: 400, height: 300 },
        }}
        onChange={(files) => {
          setFile(files[0]);
        }}
        onUpload={(file) => {
          setFile(file);
        }}
        onComplete={(file) => {
          setFile(file);
        }}
        onCropCancel={(file) => {
          setFile(null);
        }}
        onCropEnd={(file) => {
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
  );
}
`;

import common from '../common';

const react = {
  '/App.tsx': App.trim(),
  ...common,
};

export default {
  ...react,
};
