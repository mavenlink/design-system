import fs from 'fs';
import path from 'path';
import stylelint from 'stylelint';

const stylesheet = fs.readFileSync(path.join(__dirname, '..', 'styles', 'colors-v2.css'), 'UTF-8');
const validColors = stylesheet.match(/--[a-z0-9\-]+/g);

const ruleName = 'mds/colors';
const url = 'https://mavenlink.github.io/design-system/master/#/Brand%20Identity?id=colors';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: `Please use MDS variables instead. See ${url}`,
});

const properties = [
  'color', // no shorthand
  'background-color', // background - we only care if value length is 1, maybe add logic about url
  'border-color', // border - we only care about if value length is 3
  'border-left-color', // border-left - we only care about if value length is 3
  'border-top-color', // border-top - we only care about if value length is 3
  'border-right-color', // border-right - we only care about if value length is 3
  'border-bottom-color', // border-bottom - we only care about if value length is 3
  'stroke',
  'fill',
];

module.exports = stylelint.createPlugin(ruleName, (primaryOption, secondaryOption) => {
  return (root, result) => {
    root.walkDecls((declaration) => {
      const property = declaration.prop;

      if (properties.includes(property)) {
        const cssVariable = (declaration.value.match(/--[a-z0-9\-]+/g) || [])[0];
        const invalidColor = !validColors.includes(cssVariable);

        if (invalidColor) {
          const violation = { ruleName, node: declaration, result };
          stylelint.utils.report({ ...violation, message: messages.rejected });
        }
      }

      if (property === 'border') {
        const valueTokens = declaration.value.split(' ');

        if (valueTokens.length === 3) {
          const cssVariable = (valueTokens[2].match(/--[a-z0-9\-]+/g) || [])[0];
          const invalidColor = !validColors.includes(cssVariable);

          if (invalidColor) {
            const violation = { ruleName, node: declaration, result };
            stylelint.utils.report({ ...violation, message: messages.rejected });
          }
        }
      }

      if (property === 'background') {
        if (declaration.value.indexOf('url(') !== -1) return;

        const valueTokens = declaration.value.split(' ');

        if (valueTokens.length === 1) {
          const cssVariable = (valueTokens[0].match(/--[a-z0-9\-]+/g) || [])[0];
          const invalidColor = !validColors.includes(cssVariable);

          if (invalidColor) {
            const violation = { ruleName, node: declaration, result };
            stylelint.utils.report({ ...violation, message: messages.rejected });
          }
        }
      }
    });
  };
});

module.exports.ruleName = ruleName;
