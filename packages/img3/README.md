# Img3


[![npm version](https://badge.fury.io/js/%40lxdao%2Fimg3.svg)](https://badge.fury.io/js/%40lxdao%2Fimg3)
[![npm downloads](https://img.shields.io/npm/dm/%40lxdao%2Fimg3.svg)](https://www.npmjs.com/package/%40lxdao%2Fimg3)

`<Img3 />` is a fundamental components for Web3 Apps. It extends HTML `<img />` with Web3 decentralization storage, like
IPFS. With `<Img3 />` you can put ipfs:// in the src and render the image from IPFS with the fastest gateway. Will support
ar soon.

**Features**

- Supports the `ipfs://` protocol.
- Automatically uses the gateway with the highest speed, And reuse it the next request.

```jsx
const defaultGateways = [
  'https://nftstorage.link/ipfs/',
  'https://ipfs-gateway.cloud/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://4everland.io/ipfs/',
];
```

## Usage

```js copy
import { Img3 } from '@lxdao/img3';
```

## Props

| Prop     | Type            | Description                              | Default                        |
| -------- | --------------- | ---------------------------------------- | ------------------------------ |
| src      | `string`        | image source, support `ipfs://` protocol | -                              |
| alt      | `string`        | image alt text                           | -                              |
| gateways | `string[]`      | Web3 decentralization storage gateways   | defaultGateways                |
| timeout  | `number`        | timeout of gateway request               | `2000`                         |
| icon     | [`Icon`](#icon) | style of loading or error icons          | `{size: 30, color: '#c0c0c0'}` |

## Types reference

### Icon

```ts
type Icon = {
  /** icon size. */
  size?: number;
  /** icon color. */
  color?: string;
  /** error icon size. */
  errorSize?: number;
  /** error icon color. */
  errorColor?: string;
};
```
