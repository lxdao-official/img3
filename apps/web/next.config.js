module.exports = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ['img3'],
  },
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: false,
      minify: true,
    },
  },
};
