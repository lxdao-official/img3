import { createContext } from 'react';

export const SwcContext = createContext<{ initialized: boolean }>({ initialized: false });
