/* eslint-disable import/no-commonjs */

const path = require('path');
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
          { loader: 'css-loader', options: { importLoaders: 1, modules: true } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postCssPresetEnv({
                  stage: false,
                  features: {
                    'custom-properties': {
                      importFrom: [
                        path.join(__dirname, '../src/styles/colors.css'),
                        path.join(__dirname, '../src/styles/typography.css'),
                      ],
                    },
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
