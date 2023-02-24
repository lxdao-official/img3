# Img3

Img3 is a Web3 image solution that includes image rendering, upload, Web3 storage SDK adaptors, etc. Img3 is an open-source public good. In this proposal, we will implement it based on IPFS. Buidl in [LXDAO](https://lxdao.io/).

## Features

### Img3

`<Img3 />` is a fundamental components for Web3 Apps. It extends HTML <img /> with Web3 decentralization storage, like IPFS. With <Img3 /> you can put ipfs:// in the src and render the image from IPFS with the fastest gateway. Will support ar soon. [@lxdao/img3](./packages/img3/README.md)

### Uploader3

Uploader3 is a React-based Web3 image upload component that supports multiple image uploads, image cropping, and uploading images to Web3 Storage providers (like IPFS). There are two ways for uploading, by using a backend API or the Uploader3 Connector. [@lxdao/uploader3](./packages/uploader3/README.md)

### SDK Connector

Uploader3 Connector is a connector for Uploader3. Currently, it only supports NFT.storage IPFS service provider. [@lxdao/uploader3-connector](./packages/uploader3-connector/README.md)

## Start the app

Get the code first:

```
git clone https://github.com/lxdao-official/Img3.git
cd Img3
```

Run the code to check the document:

```
pnpm install
pnpm build && pnpm start --filter=docs
```

Then open <http://localhost:3001> start developing.

## `.env` explanation

- `NFT_TOKEN` is the `nft.storage` token for creating SDK Connector.

## What is LXDAO?

This is a project build in LXDAO. More links: [LXDAO](https://lxdao.io/) | [LXDAO Forum](https://forum.lxdao.io/) | [LXDAO Discord](https://discord.lxdao.io) | [LXDAO Twitter](https://twitter.com/LXDAO_Official).

LXDAO is an R&D-focused DAO in Web3. Our mission is: To bring together buidlers to buidl and maintain valuable projects for Web3, in a sustainable manner.

<a target="_blank" href="https://lxdao.io/"><img alt="Buidl in LXDAO" src="https://bafkreibizgxz3knqj6nyq353l5pcqcwk2ad4pp7o4ymmtsxew7wc3zkuy4.ipfs.nftstorage.link/" width="180" /></a>
