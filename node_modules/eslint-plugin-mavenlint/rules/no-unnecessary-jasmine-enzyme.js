const enzymeMatchers = [
  'toBeChecked',
  'toBeDisabled',
  'toBeEmptyRender',
  'toExist',
  'toContainReact',
  'toHaveClassName',
  'toHaveHTML',
  'toHaveProp',
  'toHaveRef',
  'toHaveState',
  'toHaveStyle',
  'toHaveTagName',
  'toHaveText',
  'toIncludeText',
  'toHaveValue',
  'toMatchElement',
  'toMatchSelector',
];

module.exports = {
  meta: {
    docs: {
      description: 'do not allow setting up jasmine enzyme if it is not being used',
      category: 'Best Practices',
    },
  },
  create(context) {
    const setupNodes = [];
    let usesEnzymeMatchers = false;

    return {
      CallExpression(node) {
        // Find everywhere jasmineEnzyme was setup.
        if (node.callee.name === 'jasmineEnzyme') {
          setupNodes.push(node);
        }
      },

      MemberExpression(node) {
        // Go no further if we already know we're using enzyme matchers.
        if (usesEnzymeMatchers) {
          return;
        }

        const isEnzymeMatcher = enzymeMatchers.includes(node.property.name);

        if (isEnzymeMatcher) {
          usesEnzymeMatchers = true;
        }
      },

      'Program:exit': function () {
        // Determine if jasmineEnzyme was setup but we _didn't_ use any of its matchers.
        if (setupNodes.length > 0 && !usesEnzymeMatchers) {
          setupNodes.forEach(function (node) {
            context.report({
              node,
              message: 'jasmineEnzyme setup, but never used. See https://github.com/mavenlink/welcome/wiki/Lint-Errors#no-unnecessary-jasmine-enzyme',
            });
          });
        }
      },
    };
  },
};
