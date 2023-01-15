import React from 'react';
import { SelectedFile, Uploader3, UploadFile, UploadResult } from 'uploader3';

import { PreviewFile } from '@/components/PreviewFile';
import { Icon } from '@iconify/react';

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
          onChange={(file: SelectedFile) => {
            console.log('onChange', file);
            setFile(file);
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
          <div
            style={{
              width: 200,
              height: 200,
              backgroundColor: '#dcdcdc',
              color: '#333',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px solid #fff',
              position: 'relative',
            }}
          >
            {file ? (
              <PreviewFile file={file} />
            ) : (
              <span>
                <Icon icon={'material-symbols:cloud-upload'} color={'#65a2fa'} fontSize={60} />
              </span>
            )}
          </div>
        </Uploader3>
      </div>
    </div>
  );
}
