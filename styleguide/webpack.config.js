/* eslint-disable import/no-commonjs */

const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.svg$/,
        include: [
          /src\/svgs\//,
        ],
        use: [
          { loader: 'svg-sprite-loader' },
          { loader: 'svgo-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1, modules: true } },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  plugins: [
    new SpriteLoaderPlugin(),
  ],
};
