import React from 'react';
import { UploaderCrop } from '@lxdao/uploader3';

export default function Demo() {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <button style={{ position: 'fixed', zIndex: 2000 }} onClick={() => setShow(!show)}>
        Show Cropper
      </button>

      <UploaderCrop
        show={show}
        aspectRatio={1}
        fileType={'image/jpeg'}
        fileUrl={'/7e7be55b35ae6552e14ea94b59a9c8c8.jpg'}
        size={{ width: '300px', height: '300px' }}
        onConfirm={(data) => {
          console.log(data);
        }}
        onCancel={() => {
          console.log('cancel');
          setShow(false);
        }}
      />
    </>
  );
}
