/* eslint-disable import/no-commonjs */

const path = require('path');
const webpackConfig = require('./styleguide/webpack.config.js');

module.exports = {
  assetsDir: 'styleguide/assets',
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
  require: [
    './styleguide/content/content.css',
  ],
  sections: [
    {
      name: 'Overview',
      content: './styleguide/content/overview/overview.md',
    },
    {
      name: 'Components',
      components: './src/components/**/*.jsx',
      sectionDepth: 2,
    },
  ],
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    LinkRenderer: path.join(__dirname, 'styleguide/components/link'),
    PlaygroundRenderer: path.join(__dirname, 'styleguide/components/playground'),
    ReactComponentRenderer: path.join(__dirname, 'styleguide/components/react-component'),
    StyleGuideRenderer: path.join(__dirname, 'styleguide/components/styleguide'),
    TabButton: path.join(__dirname, 'styleguide/components/tab-button'),
    TableRenderer: path.join(__dirname, 'styleguide/components/table'),
  },
  styleguideDir: 'build',
  template: {
    favicon: 'favicon.ico',
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Merriweather|Open+Sans',
        },
      ],
    },
  },
  theme: {
    color: {
      sidebarBackground: 'white',
    },
    fontFamily: {
      base: '"Open Sans", system-ui, sans-serif',
    },
    fontSize: {
      base: 16,
      h1: 30,
      h2: 24,
      h3: 18,
      h4: 16,
      h5: 14,
      h6: 14,
    },
  },
  title: 'Mavenlink Design System',
  usageMode: 'expand',
  webpackConfig,
};
