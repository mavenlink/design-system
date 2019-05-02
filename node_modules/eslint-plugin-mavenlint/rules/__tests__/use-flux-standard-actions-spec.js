import { RuleTester } from 'eslint';
import rule from '../use-flux-standard-actions';

const ruleTester = new RuleTester();

ruleTester.run('use-flux-standard-actions', rule, {
  valid: [
    // Basic case with only a type property.
    {
      code: 'function test() { return { type: "FOO" }; }',
      filename: 'lib/action-creators/foo.js',
    },
    // Non-compliant action that's not in an action-creator file.
    {
      code: 'function test() { return { type: "FOO", data: "BAR" }; }',
      filename: 'lib/selectors/foo.js',
    },
    // Non-compliant action which doesn't even have a type property.
    {
      code: 'function test() { return { data: "BAR" }; }',
      filename: 'lib/action-creators/foo.js',
    },
    // Thunk action.
    {
      code: 'function test() { return function (dispatch) { dispatch({ foo: "BAR" }); } }',
      filename: 'lib/action-creators/foo.js',
    },
    // log property.
    {
      code: 'function test() { return { type: "FOO", log: true }; }',
      filename: 'lib/action-creators/foo.js',
    },
  ],
  invalid: [
    // Basic case with a non compliant property.
    {
      code: 'function test() { return { type: "FOO", data: "BAR" } }',
      filename: 'lib/action-creators/foo.js',
      errors: [{ type: 'ReturnStatement' }],
    }
  ],
});
