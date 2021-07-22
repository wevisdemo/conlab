const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  basePath: process.env.BASE_PATH || '',
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
  inlineImageLimit: -1,
  trailingSlash: true,
});
