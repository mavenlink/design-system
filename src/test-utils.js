/**
 * Find a single descendant with the provided type. Throws an error if more than one descendants
 * match.
 * @param {object} wrapper - an instance as returned by `ReactTestRenderer.create`
 * @param {(string|function)} type - component constructor or string name for built-ins
 */
export function findByType(wrapper, type) {
  return wrapper.root.findByType(type);
}

/**
 *
 * @param {object} instance - an instance returned by `findByType`
 * @param {string} prop - name of the prop to extract
 */
export function getProp(instance, prop) {
  return instance.props[prop];
}
