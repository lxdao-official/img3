module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@lxdao/img3', '@lxdao/uploader3'],
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: process.env.NODE_ENV !== 'production',
      minify: true,
    },
  },
};
