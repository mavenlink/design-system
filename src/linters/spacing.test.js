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

  it('fixes multiple mds variables to their values when fixed is passed in and does not error', async () => {
    const code = '.className { margin: 16px 16px 0 0; }';

    await stylelint.lint(configuration({ code }, { fix: true })).then((data) => {
      expect(data.errored).toBe(false);
      expect(data.output).toEqual('.className { margin: var(--spacing-large) var(--spacing-large) 0 0; }');
    });
  });

  it('fixes rem values as well', async () => {
    const code = '.className { margin: 1rem 2rem 0.5rem 0.25rem; }';

    await stylelint.lint(configuration({ code }, { fix: true })).then((data) => {
      expect(data.errored).toBe(false);
      expect(data.output).toEqual('.className { margin: var(--spacing-large) var(--spacing-x-large) var(--spacing-medium) var(--spacing-small); }');
    });
  });

  it('ignores values that postfix match the mds values', async () => {
    const code = '.className { margin-top: 444px; padding-left: 22px; padding-right: calc(22px + 4px); }';

    await stylelint.lint(configuration({ code }, { fix: true })).then((data) => {
      expect(data.errored).toBe(false);
      expect(data.output).toEqual('.className { margin-top: 444px; padding-left: 22px; padding-right: calc(22px + var(--spacing-small)); }');
    });
  });

  it('fixes mds variables to their value when fixed is passed in and does not error even when there are multiple values', async () => {
    const code = '.className { margin: 16px 0 8px 0; }';

    await stylelint.lint(configuration({ code }, { fix: true })).then((data) => {
      expect(data.errored).toBe(false);
      expect(data.output).toEqual('.className { margin: var(--spacing-large) 0 var(--spacing-medium) 0; }');
    });
  });

  it('fixes mds variables to their value when fixed is passed in and does not error even when there are multiple css rules', async () => {
    const code = '.className { margin: 16px 0 8px 0; }; .otherClass { margin-top: 2px }';

    await stylelint.lint(configuration({ code }, { fix: true })).then((data) => {
      expect(data.errored).toBe(false);
      expect(data.output).toEqual('.className { margin: var(--spacing-large) 0 var(--spacing-medium) 0; }; .otherClass { margin-top: var(--spacing-x-small) }');
    });
  });

  it('can fix complex usages of calc including negatives', async () => {
    const code = '.className { margin-top: calc((-16px / 4) + 3px - 32px); }';

    await stylelint.lint(configuration({ code }, { fix: true })).then((data) => {
      expect(data.errored).toBe(false);
      expect(data.output).toEqual('.className { margin-top: calc((calc(-1 * var(--spacing-large)) / 4) + 3px - var(--spacing-x-large)); }');
    });
  });
});
