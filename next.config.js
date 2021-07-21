const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  basePath: process.env.BASE_PATH || '',
  reactStrictMode: true,
  images: {
    loader: 'imgix', // hack: https://github.com/vercel/next.js/issues/21079
    path: '',
    disableStaticImages: true,
  },
  inlineImageLimit: -1,
});
