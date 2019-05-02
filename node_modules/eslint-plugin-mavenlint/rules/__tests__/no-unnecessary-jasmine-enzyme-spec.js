import { RuleTester } from 'eslint';
import rule from '../no-unnecessary-jasmine-enzyme';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
  },
});

ruleTester.run('no-unnecessary-jasmine-enzyme', rule, {
  valid: [
    {
      // Invoking jasmineEnzyme AND using one of its matchers.
      code: [
        'describe("tests", () => {',
        '  beforeEach(() => {',
        '    jasmineEnzyme();',
        '  });',
        '  it("is true", () => {',
        '    expect(true).toBeChecked();',
        '  });',
        '});',
      ].join('\n'),
      filename: 'spec/foobar-spec.jsx',
    },
    {
      // Invoking jasmineEnzyme AND using a negated matcher.
      code: [
        'describe("tests", () => {',
        '  beforeEach(() => {',
        '    jasmineEnzyme();',
        '  });',
        '  it("is true", () => {',
        '    expect(true).not.toBeEmptyRender();',
        '  });',
        '});',
      ].join('\n'),
      filename: 'spec/foobar-spec.jsx',
    },
    {
      // Jasmine enzyme NOT invoked.
      code: [
        'describe("tests", () => {',
        '  it("is true", () => {',
        '    expect(true).toBeChecked(true);',
        '  });',
        '});',
      ].join('\n'),
      filename: 'spec/foobar-spec.jsx',
    }
  ],
  invalid: [
    {
      // Invoking jasmineEnzyme without using any of its matchers.
      code: [
        'describe("tests", () => {',
        '  beforeEach(() => {',
        '    jasmineEnzyme();',
        '  });',
        '  it("is true", () => {',
        '    expect(true).toEqual(true);',
        '  });',
        '});',
      ].join('\n'),
      filename: 'spec/foobar-spec.jsx',
      errors: [{ type: 'CallExpression' }],
    }
  ],
});
