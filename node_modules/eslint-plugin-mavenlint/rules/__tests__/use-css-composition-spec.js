import { RuleTester } from 'eslint';
import rule from '../use-css-composition';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('use-css-composition', rule, {
  valid: [
    // Static string class.
    {
      code: 'function test() { return <span className="great" />; }',
    },
    // Variable class.
    {
      code: 'function test() { return <span className={styles.span} />; }',
    },
    // No class.
    {
      code: 'function test() { return <span />; }',
    },
  ],
  invalid: [
    // Interpolated class.
    {
      code: 'function test() { return <span className={`btn ${foo}`} />; }',
      errors: [{ type: 'JSXAttribute' }],
    }
  ],
});
