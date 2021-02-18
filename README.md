# Mavenlink Design System &middot; [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mavenlink/design-system/blob/master/LICENSE) [![Build Status](https://circleci.com/gh/mavenlink/design-system.svg?style=svg)](https://circleci.com/gh/mavenlink/design-system) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/mavenlink/design-system/blob/master/CONTRIBUTING.md)

A set of [React](https://reactjs.org/) components created by, and for, [Mavenlink](https://www.mavenlink.com/). See all the available components at our [Github Page](https://mavenlink.github.io/design-system/master).

## Installation

- Install with NPM or Yarn

  ```bash
  npm install --save @mavenlink/design-system

  # or

  yarn add @mavenlink/design-system
  ```

- Setup [React JSX processing](https://reactjs.org/docs/jsx-in-depth.html). One way of doing that is with [`babel-loader` for Webpack](https://webpack.js.org/loaders/babel-loader/).
- Setup [CSS modules](https://github.com/css-modules/css-modules). One way of doing that is with [`style-loader` for Webpack](https://github.com/webpack-contrib/style-loader) and [`css-loader` for Webpack](https://github.com/webpack-contrib/css-loader).
- Setup [SVG processing](https://svgontheweb.com/#spriting). One way of doing that is with [`svg-sprite-loader` for Webpack](https://github.com/kisenka/svg-sprite-loader).

  ```js static
  // Webpack configuration
  const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

  module.exports = {
    module: {
      rules: [{
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
        }],
      }, {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true
          },
        }],
      }, {
        test: /\.svg$/,
        use: [{
          loader: 'svg-sprite-loader',
        }],
      }],
    },
    plugins: [
      new SpriteLoaderPlugin(),
    ],
  };
  ```

- Use in your project

  ```js
  import Input from '@mavenlink/design-system/src/components/input/input.jsx';

  function App() {
    return <Input id="hello!" />;
  }
  ```

### Style linter

We periodically update and upgrade styles. We have also created linters to help with those changes! To use, do the following:

 - Install [stylelint](https://stylelint.io/) into your project
 - In your stylelint configuration file (`.stylelintrc.json, .stylelintrc, stylelint.config.js`) include the following:

    ```js
    const path = require('path');

    module.exports = {
      // ... stylelint configuration ...
      plugins: [
        // ...
        path.resolve('@mavenlink/design-system/src/linters/colors.js'),
      ],
      // ...
      rules: [
         // ...
         'mds/colors': true,
      ],
    };
    ```
 - Run stylelint to see failures

## Documentation

- [Code of conduct](./docs/code_of_conduct.md)
- [Contributing](./docs/contributing.md)
- [Component Design Principles](./docs/principles.md)
- [Testing a Changes in Bigmaven Before Release](./docs/bigmaven-testing.md)
- [Making a New Release](./docs/releases.md)
- [Testing Philosophy](./docs/testing.md)
