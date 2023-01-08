import * as React from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  multiple?: boolean;
  /**
   * image accept file type, default is ['.png', '.jpeg', '.jpg', '.gif']
   * @example ['.png', '.jpg]
   */
  accept?: string[];
  /**
   * after selected files trigger
   * @param acceptedFiles - selected files
   */
  onSelected?: (acceptedFiles: File[]) => void;
  /**
   * after uploaded files trigger
   * @param urls
   */
  onCompleted?: (urls: string[]) => void;
};

export const Uploader3 = (props: Props) => {
  const { children, className, style, multiple } = props;

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': props.accept! },
    multiple,
    onDrop: (acceptedFiles) => {
      props.onSelected?.(acceptedFiles);
      setFiles(acceptedFiles);
    },
  });

  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <Wrapper style={style} {...getRootProps({ className })}>
      {children}
      <input {...getInputProps()} />
      <div>
        {files.map((file) => {
          return <img width={300} src={URL.createObjectURL(file).toString()} alt={file.name} key={file.name} />;
        })}
      </div>
    </Wrapper>
  );
};

Uploader3.defaultProps = {
  multiple: false,
  accept: ['.png', '.jpeg', '.jpg', '.gif'],
};
