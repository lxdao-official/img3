import { NFTStorage } from 'nft.storage';

export type Connector = {
  postImage: (file: { name: string; type: string; imageData: string }) => Promise<string>;
};

export const createNFTStorageConnector = (options: { token: string }) => {
  const { token } = options;
  const client = new NFTStorage({ token });
  return {
    postImage: async (file: { name: string; type: string; imageData: string }) => {
      const { name, type, imageData } = file;
      const base64 = imageData.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = Buffer.from(base64, 'base64');
      const blob = new Blob([imageBuffer], { type });

      return await client.storeBlob(blob);
    },
  };
};
