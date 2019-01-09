/* eslint-disable import/no-commonjs */

const postCssImport = require('postcss-import');
const postCssPresetEnv = require('postcss-preset-env');

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
          { loader: 'css-loader', options: { import: false, importLoaders: 1, modules: true } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postCssImport,
                postCssPresetEnv({
                  stage: false,
                  features: {
                    'custom-properties': true,
                  },
                }),
              ],
            },
          },
        ],
      },
    ],
  },
};
