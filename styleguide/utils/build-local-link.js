// Build a url path that will work regardless of whether the app is running:
// - Locally (for example, on localhost)
// - On production (for example, on mavenlink.github.io/design-system)
export default function buildLocalLink(path, pathname = window.location.pathname) { // eslint-disable-line no-undef
  const normalizedPathname = removeFromEnd(pathname, '/');
  const normalizedPath = removeFromBeginning(path, '/');
  const separator = (normalizedPath || !normalizedPathname) ? '/' : '';

  return `${normalizedPathname}${separator}${normalizedPath}`;
}

function removeFromBeginning(string, char) {
  if (string[0] === char) {
    return string.slice(1);
  }
  return string;
}

function removeFromEnd(string, char) {
  if (string[string.length - 1] === char) {
    return string.slice(0, -1);
  }
  return string;
}
