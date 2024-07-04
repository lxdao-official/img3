import type { NextApiRequest, NextApiResponse } from 'next';
import { createConnector, type Uploader3Connector } from '@lxdao/uploader3-connector';

// eslint-disable-next-line turbo/no-undeclared-env-vars
const connector = createConnector('lighthouse', { token: process.env.LIGHTHOUSE_TOKEN! });

const uploadFile = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqBody = <Uploader3Connector.PostImageFile>req.body;
  let { data: imageData = '', type } = reqBody;

  if (!imageData) {
    res.status(400).json({ error: 'No image data' });
    return;
  }

  if (!type) {
    res.status(400).json({ error: 'No image type' });
    return;
  }

  if (imageData.startsWith('data:image/')) {
    imageData = imageData.replace(/^data:image\/\w+;base64,/, '');
  }

  const buffer = Buffer.from(imageData, 'base64');

  // if buffer size > 2MB throw error
  if (buffer.byteLength > 2 * 1024 * 1024) {
    res.status(500).json({ error: 'file size > 2MB' });
    return;
  }

  const result = await connector.postImage({ data: imageData, type }).catch((e) => {
    res.status(500).json({ error: e.message });
  });

  if (result) {
    res.status(200).json({ url: result.url });
  }
};

export default uploadFile;
