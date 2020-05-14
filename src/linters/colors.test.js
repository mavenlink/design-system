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
  it('fails on hex values', async () => {
    const code = '.should-fail { color: #ffaabb; }';

    await stylelint.lint(configuration({ code })).then((result) => {
      expect(result.errored).toBe(true);
    });
  });
});
