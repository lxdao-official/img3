import { useRouter } from 'next/router';
import { useConfig, Callout, Tabs, Tab } from 'nextra-theme-docs';

import { Img3 } from '@lxdao/img3';
import { Uploader3 } from '@lxdao/uploader3';

import { LiveCode } from './components/LiveCode';
import { Logo } from './components/Logo';
import { Embed } from './components/Embed';

const MDXComponents = {
  Callout,
  Tabs,
  Tab,
  Img3,
  Uploader3,
  Playground: function (props) {
    return <LiveCode {...props} scope={{ Img3, Uploader3 }} />;
  },
  Embed,
};

export default {
  logo: Logo,
  darkMode: false,
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
