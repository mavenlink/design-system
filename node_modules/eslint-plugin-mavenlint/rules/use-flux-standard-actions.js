const standardKeys = ['error', 'meta', 'payload', 'type', 'log'];

module.exports = {
  meta: {
    docs: {
      description: 'enforce using flux standard actions',
      category: 'Best Practices',
    },
  },
  create(context) {
    return {
      ReturnStatement(node) {
        // Is this an action creators file?
        const path = context.getFilename();
        if (!path.includes('action-creators')) { return; }

        // Is this return value an Object literal?
        const statement = node.argument;
        if (statement.type !== 'ObjectExpression') { return; }

        // Does this Object have a `type` property? If so, infer that this is an action.
        const properties = statement.properties;
        const keys = properties.map(property => property.key.name);
        if (!keys.includes('type')) { return; }

        // Are there non-standard keys?
        const extraKeys = keys.filter(key => !standardKeys.includes(key));
        if (extraKeys.length > 0) {
          context.report({
            node,
            message: 'Unexpected keys: {{ unexpectedKeys }} in Redux action. See https://github.com/mavenlink/welcome/wiki/Lint-Errors#use-flux-standard-actions',
            data: {
              unexpectedKeys: extraKeys.join(', '),
            },
          });
        }
      },
    };
  },
};
