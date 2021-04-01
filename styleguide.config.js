const fs = require('fs');
const path = require('path');
const webpackConfig = require('./styleguide/webpack.config.js');

module.exports = {
  assetsDir: [
    path.join(__dirname, 'styleguide/assets'),
    './node_modules/msw/lib/iife',
  ],
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
  moduleAliases: {
    '@mavenlink/design-system': __dirname,
  },
  pagePerSection: true,
  require: [
    path.join(__dirname, 'styleguide/content/content.css'),
    path.join(__dirname, 'styleguide/utils/include-msw.js'),
  ],
  sections: [
    {
      name: 'Overview',
      content: path.join(__dirname, 'styleguide/content/overview/overview.md'),
    },
    {
      name: 'Components',
      components: './src/components/**/*.jsx',
      sectionDepth: 2,
    },
    {
      name: 'Hooks',
      components: './src/hooks/**/*.jsx',
      sectionDepth: 1,
    },
    {
      name: 'Icon Library',
      content: './styleguide/content/icons/index.md',
    },
    {
      name: 'Guidelines',
      sections: [
        {
          name: 'Accessibility',
          content: path.join(__dirname, 'styleguide/content/guidelines/accessibility.md'),
        },
        {
          name: 'Contribute',
          content: path.join(__dirname, 'docs/contributing.md'),
        },
      ],
    },
    {
      name: 'Brand Identity',
      sections: [
        {
          name: 'Colors',
          content: path.join(__dirname, 'styleguide/content/brand-identity/colors.md'),
        },
        {
          name: 'Spacing',
          content: path.join(__dirname, 'styleguide/content/brand-identity/spacing.md'),
        },
        {
          name: 'Typography',
          content: path.join(__dirname, 'styleguide/content/brand-identity/typography.md'),
        },
      ],
      sectionDepth: 2,
      pagePerSection: true,
    },
    {
      name: 'Design Patterns',
      sections: [
        {
          name: 'Basic Page Patterns',
          content: path.join(__dirname, 'styleguide/content/design-patterns/basic-page-spacing.md'),
        },
      ],
    },
  ],
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    ComponentsListRenderer: path.join(__dirname, 'styleguide/components/components-list'),
    LinkRenderer: path.join(__dirname, 'styleguide/components/link'),
    PlaygroundRenderer: path.join(__dirname, 'styleguide/components/playground'),
    ReactComponentRenderer: path.join(__dirname, 'styleguide/components/react-component'),
    StyleGuideRenderer: path.join(__dirname, 'styleguide/components/styleguide'),
    SectionRenderer: path.join(__dirname, './styleguide/components/section'),
    TabButton: path.join(__dirname, 'styleguide/components/tab-button'),
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
  usageMode: 'expand',
  updateExample(props = {}, exampleFilePath) {
    const { settings = {}, lang } = props;
    if (lang === 'css' && typeof settings.file === 'string') {
      const filepath = path.resolve(path.dirname(exampleFilePath), settings.file);
      settings.static = true;
      return {
        content: `/* ${settings.file} */\n\n${fs.readFileSync(filepath, 'utf8')}`,
        settings,
        lang
      };
    }
    return props;
  },
  webpackConfig,
};
