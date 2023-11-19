import React from 'react';

import type { Uploader3Connector } from '@lxdao/uploader3-connector';

export type ModalStatus = 'init' | 'show' | 'afterShow' | 'hide' | 'afterHide';

export enum Uploader3FileStatus {
  none = 'none',
  cancel = 'cancel',
  cropped = 'cropped',
  notCropped = 'notCropped',
  uploading = 'uploading',
  done = 'done',
  error = 'error',
}

export type SelectedFile = {
  /** The File object */
  file: File;
  /** The file name */
  name: string;
  /** The file type, eg: image/jpeg */
  type: string;
  /** The file preview url of bold:// */
  previewUrl: string;
  /** file status */
  status: Uploader3FileStatus.cancel | Uploader3FileStatus.none;
};

export type SelectedFiles = SelectedFile[];

export type CroppedFile = Omit<SelectedFile, 'status'> & {
  status: Uploader3FileStatus.cropped | Uploader3FileStatus.notCropped;
  /** The cropp data */
  crop: Cropper.Data | null;
  /** Cropped preview data base64 type */
  imageData: string;
  /** Thumbnail preview data base64 type */
  thumbData: string;
};

export type UploadFile = Omit<CroppedFile, 'status'> & {
  status: Uploader3FileStatus.uploading;
};

export type UploadResult =
  | (Omit<UploadFile, 'status'> & { status: Uploader3FileStatus.done; url: string })
  | (Omit<UploadFile, 'status'> & { status: Uploader3FileStatus.error; message: string });

export type Uploader3Props = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  multiple?: boolean;
  /**
   * API endpoint to upload service, use post method.
   */
  api?: string;
  /**
   * The headers of post request
   */
  headers?: Record<string, string>;
  /**
   * The connector of uploader3
   */
  connector?: Uploader3Connector.Connector;
  /**
   * The response format function of uploader3
   * @param res - API response
   */
  responseFormat?: (res: Record<string, any>) => Record<string, any> & { url: string };
  /**
   * crop options
   */
  crop?: { size?: { width: number; height: number }; aspectRatio?: number } | boolean;
  /**
   * image accept file type, default is ['.png', '.jpeg', '.jpg', '.gif']
   * @example ['.png', '.jpg]
   */
  accept?: Array<'.png' | '.jpeg' | '.jpg' | '.gif' | '.svg'>;
  /**
   * after selected files trigger
   * @param acceptedFiles - selected files
   */
  onChange?: (files: SelectedFiles) => void;
  /**
   * uploading image trigger
   * @param file
   */
  onUpload?: (file: UploadFile) => void;
  /**
   * after uploaded files trigger
   * @param urls
   */
  onComplete?: (file: UploadResult) => void;
  /**
   * after crop file trigger
   * @param file
   */
  onCropEnd?: (file: CroppedFile) => void;
  /**
   * after cancel crop file trigger
   * @param file
   */
  onCropCancel?: (file: SelectedFile) => void;
};
