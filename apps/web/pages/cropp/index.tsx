import * as React from 'react';

import { UploaderCropp } from 'uploader3';

export default function Demo() {
  return (
    <UploaderCropp
      show={true}
      aspectRatio={1}
      fileType={'image/jpeg'}
      fileUrl={'/7e7be55b35ae6552e14ea94b59a9c8c8.jpg'}
      size={{ width: '300px', height: '300px' }}
      onConfirm={(data) => {
        console.log(data);
      }}
    />
  );
}
