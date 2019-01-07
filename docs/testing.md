# Testing Philosophy

There are 2 different kinds of testing in this repo: unit and integration.

## Unit

Unit tests use [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/) to test the individual components. They serve to give us confidence that the components exported by our package are working as intended, and are a great way to test all the nitty-gritty logic in our components.

Run these with:

```
yarn test
```

## Integration

Integration tests use [Cypress](https://www.cypress.io/), and serve to give us confidence that our design system site is working properly and is not broken. It's **_not_** intended to test the individual components.

Run these in the browser with:

```
yarn cypress:open
```

Or headlessly with:

```
yarn cypress:run
```
