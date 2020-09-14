/* eslint-disable import/no-commonjs */

const postCssPresetEnv = require('postcss-preset-env');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(jpeg|ico)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000',
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
        test: /\.svg$/,
        include: [
          // Let file-loader pull the following in
          /styleguide\/components\/hero\//,
          /styleguide\/assets\/svgs\//,
        ],
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1, modules: true } },
          { loader: 'postcss-loader', options: { plugins: () => [postCssPresetEnv()] } },
        ],
      },
    ],
  },
  plugins: [
    new SpriteLoaderPlugin(),
  ],
};
