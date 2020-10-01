# Testing Philosophy

There are 3 different kinds of testing in this repository:

- [Unit](#unit)
- [Integration](#integration)
- [Linting](#linting)

## Unit

Unit tests use [Jest](https://jestjs.io/) and [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro) to test the individual components. They serve to give us confidence that the components exported by our package are working as intended, and are a great way to test all the nitty-gritty logic in our components.

Run these with:

```
yarn test
```

An important bit to note: our test fail if there is prop-types are violated.
At the moment, this check is performed in the `jest.config.setup.files.after.env.js` file.
During development, it might be worthwhile to comment out contents of the file while there are weird failures.

### Patterns

1. [Jest snapshots](https://jestjs.io/docs/en/snapshot-testing) test the default DOM structure and DOM attributes of a component
2. Component API tests
    - [Jest matchers](https://jestjs.io/docs/en/expect) are the default set of test assertions
    - [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom#table-of-contents) are extra test assertions for DOM elements and accessibility
    - [`@testing-library/react` queries](https://testing-library.com/docs/guide-which-query) are DOM tree traversal methods with accessibility prioritized
    - [`@testing-library/dom` events](https://github.com/testing-library/dom-testing-library/blob/master/src/events.js) are DOM events to approximate user interactions on components

The general flow for testing a component is:

1. Test the default render state and ref state
    - A simple test would: `render(...); expect(document.body).toMatchSnapshot();`
    - A simple test would `render(<... ref={ref} />); expect(ref.current).toMatchSnapshot();`
1. Test each prop API interface:
    - boolean: set to `true` and `false`
    - string: set to some unique string
    - number: set to some unique number
    - array: set to an empty array, an array length of 1, and an array length greater than 1
1. Test each ref API interface:
    - getter: get the value on a variety of component states (which matter to the getter function)
    - setter: follow a similar testing pattern to the props API interface testing
1. Test a11y interactivity
    - For each keyboard support, there should be an explicit test for its functionality
        - A simple test would `fireEvent.keyDown` (until `userEvent.type` works)
    - For each mouse support, there should be an explicit test for its functionality
        - A simple test would `userEvent.click`
    - For each label support, there should be an explicit test for its functionality
        - A simple test would `screen.getByLabelText`

## Integration

Integration tests use [Cypress](https://www.cypress.io/), and serve to give us confidence that our design system site is working properly and is not broken. It's **_not_** intended to test the individual components.

Run these in the browser with by first starting the development server:

```
yarn start
```

And then in another tab, either:

```
# To run in the browser
yarn cypress:open

# To run headlessly
yarn cypress:run
```

## Linting

Linting rules are used to standardize patterns in the codebase. Run these with:

```
yarn lint
```
