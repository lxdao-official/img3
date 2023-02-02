import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';
import { Logo } from './components/Logo';

import MDXComponents from './mdxComponents';

export default {
  logo: Logo,
  darkMode: false,
  nextThemes: {
    defaultTheme: 'light',
    enableSystem: false,
  },
  docsRepositoryBase: 'https://github.com/lxdao-official/Img3/blob/apps/docs/',
  project: {
    link: 'https://github.com/lxdao-official/Img3',
  },
  head: () => {
    const { asPath } = useRouter();
    const { frontMatter } = useConfig();
    return (
      <>
        <meta property="og:url" content={`${asPath}`} />
        <meta property="og:title" content={frontMatter.title || 'Img3 - LXDAO'} />
        <meta property="og:description" content={frontMatter.description || 'Img3 - LXDAO'} />
      </>
    );
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://lxdao.io/" target="_blank">
          LXDAO
        </a>
        .
      </span>
    ),
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – LXDAO',
    };
  },
  components: MDXComponents,
};
