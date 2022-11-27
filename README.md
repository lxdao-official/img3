# Img3 (WIP)

> NOTE: This project is in active development. We might change the API and documents. Please use it at your own risk until the 1.0 release.

A COMPLETE image solution for integrating IPFS with Web Applications. It consists of three core components:

- ImageUploader3: choose images and upload them to IPFS by using SDK Connectors or BackEnd API
- Img3: find the fastest IPFS Gateway for the viewer and show the images
- SDK Connector: common IPFS service providers' SDK adaptor

Architecture design:

![](https://user-images.githubusercontent.com/95468177/200095651-e2451115-6fb9-4e74-907d-6eca8ed1da45.png)

TODO: working on the components and documents, more details: https://github.com/filecoin-project/devgrants/issues/1122

## Getting Started

```
pnmp install
npx lerna run build
```

Change your token in `remixapp/routes/index.tsx` and then

```
npx lerna run dev
```

## Usage

Install Deps:

```
npm instal img3 image-uploader3 image-uploader3-connector
```

Import Deps:

```
import { ImageUploader3 } from "image-uploader3";
import { connector } from "image-uploader3-connector";
import { Img3 } from "img3";
```

Select and Upload image to IPFS through connector:

```
<ImageUploader3
  style={{
    overflow: "hidden",
    width: "250px",
    height: "250px",
    position: "relative",
    cursor: "pointer",
    border: "2px solid #ccc",
    borderColor: "#ccc",
  }}
  connector={connector}
  options={options}
  onUploaded={(cid) => {
    // ...cid
  }}
/>
```

Render image with cid and fastest IPFS gateway:

```
<Img3
  style={{
    width: 180,
    height: 180,
  }}
  src="ipfs://xxxxxxxxxxx"
/>
```
