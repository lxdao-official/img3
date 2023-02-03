import { createContext, useContext } from 'react';
import { SandpackFiles } from '@codesandbox/sandpack-react';

export type PlaygroundContextType = {
  title: string;
  dependencies: Record<string, string>;
  files: SandpackFiles;
};

export const PlaygroundContext = createContext<PlaygroundContextType>({
  title: 'Playground - Img3 LXDAO',
  dependencies: {},
  files: {},
});

export const usePlayground = () => {
  return useContext(PlaygroundContext);
};
