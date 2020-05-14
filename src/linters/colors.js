import stylelint from 'stylelint';
import cssColorMap from './data/css-colors.json';

const ruleName = 'mds/colors';
const url = 'https://mavenlink.github.io/design-system/master/#/Brand%20Identity?id=colors';
const solution = `Please use MDS variables instead. See ${url}`;

const messages = stylelint.utils.ruleMessages(ruleName, {
  noHex: `Avoid using hex codes. ${solution}`,
  noCssColors: `Avoid using CSS colors. ${solution}`,
});

const properties = ['color', 'background-color'];
const hasHex = value => value.match(/#[a-fA-F0-9]+/);
const isCssColor = value => Object.keys(cssColorMap).includes(value);

module.exports = stylelint.createPlugin(ruleName, (primaryOption, secondaryOption) => {
  return (root, result) => {
    root.walkDecls((declaration) => {
      const property = declaration.prop;
      const invalidColor = hasHex(declaration.value) || isCssColor(declaration.value);

      if (properties.includes(property) && invalidColor) {
        const violation = { ruleName, node: declaration, result };

        if (hasHex(declaration.value)) {
          stylelint.utils.report({ ...violation, message: messages.noHex });
        }

        if (isCssColor(declaration.value)) {
          stylelint.utils.report({ ...violation, message: messages.noCssColors });
        }
      }
    });
  };
});

module.exports.ruleName = ruleName;
