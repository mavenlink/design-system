import stylelint from 'stylelint';
import spacing from './spacing.js';

const configuration = (options) => {
  return Object.assign({
    config: {
      plugins: ['./spacing.js'],
      rules: {
        [spacing.ruleName]: [true, {}],
      },
    },
    configBasedir: 'src/linters',
  }, options);
};

describe('src/linters/spacing', () => {
  it('do', async () => {
    const code = '.className { margin: 2px; }';

    await stylelint.lint(configuration({ code })).then((data) => {
      expect(data.errored).toBe(true);
    });
  });
});
