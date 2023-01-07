import { render, screen } from '@testing-library/react';
import React from 'react';
import { Loading } from './Loading';

test('renders Loading', () => {
  const { asFragment } = render(<Loading />);
  expect(asFragment()).toMatchSnapshot();
});
