import lighthouse from '@lighthouse-web3/sdk';

import { Uploader3Connector } from '../types';
import PostImageFile = Uploader3Connector.PostImageFile;

export const createLighthouseConnector = (options: { token: string }): Uploader3Connector.Connector => {
  const { token } = options;

  return {
    postImage: async (image: PostImageFile) => {
      const { type, data: imageData } = image;
      const base64 = imageData.replace(/^data:image\/([^;]+);base64,/, '');
      const imageBuffer = Buffer.from(base64, 'base64');
      // const blob = new Blob([imageBuffer], { type });

      const uploadResponse = await lighthouse.uploadBuffer(imageBuffer, token);
      const cid = uploadResponse.data.Hash;
      return { cid, url: `https://gateway.lighthouse.storage/ipfs/${cid}` };
    },
  };
};
