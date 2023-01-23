import React, { useState } from 'react';
import type { SelectedFile, UploadFile, UploadResult } from '@lxdao/uploader3';
import { Uploader3 } from '@lxdao/uploader3';

import { PreviewFile } from '@/components/PreviewFile';
import { Icon } from '@iconify/react';
import { PreviewWrapper } from '@/components/PreviewWrapper';

export default function Demo() {
  const [file, setFile] = useState<SelectedFile | UploadFile | UploadResult>();

  return (
    <div style={{ padding: 20 }}>
      <div>API single upload mode</div>
      <div>If upload file size &gt; 2MB throw error</div>
      <div style={{ padding: '20px 0' }}>
        <Uploader3
          api={'/api/upload/file'}
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
    </div>
  );
}
