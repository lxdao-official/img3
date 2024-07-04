import { createNFTStorageConnector } from './NFT.storage';
import { Uploader3Connector } from './types';
import { createLighthouseConnector } from './lighthouse';

export const createConnector = (
  service: 'NFT.storage' | 'lighthouse',
  options: { token: string }
): Uploader3Connector.Connector => {
  switch (service) {
    case 'NFT.storage':
      return createNFTStorageConnector(options);
    case 'lighthouse':
      return createLighthouseConnector(options);
    default:
      throw new Error(`Not support ${service} connector`);
  }
};

export * from './types';
