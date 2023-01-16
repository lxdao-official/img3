import { CroppedFile, SelectedFile, UploadFile, UploadResult } from '@lxdao/uploader3';
import { Icon } from '@iconify/react';
import React from 'react';
import { Img3 } from '@lxdao/img3';
import styled from 'styled-components';

export const PreviewFile = (props: {
  file: SelectedFile | UploadFile | UploadResult | CroppedFile;
  style?: React.CSSProperties;
}) => {
  const { file } = props;

  let src: string;
  if (file.status === 'uploading') {
    src = file.thumbData || file.imageData;
  } else if (file.status === 'done') {
    src = file.url;
  } else if (file.status === 'cropped') {
    src = file.thumbData;
  } else {
    src = file.previewUrl;
  }

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

const Status = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;
