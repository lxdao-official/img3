import React, { useEffect, useState } from "react";
// import * as Ping from "ping.js";
import { Img3Props } from "./types";

export const Img3 = (props: Img3Props) => {
  const { src, gateway, ...restProps } = props;
  const [pingPong, setPingPong] = useState([]);
  const gatewayList = [
    "https://nftstorage.link/ipfs",
    "https://gateway.pinata.cloud/ipfs",
    "https://4everland.io/ipfs",
  ];

  const convertIpfsGateway = (src: string) => {
    let cid: string = src;
    if (src.startsWith("ipfs://")) {
      cid = src.substring(7);
    }
    let cidUrl = "";
    if (gateway) {
      const array = gateway.split("//");
      if (array.length >= 2) {
        cidUrl = `${array[0]}://${cid}.ipfs.${array[1]}`;
      }
    } else {
      cidUrl = `https://${cid}.ipfs.nftstorage.link`;
    }
    return cidUrl;
  };

  useEffect(() => {
    //todo ping gateway
    // var ping = new Ping({ timeout: 2000 });
    // Promise.all([
    //   ping.ping(gatewayList[0]),
    //   ping.ping(gatewayList[1]),
    //   ping.ping(gatewayList[2]),
    // ]).then((res) => {
    //   setPingPong(res);
    // });
  }, []);

  return <img src={convertIpfsGateway(src)} {...restProps} alt="" />;
};
