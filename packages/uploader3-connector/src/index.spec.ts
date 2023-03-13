jest.mock('nft.storage', () => ({
  NFTStorage: function () {
    return {
      storeBlob: () => 'cid',
      check: () => true,
    };
  },
}));

import { createConnector } from './index';

describe('src/index.ts', function () {
  it('should export createConnector', function () {
    expect(createConnector).toBeDefined();
  });

  it('should return NFT.storage connector', function () {
    const connector = createConnector('NFT.storage', {
      token: 'token',
    });

    expect(connector).toBeDefined();
    expect(connector.postImage).toBeDefined();

    connector
      .postImage({
        data: Buffer.from('test').toString('base64'),
        type: 'image/png',
      })
      .then((res) => {
        expect(res.cid).toEqual('cid');
        expect(res.url).toEqual(`https://nftstorage.link/ipfs/cid`);
      });
  });

  it('should throw error unsupported service', function () {
    expect(() => createConnector('unknown', {})).toThrowError();
  });
});
