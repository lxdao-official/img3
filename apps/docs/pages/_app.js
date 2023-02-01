import './styles.scss';

import { useEffect, useState } from 'react';
import initSwc from '@swc/wasm-web';
import { SwcContext } from '../Hooks/useSwc';

export default function MyApp({ Component, pageProps }) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    async function importAndRunSwcOnMount() {
      await initSwc();
    }
    importAndRunSwcOnMount().then(() => {
      setInitialized(true);
    });
  }, []);

  return (
    <SwcContext.Provider value={{ initialized }}>
      <Component {...pageProps} />
    </SwcContext.Provider>
  );
}
