/* eslint-disable import/no-commonjs */

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
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        }],
      },
      {
        test: /\.svg$/,
        include: [
          /src\/svgs\//,
        ],
        use: [
          { loader: 'svg-sprite-loader', options: {} },
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
