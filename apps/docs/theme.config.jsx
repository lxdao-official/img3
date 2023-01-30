import { Img3 } from '@lxdao/img3';
import { Uploader3 } from '@lxdao/uploader3';

import { LiveCode } from './components/LiveCode';
import { Logo } from './components/Logo';
import { Embed } from './components/Embed';

export default {
  logo: Logo,
  docsRepositoryBase: 'https://github.com/lxdao-official/Img3/blob/apps/docs/',
  project: {
    link: 'https://github.com/lxdao-official/Img3',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – LXDAO',
    };
  },
  components: {
    Img3,
    Uploader3,
    Playground: function (props) {
      return <LiveCode {...props} scope={{ Img3, Uploader3 }} />;
    },
    Embed,
  },
};
