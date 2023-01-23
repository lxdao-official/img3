import { createNFTStorageConnector } from './NFT.storage';
import { Uploader3Connector } from './types';

export const createConnector = (service: 'NFT.storage', options: { token: string }): Uploader3Connector.Connector => {
  switch (service) {
    case 'NFT.storage':
      return createNFTStorageConnector(options);
    default:
      throw new Error(`Not support ${service} connector`);
  }
};

export * from './types';
