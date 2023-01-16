import { createNFTStorageConnector } from './NFT.storage';

export const createConnector = (space: 'NFT.storage', options: { token: string }) => {
  switch (space) {
    case 'NFT.storage':
      return createNFTStorageConnector(options);
    default:
      throw new Error(`Not support ${space} connector`);
  }
};

export * from './types';
