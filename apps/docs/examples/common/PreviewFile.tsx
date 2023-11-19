export const PreviewFile = `
import type { CroppedFile, SelectedFile, UploadFile, UploadResult } from '@lxdao/uploader3';
import { Icon } from '@iconify/react';
import React from 'react';
import { Img3 } from '@lxdao/img3';

import { Status } from './Status';

export const PreviewFile = (props: {
  file: SelectedFile | UploadFile | UploadResult | CroppedFile;
  style?: React.CSSProperties;
}) => {
  const { file } = props;

  let src: string = '';
  if (file.status === 'uploading') {
    src = file.thumbData || file.imageData;
  } else if (file.status === 'done') {
    src = file.url;
  } else if (file.status === 'cropped') {
    src = file.thumbData;
  }
  
  src = src || file.previewUrl;
 
  return (
    <>
      <Img3 style={{ maxHeight: '100%', maxWidth: '100%' }} src={src} alt={file.name} />
      {file.status === 'uploading' && (
        <Status>
          <Icon icon={'line-md:uploading-loop'} color={'#65a2fa'} fontSize={40} />
        </Status>
      )}
      {file.status === 'error' && (
        <Status>
          <Icon icon={'iconoir:cloud-error'} color={'#ffb7b7'} fontSize={40} />
        </Status>
      )}
    </>
  );
};
`;
