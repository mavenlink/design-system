/* eslint-disable import/no-commonjs */

const matchAll = require('string.prototype.matchall');
const fs = require('fs');
const path = require('path');
const stylelint = require('stylelint');

const spacing = fs.readFileSync(path.join(__dirname, '..', 'styles', 'spacing.css'), 'UTF-8');
const cssVarRegex = /--[a-z0-9-]+/g;
const validSpacingSettings = spacing.match(cssVarRegex);

const cssValueRegex = /[0-9]+px/g;
const valueKeys = spacing.match(cssValueRegex);

const ruleName = 'mds/spacing';
const url = 'https://mavenlink.github.io/design-system/master/#/Brand%20Identity/Spacing';

function zip(obj, value, index) {
  return { ...obj, [value]: validSpacingSettings[index] };
}
const fixmap = valueKeys.reduce(zip, {});

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: `To promote design consistency: use MDS spacing variables for margin and padding.
This rule can always be auto fixed with the --fix option.
Ie. ${JSON.stringify(fixmap)} For more info, see: ${url}.
If you are using a spacing value that is close to the MDS variable value please consider using the MDS value.`,
});

const properties = [
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
];

const fixes = [];

module.exports = stylelint.createPlugin(ruleName, (primary, secondary, context) => {
  return (root, result) => {
    root.walkDecls((declaration) => {
      const property = declaration.prop;

      if (properties.includes(property)) {
        const currentValue = declaration.value;

        const invalidSpacingValue = Object.keys(fixmap).some((spacingVariable) => {
          const pixelValueMatches = [...matchAll(currentValue, /\d+px/g)];
          return pixelValueMatches.some(pixValueMatch => pixValueMatch[0] === spacingVariable);
        });

        if (invalidSpacingValue) {
          if (context.fix) {
            let valueToFix = currentValue;
            Object.keys(fixmap).forEach((spacingVariable) => {
              const pixelValueMatches = [...matchAll(valueToFix, (/-?\d+px/g))];
              pixelValueMatches.reverse().forEach((pixelValueMatch) => {
                const matchIsNegative = pixelValueMatch[0][0] === '-';

                let matchingString;
                let mdsVariable;
                let secondHalf;
                if (matchIsNegative) {
                  matchingString = pixelValueMatch[0].substring(1, pixelValueMatch[0].length);
                  mdsVariable = `calc(-1 * var(${fixmap[spacingVariable]}))`;
                  secondHalf = valueToFix.substring(pixelValueMatch.index + 1
                    + spacingVariable.length, valueToFix.length);
                } else {
                  matchingString = pixelValueMatch[0];
                  mdsVariable = `var(${fixmap[spacingVariable]})`;
                  secondHalf = valueToFix.substring(pixelValueMatch.index
                    + spacingVariable.length, valueToFix.length);
                }

                if (matchingString === spacingVariable) {
                  const firstHalf = valueToFix.substring(0, pixelValueMatch.index);
                  valueToFix = `${firstHalf}${mdsVariable}${secondHalf}`;
                }
              });
            });
            fixes.push([declaration, valueToFix]);

            let shouldImport = true;
            try {
              require.resolve('@mavenlink/design-system');
            } catch (e) {
              shouldImport = false;
            }

            const importString = '@import \'@mavenlink/design-system/src/styles/spacing.css\';';
            if (!root.toString().includes(importString) && shouldImport) {
              root.prepend(importString);
            }
          } else {
            const violation = { ruleName, node: declaration, result };
            stylelint.utils.report({ ...violation, message: messages.rejected });
          }
        }
      }
    });

    // eslint-disable-next-line prefer-arrow-callback
    return new Promise(function (resolve) {
      // eslint-disable-next-line prefer-arrow-callback
      setTimeout(function () {
        // eslint-disable-next-line prefer-arrow-callback
        fixes.forEach(function (fixTuple) {
          // eslint-disable-next-line no-param-reassign
          fixTuple[0].value = fixTuple[1];
        });
        resolve();
      }, 1);
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.targetedProperties = properties;
