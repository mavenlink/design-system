export const validFormats = {
  'mm/dd/yyyy': {
    matcher: /\d\d\/\d\d\/\d\d\d\d/,
  },
  'yyyy-mm-dd': {
    matcher: /\d\d\d\d-\d\d-\d\d/,
  },
};

export function formatMatching(string) {
  return Object.keys(validFormats).map((formatKey) => {
    const format = validFormats[formatKey];

    if (format.matcher.test(string)) {
      return format;
    }

    return null;
  }).filter(f => f)[0];
}
