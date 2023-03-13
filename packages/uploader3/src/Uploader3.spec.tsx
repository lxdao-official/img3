import * as React from 'react';

import { act, render, screen, fireEvent } from '@testing-library/react';
import { Uploader3 } from './Uploader3';

describe('src/Uploader3.tsx', function () {
  it('should render Uploader3', function () {
    const { container } = render(
      <Uploader3
        api={'/api/upload/file?name=your-name'}
        headers={{
          'x-token': 'abcd',
        }}
        multiple={false}
        crop={true} // use default crop options
        onChange={(files) => {
          {
            /*setFile(files[0]);*/
          }
        }}
        onUpload={(file) => {
          // setFile(file);
        }}
        onComplete={(file) => {
          // setFile(file);
        }}
        onCropCancel={(file) => {
          // setFile(null);
        }}
        onCropEnd={(file) => {
          // setFile(file);
        }}
      >
        <button>Upload</button>
      </Uploader3>
    );
    expect(container).toMatchSnapshot();
  });
});
