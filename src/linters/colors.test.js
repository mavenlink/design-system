import stylelint from 'stylelint';
import colors from './colors.js';

const configuration = (options) => {
  return Object.assign({
    config: {
      plugins: ['./colors.js'],
      rules: {
        [colors.ruleName]: [true, {}],
      },
    },
    configBasedir: 'src/linters',
  }, options);
};

describe('src/linters/colors', () => {
  it('fails with hex colors', async () => {
    const code = '.should-fail { color: #ffaabb; }';

    await stylelint.lint(configuration({ code })).then((result) => {
      expect(result.errored).toBe(true);
      expect(result.results.length).toBe(1);

      const message = result.results[0].warnings[0].text;
      expect(message).toContain('Avoid using hex codes. Please use MDS variables instead. See https://mavenlink.github.io/design-system/master/#/Brand%20Identity?id=colors');
    });
  });

  it('fails with CSS colors', async () => {
    const code = '.should-fail { background-color: aliceblue; }';

    await stylelint.lint(configuration({ code })).then((result) => {
      expect(result.errored).toBe(true);
      expect(result.results.length).toBe(1);

      const message = result.results[0].warnings[0].text;
      expect(message).toContain('Avoid using CSS colors. Please use MDS variables instead. See https://mavenlink.github.io/design-system/master/#/Brand%20Identity?id=colors');
    });
  });
});
