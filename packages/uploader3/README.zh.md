## Props

- `multiple`: boolean 开启多选
- `accept`: string[] 限制上传文件类型 eg: ['.jpg', 'png']
- `crop`: Object 开启裁剪功能
  - `aspectRatio`: Number 裁剪比例
  - ....
- `connector`: uploader-connector 实例
- `api`:string 上传接口
- `onSelector`: (files: Array<{ file: File, previewUrl }>) => void
- `onCrop`: (files: Array<{ file: File, previewUrl: string, crop: Object }>) => void
- `onUploading`: (files: Array<{ file: File, previewUrl: string, percent: number, status: 'wait' | 'ing' | 'end' }>) => void
- `onComplete`: (files: Array<{ file: File, url: string }>) => void
