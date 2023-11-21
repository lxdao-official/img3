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
        fileType={'image/png'}
        fileUrl={'https://raw.githubusercontent.com/lxdao-official/Img3/test/uploader3/apps/docs/public/img3.png'}
        fileName={'img3.png'}
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
