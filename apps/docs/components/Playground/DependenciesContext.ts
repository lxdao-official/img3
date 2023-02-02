import { createContext, useContext } from 'react';

export const DependenciesContext = createContext<Record<string, string>>({});

export const useDependencies = () => {
  const dependencies = useContext(DependenciesContext);
  return { dependencies };
};
