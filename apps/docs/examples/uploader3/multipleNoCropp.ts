const App = `
import React from 'react';
import { Icon } from '@iconify/react';
import { Uploader3 } from '@lxdao/uploader3';

import { PreviewFile } from './PreviewFile';
import { PreviewWrapper } from './PreviewWrapper';

import type { CroppedFile, SelectedFile, UploadFile, UploadResult } from '@lxdao/uploader3';

export default function App() {
  const [files, setFiles] = React.useState<Array<SelectedFile | UploadFile | UploadResult | CroppedFile>>([]);

  return (
    <div style={{ padding: 10 }}>
      <Uploader3
        api={'/api/upload/file'}
        multiple={true}
        crop={false}
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
      >
        <div
          style={{
            borderRadius: 5,
            padding: '20px',
            display: 'flex',
            boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.8) inset',
            backgroundColor: '#0987ff',
            alignItems: 'center',
            color: '#fff',
          }}
        >
          <Icon icon={'material-symbols:cloud-upload'} color={'#fff'} fontSize={24} />
          <span style={{ paddingLeft: 10 }}>Drop files or Click to select files</span>
        </div>
      </Uploader3>
      <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px 0' }}>
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
