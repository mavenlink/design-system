/* eslint-disable import/no-commonjs */

const path = require('path');

module.exports = {
  exampleMode: 'expand',
  getExampleFilename(componentPath) {
    // Override the default function for finding example files. The default has some unfortunate
    // interplay between the presence of an index.js and a FolderName.md file. It thinks that the
    // FolderName.md file is intended to coincide with the index.js, instead of FolderName.js.
    // Because of that, it picks up examples where it shouldn't be.
    // @see https://github.com/styleguidist/react-styleguidist/blob/34f3c83e769542157c72d0e055ad8850d22b6001/src/scripts/schemas/config.js#L97
    // @see https://github.com/styleguidist/react-styleguidist/commit/545b466c4461021ac7220504b8d61b4bb62573c2
    return componentPath.replace(/\.jsx?$/, '.md');
  },
  pagePerSection: true,
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    PlaygroundRenderer: path.join(__dirname, 'styleguide/components/playground'),
    ReactComponentRenderer: path.join(__dirname, 'styleguide/components/react-component'),
    StyleGuideRenderer: path.join(__dirname, 'styleguide/components/styleguide'),
    TabButton: path.join(__dirname, 'styleguide/components/tab-button'),
    TableRenderer: path.join(__dirname, 'styleguide/components/table'),
  },
  styleguideDir: 'build',
  theme: {
    color: {
      sidebarBackground: 'white',
    },
  },
  title: 'Mavenlink Design System',
  usageMode: 'expand',
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules',
        },
      ],
    },
  },
};
