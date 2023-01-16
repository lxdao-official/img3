import React, { useState } from 'react';
import type { CroppedFile, SelectedFile, UploadFile, UploadResult } from '@lxdao/uploader3';
import { Uploader3 } from '@lxdao/uploader3';

import { PreviewFile } from '@/components/PreviewFile';
import { Icon } from '@iconify/react';

export default function Demo() {
  const [files, setFiles] = useState<Array<SelectedFile | UploadFile | UploadResult | CroppedFile>>([]);

  return (
    <div style={{ padding: 20 }}>
      <div>API multiple upload mode</div>
      <div>If upload file size &gt; 2MB throw error</div>
      <div style={{ padding: '20px 0' }}>
        <Uploader3
          api={'/api/upload/file'}
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
        <div style={{ display: 'flex', padding: '20px 0' }}>
          {files.map((file) => {
            if (file) {
              return (
                <div
                  key={file.name + file.status}
                  data-status={file.status}
                  style={{
                    width: 160,
                    height: 120, // 4:3
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
