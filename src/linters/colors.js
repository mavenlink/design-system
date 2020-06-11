/* eslint-disable import/no-commonjs */

const fs = require('fs');
const path = require('path');
const stylelint = require('stylelint');

const stylesheet = fs.readFileSync(path.join(__dirname, '..', 'styles', 'colors-v2.css'), 'UTF-8');
const cssVarRegex = /--[a-z0-9-]+/g;
const validColors = stylesheet.match(cssVarRegex);

const ruleName = 'mds/colors';
const url = 'https://mavenlink.github.io/design-system/master/#/Brand%20Identity?id=colors';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: `Please use MDS color variables instead. See ${url}`,
});

const valueTokenIndices = {
  color: 0,
  'background-color': 0,
  'border-color': 0,
  'border-left-color': 0,
  'border-top-color': 0,
  'border-right-color': 0,
  'border-bottom-color': 0,
  stroke: 0,
  fill: 0,
  background: 0,
  border: 2,
  'border-left': 2,
  'border-top': 2,
  'border-right': 2,
  'border-bottom': 2,
};

const whitelistedValues = ['none', 'transparent'];
const properties = Object.keys(valueTokenIndices);

module.exports = stylelint.createPlugin(ruleName, () => {
  return (root, result) => {
    root.walkDecls((declaration) => {
      const property = declaration.prop;

      if (properties.includes(property)) {
        if (whitelistedValues.includes(declaration.value)) return;
        if (declaration.value.indexOf('url(') !== -1) return;

        const valueTokens = declaration.value.split(' ');
        const propertyIndex = valueTokenIndices[property];

        if (!valueTokens[propertyIndex]) {
          return;
        }

        const cssVariable = (valueTokens[propertyIndex].match(cssVarRegex) || [])[0];
        const invalidColor = !validColors.includes(cssVariable);

        if (invalidColor) {
          const violation = { ruleName, node: declaration, result };
          stylelint.utils.report({ ...violation, message: messages.rejected });
        }
      }
    });
  };
});

module.exports.ruleName = ruleName;

module.exports.targetedProperties = Object.keys(valueTokenIndices);
