/* eslint-disable import/no-commonjs */

const fs = require('fs');
const path = require('path');
const stylelint = require('stylelint');

const typography = fs.readFileSync(path.join(__dirname, '..', 'styles', 'typography-v2.css'), 'UTF-8');
const cssVarRegex = /--[a-z0-9-]+/g;
const validFontSettings = typography.match(cssVarRegex);

const ruleName = 'mds/typography';
const url = 'https://mavenlink.github.io/design-system/master/#/Brand%20Identity?id=typography';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: `Please use MDS typography variables instead. See ${url}`,
});

const properties = [
  'font',
  'font-family',
  'font-size',
  'font-style',
  'font-weight',
  'line-height',
];

module.exports = stylelint.createPlugin(ruleName, () => {
  return (root, result) => {
    root.walkDecls((declaration) => {
      const property = declaration.prop;

      if (properties.includes(property)) {
        const valueTokens = declaration.value.split(' ');

        const invalidFontSetting = valueTokens.find((token) => {
          return !validFontSettings.find(validFontSetting => token.includes(validFontSetting));
        });

        if (invalidFontSetting) {
          const violation = { ruleName, node: declaration, result };
          stylelint.utils.report({ ...violation, message: messages.rejected });
        }
      }
    });
  };
});

module.exports.ruleName = ruleName;
