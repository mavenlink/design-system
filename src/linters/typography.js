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

const valueTokenIndices = {
  font: 0,
  'font-family': 0,
  'font-size': 0,
  'font-style': 0,
  'font-weight': 0,
  'line-height': 0,
};

const properties = Object.keys(valueTokenIndices);

module.exports = stylelint.createPlugin(ruleName, () => {
  return (root, result) => {
    root.walkDecls((declaration) => {
      const property = declaration.prop;

      if (properties.includes(property)) {
        const valueTokens = declaration.value.split(' ');
        const propertyIndex = valueTokenIndices[property];

        if (!valueTokens[propertyIndex]) {
          return;
        }

        const cssVariable = (valueTokens[propertyIndex].match(cssVarRegex) || [])[0];
        const invalidFontSetting = !validFontSettings.includes(cssVariable);

        if (invalidFontSetting) {
          const violation = { ruleName, node: declaration, result };
          stylelint.utils.report({ ...violation, message: messages.rejected });
        }
      }
    });
  };
});

module.exports.ruleName = ruleName;
