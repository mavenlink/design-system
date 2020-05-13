import stylelint from 'stylelint';

const ruleName = 'mds/colors';
const url = 'https://mavenlink.github.io/design-system/master/#/Brand%20Identity?id=colors';
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: `Please use CSS variables included in MDS Color palette: ${url}`,
});

module.exports = stylelint.createPlugin(ruleName, (primaryOption, secondaryOption) => {
  return (root, result) => {
    stylelint.utils.report({
      ruleName,
      node: root,
      message: messages.rejected,
      result,
    });
  };
});

module.exports.ruleName = ruleName;
