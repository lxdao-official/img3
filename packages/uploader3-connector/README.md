
# uploader3-connector

[![npm version](https://badge.fury.io/js/%40lxdao%2Fuploader3-connector.svg)](https://badge.fury.io/js/%40lxdao%2Fuploader3-connector)
[![npm downloads](https://img.shields.io/npm/dm/%40lxdao%2Fuploader3-connector.svg)](https://www.npmjs.com/package/%40lxdao%2Fuploader3-connector)


Uploader3 Connector is a connector for Uploader3]. Currently, it only supports [NFT.storage](http://NFT.storage) IPFS service provider.

Supported service provider

- [NFT.storage](https://nft.storage/)

> Support Img3 and list here? Contact [@muxin](https://twitter.com/muxin_eth) or create a ticket in [LXDAO
  DC](https://discord.lxdao.io).

## Usage

```js copy
import { createConnector } from '@lxdao/uploader3-connector';
```

## API

### createConnector

Create a connector for Uploader3 upload service.

```ts
export const createConnector: (service: 'NFT.storage', options: { token: string }) => Connector;
```

## Types reference

### Connector

```ts
interface PostImageFile {
  /** base64 encoded image file */
  data: string;
  /** file type */
  type: 'image/png' | 'image/jpeg' | 'image/gif' | 'image/jpg';
}

export type Connector = {
  postImage: (image: PostImageFile) => Promise<{ cid: string; url: string }>;
};
```