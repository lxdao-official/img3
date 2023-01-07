import React from 'react';
import { render } from '@testing-library/react';
import { Error } from './Error';

test('renders Error', () => {
  const { asFragment } = render(<Error color={'#ff'} />);
  expect(asFragment()).toMatchSnapshot();
});
