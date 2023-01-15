import React from 'react';
import { SelectedFile, Uploader3, UploadFile, UploadResult } from 'uploader3';

export default function Demo() {
  return (
    <div style={{ padding: 20 }}>
      <div>API 上传方式</div>
      <div>
        <Uploader3
          api={'/api/upload/file'}
          onChange={(file: SelectedFile) => {
            console.log('onChange', file);
          }}
          onUpload={(file: UploadFile) => {
            console.log('onUpload', file);
          }}
          onComplete={(result: UploadResult) => {
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
    </div>
  );
}
