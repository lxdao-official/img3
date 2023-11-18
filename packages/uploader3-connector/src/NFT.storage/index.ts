import { NFTStorage } from 'nft.storage';

import { Uploader3Connector } from '../types';
import PostImageFile = Uploader3Connector.PostImageFile;

export const createNFTStorageConnector = (options: { token: string }): Uploader3Connector.Connector => {
  const { token } = options;
  const client = new NFTStorage({ token });
  return {
    postImage: async (image: PostImageFile) => {
      const { type, data: imageData } = image;
      const base64 = imageData.replace(/^data:image\/([^;]+);base64,/, '');
      const imageBuffer = Buffer.from(base64, 'base64');
      const blob = new Blob([imageBuffer], { type });

      const cid = await client.storeBlob(blob);
      await client.check(cid);

      return { cid, url: `https://nftstorage.link/ipfs/${cid}` };
    },
  };
};
