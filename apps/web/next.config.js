module.exports = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ['img3'],
  },
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
      minify: true,
    },
  },
};
