import * as React from 'react';
import { Connector } from './connector';

type BasicFile = {
  /** The File object */
  file: File;
  /** The file name */
  name: string;
  /** The file extension */
  ext: string;
  /** The file preview url of bold: */
  previewUrl: string;
};

/**
 * Selected Files
 */
export type SelectedFile = BasicFile & {
  /** file status */
  status: 'none' | 'cancel';
};
export type SelectedFiles = SelectedFile[];

export type CroppedFile = Omit<SelectedFile, 'status'> & {
  status: 'cropped';
  /** The cropp data */
  crop: Cropper.Data;
  /** Cropped preview data base64 type */
  imageData: string;
  /** Thumbnail preview data base64 type */
  thumbnailData: string;
};
export type CroppedFiles = CroppedFile[];

export type UploadingFile = Omit<CroppedFile, 'status'> & {
  status: 'uploading';
};

export type UploadingFiles = UploadingFile[];

export type UploadedResult =
  | (Omit<UploadingFile, 'status'> & { status: 'done'; url: string })
  | (Omit<UploadingFile, 'status'> & { status: 'error'; message: string });

export type UploadedResults = UploadedResult[];

export type Uploader3Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  multiple?: boolean;
  api?: string;
  connector?: Connector;
  crop?:
    | {
        size: { width: number; height: number };
        aspectRatio?: number;
      }
    | boolean;
  /**
   * image accept file type, default is ['.png', '.jpeg', '.jpg', '.gif']
   * @example ['.png', '.jpg]
   */
  accept?: string[];
  /**
   * after selected files trigger
   * @param acceptedFiles - selected files
   */
  onSelected?: ((files: SelectedFiles) => void) | ((file: SelectedFile) => void);
  /**
   * uploading image trigger
   * @param file
   */
  onUploading?: ((files: UploadingFiles) => void) | ((file: UploadingFile) => void);
  /**
   * after uploaded files trigger
   * @param urls
   */
  onCompleted?: ((files: UploadedResults) => void) | ((file: UploadedResult) => void);

  onCropEnd?: (file: CroppedFile) => void;
  onCropCancel?: (file: SelectedFile) => void;
};
