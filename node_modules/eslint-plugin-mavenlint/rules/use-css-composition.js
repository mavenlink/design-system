module.exports = {
  meta: {
    docs: {
      description: 'use CSS composition instead of string interpolation for class names',
      category: 'Best Practices',
    },
  },
  create(context) {
    return {
      JSXAttribute(node) {
        // Is this a classname property?
        const identifier = node.name;
        if (identifier.name !== 'className') { return; }

        // Is the value an expression, as opposed to a literal?
        const value = node.value;
        if (!value.expression) { return; }

        // Is the expression a template literal?
        const expression = value.expression;
        if (expression.type === 'TemplateLiteral') {
          context.report({
            node,
            message: 'Use CSS composition instead of string interpolation. See https://github.com/mavenlink/welcome/wiki/Lint-Errors#use-css-composition',
          });
        }
      }
    };
  },
}
