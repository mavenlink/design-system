import stylelint from 'stylelint';
import typography from './typography.js';

const configuration = (options) => {
  return Object.assign({
    config: {
      plugins: ['./typography.js'],
      rules: {
        [typography.ruleName]: [true, {}],
      },
    },
    configBasedir: 'src/linters',
  }, options);
};

describe('src/linters/typography', () => {
  it('passes on page title variable', async () => {
    const code = '.className { font: var(--mds-type-page-title); }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(false);
    });
  });

  it('passes on font-family variable for font-family', async () => {
    const code = '.className { font-family: var(--mds-type-font-family); }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(false);
    });
  });

  it('fails on deprecated variable usage', async () => {
    const code = '.should-fail { font-family: var(--mavenlink-type-font-family); }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on multi-attribute font declaration', async () => {
    const code = '.should-fail { font: 12px, "Open Sans", system-ui, sans-serif; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on multi-attribute font declaration mixed with variable usage', async () => {
    const code = '.should-fail { font: 12px, var(--mavenlink-type-font-family); }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on specified font without mds variable', async () => {
    const code = '.should-fail { font: "Open Sans"; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on specified font-family without mds variable', async () => {
    const code = '.should-fail { font-family: "Open Sans"; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on specified font-size without mds variable', async () => {
    const code = '.should-fail { font-size: 12px; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on specified font-style without mds variable', async () => {
    const code = '.should-fail { font-size: normal; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on specified font-weight without mds variable', async () => {
    const code = '.should-fail { font-weight: 400; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fails on specified line-height without mds variable', async () => {
    const code = '.should-fail { line-height: 1.2; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });
});
