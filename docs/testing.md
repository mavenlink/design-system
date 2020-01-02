# Testing Philosophy

There are 2 different kinds of testing in this repo: unit and integration.

## Unit

Unit tests use [Jest](https://jestjs.io/) and [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro) to test the individual components. They serve to give us confidence that the components exported by our package are working as intended, and are a great way to test all the nitty-gritty logic in our components.

Run these with:

```
yarn test
```

### Patterns

1. [Jest Snapshots](https://jestjs.io/docs/en/snapshot-testing) test the default DOM structure and DOM attributes of a component
2. Component API tests
    - [Jest matchers](https://jestjs.io/docs/en/expect) are the default set of test assertions
    - [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom#table-of-contents) are extra test assertions for DOM elements and accessibility
    - [`@testing-library/react` queries](https://testing-library.com/docs/guide-which-query) are DOM tree traversal methods with accessibility prioritized
    - [`@testing-library/dom` events](https://github.com/testing-library/dom-testing-library/blob/master/src/events.js) are DOM events to approximate user interactions on components

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

Linter rules are used to standardize patterns in the codebase. Run these with:

```
yarn lint
```
