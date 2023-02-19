import './styles.scss';

import { useEffect, useState } from 'react';
import initSwc from '@swc/wasm-web';
import { SwcContext } from '../Hooks/useSwc';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from 'next-themes';

const RootTheme = createGlobalStyle`
  :root {
    --color-primary: hsl(var(--nextra-primary-hue) 100% 50%/1);
    --color-primary1: hsl(var(--nextra-primary-hue) 100% 50%/0.9);
    --color-primary2: hsl(var(--nextra-primary-hue) 100% 50%/0.8);
    --color-primary3: hsl(var(--nextra-primary-hue) 100% 50%/0.7);
    --color-primary4: hsl(var(--nextra-primary-hue) 100% 50%/0.6);
    --color-primary5: hsl(var(--nextra-primary-hue) 100% 50%/0.5);
    --color-primary6: hsl(var(--nextra-primary-hue) 100% 50%/0.4);
    --color-primary7: hsl(var(--nextra-primary-hue) 100% 50%/0.3);
    --color-primary8: hsl(var(--nextra-primary-hue) 100% 50%/0.2);
    --color-primary9: hsl(var(--nextra-primary-hue) 100% 50%/0.1);
    
    --color-purple: hsl(270 100% 50%/1);
    --color-purple1: hsl(270 100% 50%/0.9);
    --color-purple2: hsl(270 100% 50%/0.8);
    --color-purple3: hsl(270 100% 50%/0.7);
    --color-purple4: hsl(270 100% 50%/0.6);
    --color-purple5: hsl(270 100% 50%/0.5);
    --color-purple6: hsl(270 100% 50%/0.4);
    --color-purple7: hsl(270 100% 50%/0.3);
    --color-purple8: hsl(270 100% 50%/0.2);
    --color-purple9: hsl(270 100% 50%/0.1);
  }
`;

export default function MyApp({ Component, pageProps }) {
  const [initialized, setInitialized] = useState(false);

  // The response font size is based on the screen width
  useEffect(() => {
    const html = document.querySelector('html');
    const setFontSize = () => {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const fontSize = Math.min(width, 1216) / 100;
      html.style.setProperty('--rpx', `${fontSize}px`);
    };
    setFontSize();
    window.addEventListener('resize', setFontSize);
  }, []);

  useEffect(() => {
    async function importAndRunSwcOnMount() {
      await initSwc();
    }

    importAndRunSwcOnMount().then(() => {
      setInitialized(true);
    });
  }, []);

  return (
    <ThemeProvider enableSystem={false} defaultTheme={'light'}>
      <SwcContext.Provider value={{ initialized }}>
        <RootTheme />
        <Component {...pageProps} />
      </SwcContext.Provider>
    </ThemeProvider>
  );
}
