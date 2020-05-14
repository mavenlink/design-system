import fs from 'fs';
import path from 'path';
import stylelint from 'stylelint';

function processColors() {
  const stylesheet = fs.readFileSync(path.join(__dirname, '..', 'styles', 'colors-v2.css'), 'UTF-8');

  return stylesheet.match(/--[a-z0-9\-]+/g);
}

const validColors = processColors();

const ruleName = 'mds/colors';
const url = 'https://mavenlink.github.io/design-system/master/#/Brand%20Identity?id=colors';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: `Please use MDS variables instead. See ${url}`,
});

const properties = ['color', 'background-color'];

module.exports = stylelint.createPlugin(ruleName, (primaryOption, secondaryOption) => {
  return (root, result) => {
    root.walkDecls((declaration) => {
      const property = declaration.prop;
      const invalidColor = !validColors.includes(declaration.value);

      if (properties.includes(property) && invalidColor) {
        const violation = { ruleName, node: declaration, result };
        stylelint.utils.report({ ...violation, message: messages.rejected });
      }
    });
  };
});

module.exports.ruleName = ruleName;
