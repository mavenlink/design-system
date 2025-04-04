/* eslint-disable import/no-commonjs */
const stylelint = require('stylelint');

const ruleName = 'mds/spacing';
const url =
  'https://mavenlink.github.io/design-system/master/#/Brand%20Identity/Spacing';

// Note this can be replaced by native String.prototype.matchAll when node is upgraded past: 12.0.0
const matchAll = (string, regex) => {
  let splicedString = string;
  let matches = splicedString.match(regex);
  const finalMatches = [];

  if (matches) {
    matches = matches.filter((value, index) => {
      return matches.indexOf(value) === index;
    });

    matches.forEach((match) => {
      splicedString = string;
      let index = splicedString.indexOf(match);
      let buffer = 0;
      while (index !== -1) {
        const matchValue = {};
        matchValue.index = index + buffer;
        matchValue[0] = match;
        finalMatches.push(matchValue);
        splicedString = splicedString.substring(
          matchValue.index + match.length,
          splicedString.length,
        );
        buffer += index + match.length;
        index = splicedString.indexOf(match);
      }
    });
  }

  return finalMatches;
};

const fixmap = {
  '0.125rem': '--spacing-x-small',
  '2px': '--spacing-x-small',
  '0.25rem': '--spacing-small',
  '4px': '--spacing-small',
  '0.5rem': '--spacing-medium',
  '8px': '--spacing-medium',
  '1rem': '--spacing-large',
  '16px': '--spacing-large',
  '2rem': '--spacing-x-large',
  '32px': '--spacing-x-large',
};

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

module.exports = stylelint.createPlugin(
  ruleName,
  (primary, secondary, context) => {
    return (root, result) => {
      root.walkDecls((declaration) => {
        const property = declaration.prop;

        if (properties.includes(property)) {
          const currentValue = declaration.value;

          const invalidSpacingValue = Object.keys(fixmap).some(
            (spacingVariable) => {
              const pixelValueMatches = [...matchAll(currentValue, /-?[\d.]+(px|rem)/g)];
              return pixelValueMatches.some(
                pixValueMatch => pixValueMatch[0] === spacingVariable,
              );
            },
          );

          if (invalidSpacingValue) {
            if (context.fix) {
              let valueToFix = currentValue;
              Object.keys(fixmap).forEach((spacingVariable) => {
                const pixelValueMatches = [...matchAll(valueToFix, /-?[\d.]+(px|rem)/g)];
                pixelValueMatches.reverse().forEach((pixelValueMatch) => {
                  const matchIsNegative = pixelValueMatch[0][0] === '-';

                  let matchingString;
                  let mdsVariable;
                  let secondHalf;
                  if (matchIsNegative) {
                    matchingString = pixelValueMatch[0].substring(
                      1,
                      pixelValueMatch[0].length,
                    );
                    mdsVariable = `calc(-1 * var(${fixmap[spacingVariable]}))`;
                    secondHalf = valueToFix.substring(
                      pixelValueMatch.index + 1 + spacingVariable.length,
                      valueToFix.length,
                    );
                  } else {
                    matchingString = pixelValueMatch[0];
                    mdsVariable = `var(${fixmap[spacingVariable]})`;
                    secondHalf = valueToFix.substring(
                      pixelValueMatch.index + spacingVariable.length,
                      valueToFix.length,
                    );
                  }

                  if (matchingString === spacingVariable) {
                    const firstHalf = valueToFix.substring(
                      0,
                      pixelValueMatch.index,
                    );
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

              const importString =
                "@import '../../styles/spacing.css';";
              if (!root.toString().includes(importString) && shouldImport) {
                root.prepend(importString);
              }
            } else {
              const violation = { ruleName, node: declaration, result };
              stylelint.utils.report({
                ...violation,
                message: messages.rejected,
              });
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
  },
);

module.exports.ruleName = ruleName;
module.exports.targetedProperties = properties;
