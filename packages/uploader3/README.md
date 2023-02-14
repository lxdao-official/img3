# Uploader3

[![npm version](https://badge.fury.io/js/%40lxdao%2Fuploader3.svg)](https://badge.fury.io/js/%40lxdao%2Fuploader3)
[![npm downloads](https://img.shields.io/npm/dm/%40lxdao%2Fuploader3.svg)](https://www.npmjs.com/package/%40lxdao%2Fuploader3)

Uploader3 is a React-based Web3 image upload component that supports multiple image uploads, image cropping, and uploading images to Web3 Storage providers (like IPFS). There are two ways for uploading, by using a backend API or the Uploader3 Connector.

**Features**

- Supports cropping
- Supports uploading to web3 service providers, such as NFT.storage

## Usage

```js copy
import { Uploader3 } from '@lxdao/uploader3';
```

## Props

| Prop         | Type                        | Description                            | Default                          |
| ------------ | --------------------------- | -------------------------------------- | -------------------------------- |
| accept       | `string`                    | image accept file type                 | `['.png','.jpeg','.jpg','.gif']` |
| multiple     | `boolean`                   | multiple image upload                  | `false`                          |
| api          | `string`                    | endpoint upload api url                | `''`                             |
| connector    | `object`                    | create by uploader3-connector          | -                                |
| crop         | [`Crop`](#crop) / `boolean` | crop config, set `false` disabled crop | `true`                           |
| onChange     | `function`                  | callback when files selected           | -                                |
| onUpload     | `function`                  | callback when file uploading           | -                                |
| onComplete   | `function`                  | callback when file uploaded            | -                                |
| onCropEnd    | `function`                  | callback when crop end                 | -                                |
| onCropCancel | `function`                  | callback when crop cancel              | -                                |

> `api` and `connector` are mutually exclusive, if both are provided, `api` will be used. must be provided one of them.

## Types reference

### Crop

```ts
type Crop = {
  size: { width: number; height: number };
  aspectRatio: number;
};
```
