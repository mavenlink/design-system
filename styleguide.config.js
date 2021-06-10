const fs = require('fs');
const path = require('path');
const webpackConfig = require('./styleguide/webpack.config.js');

module.exports = {
  assetsDir: [
    path.join(__dirname, 'styleguide/assets'),
    path.join(__dirname, 'pages'),
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
  moduleAliases: {
    '@mavenlink/design-system': __dirname,
  },
  pagePerSection: true,
  require: [
    path.join(__dirname, 'styleguide/content/content.css'),
    path.join(__dirname, 'styleguide/utils/include-msw.js'),
    path.join(__dirname, 'styleguide/utils/console-error.js'),
  ],
  sections: [
    {
      name: 'Overview',
      content: path.join(__dirname, 'styleguide/content/overview/overview.md'),
    },
    {
      name: 'Components',
      components: './src/components/**/*.jsx',
    },
    {
      name: 'Hooks',
      components: './src/hooks/**/*.jsx',
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
    },
    {
      name: 'Design Patterns',
      sections: [{
        name: 'Basic Page Patterns',
        content: path.join(__dirname, 'pages/design-patterns/basic-page-spacing.md'),
      }, {
        name: 'Page Patterns',
        content: path.join(__dirname, 'pages/design-patterns/pages/index.md'),
        sections: [{
          name: 'Table Page Type',
          content: path.join(__dirname, 'pages/design-patterns/pages/table-type.md'),
        }, {
          name: 'Form Page Type',
          content: path.join(__dirname, 'pages/design-patterns/pages/form-type.md'),
        }, {
          name: 'Form/Table Hybrid Page Type',
          content: path.join(__dirname, 'pages/design-patterns/pages/hybrid-type.md'),
        }, {
          name: 'Project View Page Type',
          content: path.join(__dirname, 'pages/design-patterns/pages/project-view-type.md'),
        }],
      }],
    },
  ],
  skipComponentsWithoutExample: true,
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
