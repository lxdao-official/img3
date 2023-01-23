export declare namespace Uploader3Connector {
  interface PostImageFile {
    data: string;
    type: 'image/png' | 'image/jpeg' | 'image/gif' | 'image/jpg';
  }

  type Connector = {
    postImage: (image: PostImageFile) => Promise<{ cid: string; url: string }>;
  };
}
