import '@testing-library/jest-dom';
import React from 'react';

import { act, render, screen } from '@testing-library/react';

import { mockFetch } from '../../../helper/jestMockXHR';
import { sleep } from '../../../helper/sleep';
import { Img3 } from './Img3';

describe('render Img3', function () {
  it('should render img by faster gateway', async function () {
    mockFetch(jest, 200, {
      responseURL: 'https://example.com/a.jpg',
    });
    render(<Img3 src={'ipfs://abc'} />);
    await act(() => sleep(500));
    expect(await screen.getByRole('img').getAttribute('src')).toBe('https://example.com/a.jpg');
  });

  it('should render img has gateway ', async function () {
    mockFetch(jest, 200, {
      responseURL: 'https://example.com/b.jpg',
    });
    render(<Img3 src={'ipfs://abc'} gateway={'https://ipfs.io/ipfs/'} />);
    await act(() => sleep(500));
    expect(screen.getByRole('img').getAttribute('src')).toBe('https://example.com/b.jpg');
  });

  it('should render error when not found', async function () {
    mockFetch(jest, 404, {
      responseURL: 'https://example.com/b.jpg',
    });
    const { asFragment } = render(<Img3 src={'ipfs://abc'} gateway={'https://ipfs.io/ipfs/'} />);
    await act(() => sleep(500));
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render http image', async function () {
    const { asFragment, getByRole } = render(<Img3 src={'https://example.com/a.jpg'} />);
    expect(await getByRole('img').getAttribute('src')).toBe('https://example.com/a.jpg');
  });
});
