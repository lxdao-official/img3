import { NFTStorage, Blob } from "nft.storage";
import { Buffer } from "buffer";

import { IAdvancedConnector, IConnector, Option, Provider } from "./types";

export class NFTStorageConnector implements IAdvancedConnector {
  async uploadToNFTStorage(imageData: string, options: Option) {
    const nftStorage = new NFTStorage({
      token: options["token"],
    });
    // todo support more
    const imageDataUrl = imageData
      .replace(/^data:image\/png;base64,/, "")
      .replace(/^data:image\/jpeg;base64,/, "");

    const imageBuffer = Buffer.from(imageDataUrl, "base64");
    const someData = new Blob([imageBuffer]);
    return await nftStorage.storeBlob(someData);
  }
  uploadToPinata(imageData: string, options: Option) {
    //todo
    return null;
  }
  uploadToFourEverland(imageData: string, options: Option) {
    //todo
    return null;
  }
}

export class PinataConnector implements IAdvancedConnector {
  uploadToNFTStorage(imageData: string, options: Option) {
    //todo
    return null;
  }
  uploadToPinata(imageData: string, options: Option) {
    //todo
    return null;
  }
  uploadToFourEverland(imageData: string, options: Option) {
    //todo
    return null;
  }
}

export class FourEverlandConnector implements IAdvancedConnector {
  uploadToNFTStorage(imageData: string, options: Option) {
    //todo
    return null;
  }
  uploadToPinata(imageData: string, options: Option) {
    //todo
    return null;
  }
  uploadToFourEverland(imageData: string, options: Option) {
    //todo
    return null;
  }
}

export class Connector implements IConnector {
  upload(provider: Provider, imageData: string, options: Option) {
    let connector: IAdvancedConnector = new NFTStorageConnector();
    switch (provider) {
      case Provider.Pinata:
        connector = new PinataConnector();
        return connector.uploadToPinata(imageData, options);
      case Provider.FourEverland:
        connector = new FourEverlandConnector();
        return connector.uploadToFourEverland(imageData, options);
      default:
        connector = new NFTStorageConnector();
        return connector.uploadToNFTStorage(imageData, options);
    }
  }
}

const connector = new Connector();
export { connector };
