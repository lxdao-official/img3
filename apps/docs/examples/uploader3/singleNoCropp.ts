const App = `
import React from 'react';
import type { SelectedFile, UploadFile, UploadResult } from '@lxdao/uploader3';
import { Uploader3 } from '@lxdao/uploader3';
import { Icon } from '@iconify/react';

import { PreviewFile } from './PreviewFile';
import { PreviewWrapper } from './PreviewWrapper';

export default function App() {
  const [file, setFile] = React.useState<SelectedFile | UploadFile | UploadResult>();

  return (
    <div style={{ padding: 10 }}>
      <Uploader3
        api={'/api/upload/file'}
        crop={false}
        multiple={false}
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
