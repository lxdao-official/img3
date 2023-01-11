import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fse from 'fs-extra';
import path from 'path';
import crypto from 'crypto';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const publicDir = path.join(process.cwd(), 'public');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data: {
    err: string;
    fields: {
      imageBase64: string;
      name: string;
    };
    files: formidable.Files;
  } = await new Promise((resolve, reject) => {
    const form = formidable();

    form.parse(req, (err, fields, files) => {
      if (err) reject({ err });
      // @ts-ignore
      resolve({ err, fields, files });
    });
  });

  if (data.err) {
    res.status(500).json({ error: data.err });
  } else {
    let { imageBase64, name } = data.fields;

    if (imageBase64.startsWith('data:image/')) {
      imageBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    }

    const buffer = Buffer.from(imageBase64, 'base64');

    // if buffer size > 2MB throw error
    if (buffer.byteLength > 2 * 1024 * 1024) {
      res.status(500).json({ error: 'file size > 2MB' });
      return;
    }

    const hash = crypto.createHash('md5').update(buffer).digest('hex');
    const ext = path.extname(name);
    const fileName = hash + ext;
    const filePath = path.join(publicDir, fileName);

    if (fse.existsSync(filePath)) {
      // remove file
      fse.unlinkSync(filePath);
    }
    fse.ensureFileSync(filePath);
    await fse.writeFile(filePath, buffer);

    const host = req.headers.host;

    await sleep(1500);

    res.status(200).json({ url: `//${host}/${fileName}` });
  }
};
