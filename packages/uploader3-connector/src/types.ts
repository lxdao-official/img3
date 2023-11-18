export declare namespace Uploader3Connector {
  interface PostImageFile {
    data: string;
    type: 'image/png' | 'image/jpeg' | 'image/gif' | 'image/jpg' | 'image/svg+xml';
  }

  type Connector = {
    postImage: (image: PostImageFile) => Promise<{ cid: string; url: string }>;
  };
}
