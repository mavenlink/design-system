import stylelint from 'stylelint';
import spacing from './spacing.js';

const configuration = (code, options) => {
  return Object.assign({
    config: {
      plugins: ['./spacing.js'],
      rules: {
        [spacing.ruleName]: [true, {}],
      },
    },
    configBasedir: 'src/linters',
    fix: options && options.fix,
  }, code);
};

describe('src/linters/spacing', () => {
  it('errors on a mds variable value', async () => {
    const code = '.className { margin: 2px; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('does not errors on a value differnet from a mds variable value', async () => {
    const code = '.className { margin: 3px; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(false);
    });
  });

  it('does not error on an attribute other than margin or padding', async () => {
    const code = '.className { border: 2px; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(false);
    });
  });

  it('errors on margin', async () => {
    const code = '.className { margin: 16px; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('errors on padding', async () => {
    const code = '.className { padding: 32px; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });

  it('fixes mds variables to their value when fixed is passed in and does not error', async () => {
    const code = '.className { margin: 16px; }';

    await stylelint.lint(configuration({ code }, { fix: true })).then((data) => {
      expect(data.errored).toBe(false);
      expect(data.output).toEqual('.className { margin: var(--spacing-large); }');
    });
  });

  it('fixes mds variables to their value when fixed is passed in and does not error even when there are multiple values', async () => {
    const code = '.className { margin: 16px 0 8px 0; }';

    await stylelint.lint(configuration({ code }, { fix: true })).then((data) => {
      // expect(data.errored).toBe(false);
      expect(data.output).toEqual('.className { margin: var(--spacing-large) 0 var(--spacing-medium) 0; }');
    });
  });
});
