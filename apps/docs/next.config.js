const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
});

module.exports = withNextra({
  transpilePackages: ['@lxdao/img3', '@lxdao/uploader3'],
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
      minify: true,
    },
  },
});
