module.exports = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ['@lxdao/img3', '@lxdao/uploader3'],
  },
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
      minify: true,
    },
  },
};
