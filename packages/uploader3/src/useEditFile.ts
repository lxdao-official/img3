import { useRef, useState } from 'react';

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export function useFiles<T extends any[]>(initialValue: T = [] as unknown as T) {
  const files = useRef<T>(initialValue);
  const file = useRef<ArrayElement<T> | null>(null);
  const [index, setIndex] = useState<number>(-1);

  function changeFiles(t: T) {
    files.current = t;
    file.current = t[0];
    setIndex(0);
  }

  function changeIndex(index: number) {
    file.current = files.current[index];
    setIndex(index);
  }

  function changeFile(file: ArrayElement<T>) {
    files.current[index] = file;
    file.current = file;
  }

  return {
    currentIndex: index,
    currentFile: file.current,
    files: files.current,
    setCurrentIndex: changeIndex,
    setCurrentFile: changeFile,
    setFiles: changeFiles,
  };
}
