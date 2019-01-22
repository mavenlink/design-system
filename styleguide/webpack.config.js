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
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2|ico)(\?(r=)?[\d-]+)?$/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
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
                      // TODO: Figure out how to get rid of the `importFrom` option. It's needed because:
                      //
                      // 1. postcss-loader runs before css-loader.
                      // 2. css-loader therefore hasn't processed the CSS imports, yet.
                      // 3. postcss-loader doesn't know about imported files when backfilling fallbacks for css variables.
                      //
                      // I've investigated resolving this by using postcss-import to process CSS imports. It works, but ends
                      // duplicating imported files. See c36ce551090fb25f455821a32219a8081a8c4d67.
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
