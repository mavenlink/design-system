# Contributing

Thank you for contributing to the Mavenlink Design System! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features

## Code of Conduct
Mavenlink has adopted a Code of Conduct that we expect project participants to adhere to. [Please read the full text](./code_of_conduct.md) so that you can understand what actions will and will not be tolerated.

## Submitting Changes
Pull requests are the best way to propose changes to the codebase (we use [Github Flow](https://guides.github.com/introduction/flow/index.html)). We actively welcome your pull requests:

1. Fork the repo and create your branch from `master`.
2. Make your changes. Be sure to look at [our component design principles](./principles.md)!
2. Add or update tests if necessary. Be sure to look at [our testing philosophy](./testing.md)!
3. If updating an exported component, add an entry in the "unreleased" section of the changelog. See [this example commit](https://github.com/mavenlink/design-system/commit/e0913fdbcb94b12df797a2d398d0d60e6d755b3d#diff-4ac32a78649ca5bdd8e0ba38b7006a1e).
4. Ensure the test suite passes by running `yarn test`
5. Ensure the linter passes by running `yarn lint`
6. Make a pull request
7. Verify the Github Page is working appropriate. The URL is of the form `https://mavenlink.github.io/design-system/$BRANCH` where `$BRANCH` is the branch name.

## Running the app locally

```yarn start```

and visit localhost:6060 in your browser.

## MIT Software License
In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Reporting Bugs
We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/mavenlink/design-system/issues/new). Please provide details, background, and sample code if possible.

## Tips

- `yarn test -o` runs only changed test files

## Gotchas
### CircleCI fails to Compile Webpack Bundles
#### Description
If you're submitting a new component that isn't being used anywhere, Webpack may complain that you are submitting unused files and fail your circleci run ([example](https://app.circleci.com/pipelines/github/mavenlink/mavenlink/51485/workflows/8d766473-9002-4cc7-9313-16ccacc52e3c/jobs/1132802/steps)):
```
#!/bin/bash -eo pipefail 
yarn compile 
yarn run v1.17.3
 .
 .
 .
     ERROR in 
     UnusedFilesWebpackPlugin found some unused files:
     frontend/components/confirmation/confirmation.jsx
     frontend/components/confirmation/i18n-wrapper/confirmation.jsx
     frontend/components/confirmation/index.js
     frontend/components/confirmation/styles.css
     Child HtmlWebpackCompiler:
         Entrypoint HtmlWebpackPlugin_0 = __child-HtmlWebpackPlugin_0
     Child mini-css-extract-plugin node_modules/css-loader/index.js!node_modules/emoji-mart/css/emoji-mart.css:
        Entrypoint mini-css-extract-plugin = *

```

### Solution:
1. Add your component to [config/helpers/configure-unused-file-plugin.js](https://github.com/mavenlink/mavenlink/blob/master/config/helpers/configure-unused-file-plugin.js).
```js
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');

/**
 * Newly added Maven Design System components should go here.
 * - Include a TODO with a relevant pivotal story to track cleaning these up after they are used.
 */
const NEW_MAVEN_DESIGN_SYSTEM_COMPONENTS = [
  // TODO(https://www.pivotaltracker.com/story/show/173184997): cleanup after DeleteTaskModal uses Confirmation
  '!frontend/components/confirmation/**',
];

module.exports = function configureUnusedFilePlugin(opts = {}) {
  return new UnusedFilesWebpackPlugin({
    patterns: [
      .
      .
      .
      ...NEW_MAVEN_DESIGN_SYSTEM_COMPONENTS,
    ],
    ...opts,
  });
};
```
2. Create a task in your pivotal story to clean this whitelist up. It's your responsibility to clean it up.
3. Test that `yarn compile` no longer throws an error for your component's files.

    - Before (unhappy):

    ```zsh
    ~/workspace/mavenlink (mds-confirmation) $ yarn compile |& grep -e 'ERROR' -e 'frontend/components/confirmation'
    ERROR in
    frontend/components/confirmation/confirmation.jsx
    frontend/components/confirmation/i18n-wrapper/confirmation.jsx
    frontend/components/confirmation/index.js
    frontend/components/confirmation/README.md
    frontend/components/confirmation/styles.css
    ```

    - After (happy):

    ```zsh
    ~/workspace/mavenlink (mds-confirmation) $ yarn compile |& grep -e 'ERROR' -e 'frontend/components/confirmation'
    ERROR in # Note: there are other erros included in this result but they aren't related to us.
    ```

4. When your component is actually used, go back and clean it up!
