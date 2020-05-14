import stylelint from 'stylelint';

const ruleName = 'mds/colors';
const url = 'https://mavenlink.github.io/design-system/master/#/Brand%20Identity?id=colors';
const solution = `Please use MDS variables instead. See ${url}`;

const messages = stylelint.utils.ruleMessages(ruleName, {
  noHex: `Avoid using hex codes. ${solution}`,
});

const properties = ['color'];
const hasHex = value => value.match(/#[a-fA-F0-9]+/);

module.exports = stylelint.createPlugin(ruleName, (primaryOption, secondaryOption) => {
  return (root, result) => {
    root.walkDecls((declaration) => {
      const property = declaration.prop;

      if (properties.includes(property) && hasHex(declaration.value)) {
        stylelint.utils.report({
          ruleName,
          node: root,
          message: messages.noHex,
          result,
        });
      }
    });
  };
});

module.exports.ruleName = ruleName;
