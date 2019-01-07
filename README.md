# Mavenlink Design System &middot; [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mavenlink/design-system/blob/master/LICENSE) [![Build Status](https://travis-ci.org/mavenlink/design-system.svg?branch=master)](https://travis-ci.org/mavenlink/design-system) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/mavenlink/design-system/blob/master/CONTRIBUTING.md)

A set of [React](https://reactjs.org/) components created by, and for, [Mavenlink](https://www.mavenlink.com/). See all the available components at https://mavenlink.github.io/design-system.

## Installation

- Install with NPM or Yarn

  ```
  npm install --save @mavenlink/design-system

  # or

  yarn add @mavenlink/design-system
  ```

- Setup [CSS modules](https://github.com/css-modules/css-modules). One way of doing that is with [css-loader for Webpack](https://github.com/webpack-contrib/css-loader#modules)

  ```js
  // Webpack configuration
  module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    },
  };
  ```

- Use in your project

  ```jsx
  import { Input } from '@mavenlink/design-system';

  function App() {
    return <Input id="hello!" />;
  }
  ```

## Contributing

We encourage you to contribute to the Mavenlink Design System! Please check out the [Contributing documentation](./docs/contributing.md) for guidelines about how to proceed.

Everyone interacting this codebase, issue trackers, chat rooms, and mailing lists is expected to follow the [code of conduct](./docs/code_of_conduct.md).

## Maintainers

- When making architectural decisions, [review the decision log](./docs/decisions.md) first. Update as needed.
- When publishing releases, please follow the steps outlined [in the "releases" documentation](./docs/releases.md).
