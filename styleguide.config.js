const fs = require('fs');
const path = require('path');
const webpackConfig = require('./styleguide/webpack.config.js');

module.exports = {
  assetsDir: [
    './node_modules/msw/lib/iife',
  ],
  context: {
    uuid: 'uuid',
  },
  getExampleFilename(componentPath) {
    // Override the default function for finding example files. The default has some unfortunate
    // interplay between the presence of an index.js and a FolderName.md file. It thinks that the
    // FolderName.md file is intended to coincide with the index.js, instead of FolderName.js.
    // Because of that, it picks up examples where it shouldn't be.
    // @see https://github.com/styleguidist/react-styleguidist/blob/34f3c83e769542157c72d0e055ad8850d22b6001/src/scripts/schemas/config.js#L97
    // @see https://github.com/styleguidist/react-styleguidist/commit/545b466c4461021ac7220504b8d61b4bb62573c2
    return componentPath.replace(/\.jsx?$/, '.md');
  },
  ignore: [
    '**/__internal__/**',
    '**/__site__/**',
    '**/*.test.{js,jsx}',
  ],
  moduleAliases: {
    '@mavenlink/design-system': __dirname,
  },
  pagePerSection: true,
  require: [
    path.join(__dirname, 'styleguide/utils/include-msw.js'),
    path.join(__dirname, 'styleguide/utils/console-error.js'),
  ],
  sections: [{
    name: 'README',
    content: './README.md',
  }, {
    name: 'Living Codebase',
    href: 'https://github.com/mavenlink/design-system',
  }, {
    name: 'Living Style Guide',
    href: 'https://www.notion.so/Mavenlink-Design-System-d3118c3e2f5647d6adfc5b1599af993e',
  }, {
    name: 'Components',
    components: './src/components/**/*.jsx',
  }, {
    name: 'Icon Library',
    content: './styleguide/content/icons/index.md',
  }],
  styleguideComponents: {
    ComponentsListRenderer: path.join(__dirname, 'styleguide/components/components-list'),
    LinkRenderer: path.join(__dirname, 'styleguide/components/link'),
    StyleGuideRenderer: path.join(__dirname, 'styleguide/components/styleguide'),
    SectionRenderer: path.join(__dirname, './styleguide/components/section'),
    TableRenderer: path.join(__dirname, 'styleguide/components/table'),
  },
  styleguideDir: 'build',
  styles: path.resolve(__dirname, './styleguide.styles.config.js'),
  template: {
    favicon: 'favicon.ico',
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap',
        },
      ],
    },
  },
  title: 'Mavenlink Design System',
  updateExample(props = {}, exampleFilePath) {
    const { settings = {}, lang } = props;
    if (lang === 'css' && typeof settings.file === 'string') {
      const filepath = path.resolve(path.dirname(exampleFilePath), settings.file);
      settings.static = true;
      return {
        content: `/* ${settings.file} */\n\n${fs.readFileSync(filepath, 'utf8')}`,
        settings,
        lang,
      };
    }
    return props;
  },
  webpackConfig,
};
