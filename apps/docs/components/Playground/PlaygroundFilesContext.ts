import { SandpackFiles } from '@codesandbox/sandpack-react';
import { createContext, useContext } from 'react';

export const PlaygroundFilesContext = createContext<SandpackFiles>({});

export const usePlaygroundFiles = () => {
  return useContext(PlaygroundFilesContext);
};
