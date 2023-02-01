const App = `
import React from 'react';
import { Uploader3 } from '@lxdao/uploader3';
import { Icon } from '@iconify/react';

import { PreviewFile } from './PreviewFile';
import { PreviewWrapper } from './PreviewWrapper';

export default function App() {
  const [file, setFile] = React.useState();

  return (
    <div style={{ padding: 10 }}>
      <Uploader3
        api={'/api/upload/file'}
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
        <PreviewWrapper style={{height: 160, width: 160}}>
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
  '/App.js': App.trim(),
  ...common,
};

export default {
  ...react,
};
