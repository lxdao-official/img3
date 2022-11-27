export enum Provider {
  NFTStorage,
  Pinata,
  FourEverland,
  Custom,
}

export type Option = {
  token?: string;
  jwt?: string;
  [index: string]: any;
};

export interface IConnector {
  upload(
    provider: Provider,
    imageData: string,
    options: Option
  ): Promise<string>;
}

export interface IAdvancedConnector {
  uploadToNFTStorage(imageData: string, options: Option): Promise<string>;
  uploadToPinata(imageData: string, options: Option): Promise<string>;
  uploadToFourEverland(imageData: string, options: Option): Promise<string>;
}
