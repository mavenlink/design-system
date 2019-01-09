/* eslint-disable import/no-commonjs */

const path = require('path');
const postCssCustomProperties = require('postcss-custom-properties');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1, modules: true } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postCssCustomProperties({
                  // TODO: Figure out how to remove the `importFrom` option below. We needed it because:
                  //
                  // 1. postcss-loader runs _before_ css-loader.
                  // 2. css-loader has not resolved imports, yet.
                  // 3. postcss doesn't know about the CSS variable definitions.
                  //
                  // One possible approach to resolving this is to remove css-loader and use postcss-import
                  // and postcss-modules instead.
                  importFrom: [
                    path.join(__dirname, '../src/styles/colors.css'),
                    path.join(__dirname, '../src/styles/typography.css'),
                  ],
                }),
              ],
            },
          },
        ],
      },
    ],
  },
};
