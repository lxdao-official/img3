import React, { useState } from 'react';
import type { CroppedFile, SelectedFile, UploadFile, UploadResult } from '@lxdao/uploader3';
import { Uploader3 } from '@lxdao/uploader3';

import { PreviewFile } from '@/components/PreviewFile';
import { Icon } from '@iconify/react';
import { PreviewWrapper } from '@/components/PreviewWrapper';

export default function Demo() {
  const [file, setFile] = useState<SelectedFile | UploadFile | CroppedFile | UploadResult | null>();

  return (
    <div style={{ padding: 20 }}>
      <div>Only .svg files are accepted. svg data does not support crop mode. Please turn off the crop option.</div>
      <div style={{ padding: '20px 0' }}>
        <Uploader3
          accept={['.svg']}
          api={'/api/upload/file'}
          multiple={false}
          crop={false}
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
