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
        api={'/api/upload/file?name=your-name'}
        headers={{
          'x-token': 'abcd',
        }}
        multiple={false}
        crop={true} // use default crop options
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
        <PreviewWrapper style={{height: 200, width: 200}}>
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
