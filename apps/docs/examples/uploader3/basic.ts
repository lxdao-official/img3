const App = `
import React from 'react';
import { Uploader3 } from '@lxdao/uploader3';

export default function App() {
  return (
    <div style={{ padding: 10 }}>
      <Uploader3
        api={'/api/upload/file?name=your-name'}
        headers={{
          'x-token': 'abcd',
        }}
        onChange={(files) => {
          console.log('onChange', files);
        }}
        onUpload={(file) => {
          console.log('onUpload', file);
        }}
        onComplete={(result) => {
          console.log('onComplete', result);
        }}
      >
        <div
          style={{
            borderRadius: 5,
            padding: '20px',
            display: 'inline-block',
            boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.8) inset',
            backgroundColor: '#0987ff',
            color: '#fff',
          }}
        >
          Drop files or Click to select files
        </div>
      </Uploader3>
    </div>
  );
}
`;

const react = {
  '/App.tsx': App.trim(),
};

export default {
  ...react,
};
