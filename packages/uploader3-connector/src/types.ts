export declare namespace Uploader3Connector {
  interface PostImageFile {
    data: string;
    type: 'image/png' | 'image/jpeg' | 'image/gif' | 'image/jpg';
  }

  function postImage(image: PostImageFile): Promise<{ cid: string; url: string }>;

  type Connector = {
    postImage: typeof postImage;
  };
}
