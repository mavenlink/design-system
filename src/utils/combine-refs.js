// Create new object based of two refs.
// Same keys but does not evaluate getter functions and always uses the latest ref.current.
// Given key collisions, prefers the second object as the actual value.
export default function combineRefs(ref1, ref2) {
  const newObject = {};

  Object.keys(ref1.current).reduce((acc, key) => (
    Object.defineProperty(acc, key, {
      get() { return ref1.current[key]; },
      configurable: true,
      enumerable: true,
    })
  ), newObject);

  Object.keys(ref2.current).reduce((acc, key) => (
    Object.defineProperty(acc, key, {
      get() { return ref2.current[key]; },
      configurable: true,
      enumerable: true,
    })
  ), newObject);

  return newObject;
}
