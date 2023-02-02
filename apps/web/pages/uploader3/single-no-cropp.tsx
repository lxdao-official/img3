import React, { useState } from 'react';
import type { SelectedFile, UploadFile, UploadResult } from '@lxdao/uploader3';
import { Uploader3 } from '@lxdao/uploader3';

import { PreviewFile } from '@/components/PreviewFile';
import { Icon } from '@iconify/react';
import { PreviewWrapper } from '@/components/PreviewWrapper';

export default function Demo() {
  const [file, setFile] = useState<SelectedFile | UploadFile | UploadResult>();

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
