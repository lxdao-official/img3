import * as React from 'react';

import { act, render, screen, fireEvent } from '@testing-library/react';
import { UploaderCrop } from './index';
import { sleep } from '../../../../helper/sleep';

describe('src/UploaderCrop/index.tsx', function () {
  it('should render', async () => {
    const { asFragment, getByRole, rerender, container } = render(
      <UploaderCrop
        show={false}
        aspectRatio={1}
        fileType={'image/png'}
        fileUrl={'https://raw.githubusercontent.com/lxdao-official/Img3/test/uploader3/apps/docs/public/img3.png'}
        size={{ width: '300px', height: '300px' }}
        onConfirm={(data) => {
          console.log(data);
        }}
        onCancel={() => {
          console.log('cancel');
        }}
      />
    );
    const mask = getByRole('mask', { hidden: true });
    expect(mask.style.display).toBe('none');

    rerender(
      <UploaderCrop
        show={true}
        aspectRatio={1}
        fileType={'image/png'}
        fileUrl={'https://raw.githubusercontent.com/lxdao-official/Img3/test/uploader3/apps/docs/public/img3.png'}
        size={{ width: '300px', height: '300px' }}
        onConfirm={(data) => {
          console.log(data);
        }}
        onCancel={() => {
          console.log('cancel');
        }}
      />
    );

    expect(mask.style.display).toBe('');

    fireEvent.animationStart(getByRole('modal', { hidden: true }));

    await act(async () => sleep(1000));

    expect(container.querySelector('.cropper-hide')).not.toBe(null);
  });
});
