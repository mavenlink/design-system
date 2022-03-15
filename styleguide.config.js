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
  getComponentPathLine(componentPath) {
    return `@mavenlink/design-system/${componentPath}`;
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
    path.join(__dirname, 'styleguide/utils/include-msw.js'),
    path.join(__dirname, 'styleguide/utils/console-error.js'),
  ],
  sections: [{
    name: 'README',
    content: path.join(__dirname, './README.md'),
  }, {
    name: 'Living Codebase',
    href: 'https://github.com/mavenlink/design-system',
  }, {
    name: 'Living Style Guide',
    href: 'https://www.notion.so/mldesignteam/Mavenlink-Design-System-d83f5bf8fef7429fbf88932331808d47',
  }, {
    name: 'Cell Controls',
    components: [
      path.join(__dirname, 'src/components/table/table.jsx'),
      path.join(__dirname, 'src/components/cell-control/autocompleter.jsx'),
      path.join(__dirname, 'src/components/cell-control/choice.jsx'),
      path.join(__dirname, 'src/components/cell-control/date.jsx'),
      path.join(__dirname, 'src/components/cell-control/input.jsx'),
      path.join(__dirname, 'src/components/cell-control/money.jsx'),
      path.join(__dirname, 'src/components/cell-control/multi-autocompleter.jsx'),
      path.join(__dirname, 'src/components/cell-control/multi-choice.jsx'),
      path.join(__dirname, 'src/components/cell-control/multi-select.jsx'),
      path.join(__dirname, 'src/components/cell-control/number.jsx'),
      path.join(__dirname, 'src/components/cell-control/select.jsx'),
      path.join(__dirname, 'src/components/cell-control/textarea.jsx'),
    ],
  }, {
    name: 'Form Controls',
    components: [
      path.join(__dirname, 'src/components/form/form.jsx'),
      path.join(__dirname, 'src/components/form-control/form-control.jsx'), // Is this private? Should it be undocumented as implementation details?
      path.join(__dirname, 'src/components/form-control-icons/form-control-icons.jsx'), // Is this private? Should it be undocumented as implementation details?
      path.join(__dirname, 'src/components/autocompleter/autocompleter.jsx'),
      path.join(__dirname, 'src/components/checkbox/checkbox.jsx'),
      path.join(__dirname, 'src/components/custom-field-input-currency/custom-field-input-currency.jsx'),
      path.join(__dirname, 'src/components/custom-field-input-date/custom-field-input-date.jsx'),
      path.join(__dirname, 'src/components/custom-field-input-multiple-choice/custom-field-input-multiple-choice.jsx'),
      path.join(__dirname, 'src/components/custom-field-input-number/custom-field-input-number.jsx'),
      path.join(__dirname, 'src/components/custom-field-input-single-choice/custom-field-input-single-choice.jsx'),
      path.join(__dirname, 'src/components/custom-field-input-text/custom-field-input-text.jsx'),
      path.join(__dirname, 'src/components/date/date.jsx'),
      path.join(__dirname, 'src/components/input/input.jsx'),
      path.join(__dirname, 'src/components/duration-input/duration-input.jsx'),
      path.join(__dirname, 'src/components/money-input/money-input.jsx'),
      path.join(__dirname, 'src/components/multi-autocompleter/multi-autocompleter.jsx'),
      path.join(__dirname, 'src/components/multi-select/multi-select.jsx'),
      path.join(__dirname, 'src/components/number/number.jsx'),
      path.join(__dirname, 'src/components/percentage/percentage.jsx'),
      path.join(__dirname, 'src/components/select/select.jsx'),
      path.join(__dirname, 'src/components/textarea/textarea.jsx'),
    ],
  }, {
    name: 'Widgets',
    components: [
      path.join(__dirname, 'src/components/button/button.jsx'),
      path.join(__dirname, 'src/components/calendar/calendar.jsx'),
      path.join(__dirname, 'src/components/help-icon/help-icon.jsx'),
      path.join(__dirname, 'src/components/icon-button/icon-button.jsx'), // Should this be part of a Button interface?
      path.join(__dirname, 'src/components/list-option/list-option.jsx'),
      path.join(__dirname, 'src/components/listbox/listbox.jsx'),
      path.join(__dirname, 'src/components/loader/loader.jsx'),
      path.join(__dirname, 'src/components/no-options/no-options.jsx'),
      path.join(__dirname, 'src/components/page-header/page-header.jsx'),
      path.join(__dirname, 'src/components/popover/popover.jsx'),
      path.join(__dirname, 'src/components/section/section.jsx'),
      path.join(__dirname, 'src/components/section-row/section-row.jsx'),
      path.join(__dirname, 'src/components/tag/tag.jsx'),
      path.join(__dirname, 'src/components/tag-list/tag-list.jsx'),
      path.join(__dirname, 'src/components/tag-skill/tag-skill.jsx'),
      path.join(__dirname, 'src/components/tooltip/tooltip.jsx'),
    ],
  }, {
    name: 'Icon Library',
    content: path.join(__dirname, './styleguide/content/icons/index.md'),
    components: [
      path.join(__dirname, 'src/components/icon/icon.jsx'),
    ],
  }],
  styleguideComponents: {
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
