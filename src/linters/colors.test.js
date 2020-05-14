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
  it('fails on a CSS variable value', async () => {
    const code = '.className { color: var(--palette-brand-text); }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on named colors values', async () => {
    const code = '.should-fail { color: aliceblue; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on 3-digit hex values', async () => {
    const code = '.should-fail { color: #ffa; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on 6-digit hex values', async () => {
    const code = '.should-fail { color: #ffaabb; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on 4-digit hex values', async () => {
    const code = '.should-fail { color: #ffaa; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on 8-digit hex values', async () => {
    const code = '.should-fail { color: #ffaaffaa; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on rgb values', async () => {
    const code = '.should-fail { color: rgb(0, 0, 0); }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on rgba values', async () => {
    const code = '.should-fail { color: rgba(0, 0, 0, 0); }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on hsl values', async () => {
    const code = '.should-fail { color: hsl(0, 0, 0); }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on hsla values', async () => {
    const code = '.should-fail { color: hsla(0, 0, 0, 0); }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
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
