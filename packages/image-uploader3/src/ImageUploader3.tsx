import React, { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

// import { Connector } from "./Connector";
// import { Option, Provider, IConnector } from "./types";

import { IConnector, Option, Provider } from "connector";

export function convertIpfsGateway(url: string) {
  let cid: string = url;
  if (!url) {
    return null;
  }
  if (url.startsWith("ipfs://")) {
    cid = url.substring(7);
  }
  return `https://${cid}.ipfs.nftstorage.link`;
}

export interface ImageUploader3Props {
  style?: React.CSSProperties;
  className?: string;
  value?: string;
  onFinish?: Function;
  options: Option;
  provider: Provider;
  connector: IConnector;
}

export const ImageUploader3 = (props: ImageUploader3Props) => {
  const { provider, options, connector, onFinish, ...restProps } = props;
  const [value, setValue] = useState(props.value);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState();
  const defaultImg =
    "https://bafkreifz46msshy6wzmpwkvvkp3p6law62ixebe63zhbli72kujmcorog4.ipfs.nftstorage.link";

  const onChange = (
    imageList: ImageListType,
    addUpdatedIndex?: Array<number>
  ) => {
    setImage(imageList[0].dataUrl);
    uploadImage(imageList[0].dataUrl);
  };

  const uploadImage = async (imageUrl: string) => {
    setUploading(true);
    const cid = await connector.upload(provider, imageUrl, options);
    if (cid) {
      setValue(cid);
      onFinish && onFinish(cid);
    }
    setUploading(false);
  };

  return (
    <ImageUploading
      acceptType={["jpeg", "png", "jpg"]}
      onChange={onChange}
      dataURLKey="dataUrl"
      value={[]}
    >
      {({ onImageUpload }) => {
        return (
          <div>
            <div onClick={onImageUpload} {...restProps}>
              <img
                src={
                  uploading ? image : convertIpfsGateway(value) || defaultImg
                }
                alt=""
                width="100%"
              />
              {uploading && (
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    bottom: "0",
                    right: "0",
                    left: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,.5)",
                    zIndex: "1",
                    color: "#fff",
                  }}
                >
                  uploading...
                </div>
              )}
            </div>
          </div>
        );
      }}
    </ImageUploading>
  );
};
