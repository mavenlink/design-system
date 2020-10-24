module.exports = {
  plugins: [
    'postcss-import',
    ['postcss-url', { url: 'inline' }],
    'postcss-preset-env',
  ],
};
