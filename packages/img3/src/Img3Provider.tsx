import React, { createContext, useMemo, ReactNode } from 'react';

type Img3ProviderProps = {
  /** global default gateways */
  defaultGateways: string[];
  children: ReactNode;
}

export const Img3Context = createContext({defaultGateways: ['']});

export const Img3Provider: React.FC<Img3ProviderProps> = ({ children, defaultGateways }) => {
  const img3ContextValue = useMemo(
    () => ({
      defaultGateways: defaultGateways,
    }),
    [defaultGateways]
  );
  return (
    <Img3Context.Provider value={img3ContextValue}>
      {children}
    </Img3Context.Provider>
  )
}
