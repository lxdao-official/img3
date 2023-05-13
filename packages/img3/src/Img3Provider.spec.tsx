import '@testing-library/jest-dom';

import * as React from 'react';

import { act, render, screen } from '@testing-library/react';

import { mockFetch } from '../../../helper/jestMockXHR';
import { sleep } from '../../../helper/sleep';
import { Img3 } from './Img3';
import { Img3Provider } from './Img3Provider';


describe('render Img3 with the correct context value', function() {
  it('should render img with the default gateway from Img3 provider', async function () {
    mockFetch(jest, 200, {
      responseURL: 'https://bafkreidpunfemg2foalobiurfob4v6rdb4i3fmujvj5lpnzahfo3a4mxmy.ipfs.nftstorage.link/',
    });
    render(<Img3Provider defaultGateways={['https://nftstorage.link/ipfs/']}><Img3 src={'ipfs://bafkreidpunfemg2foalobiurfob4v6rdb4i3fmujvj5lpnzahfo3a4mxmy'} /></Img3Provider>);
    await act(() => sleep(500));
    expect(screen.getByRole('img').getAttribute('src')).toBe('https://bafkreidpunfemg2foalobiurfob4v6rdb4i3fmujvj5lpnzahfo3a4mxmy.ipfs.nftstorage.link/');
  });
})
