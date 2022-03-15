# Contributing

Thank you for contributing to the Mavenlink Design System! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features

## Code of Conduct
Mavenlink has adopted a Code of Conduct that we expect project participants to adhere to. [Please read the full text](./code_of_conduct.md) so that you can understand what actions will and will not be tolerated.

## Submitting Changes
Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `master`.
2. Make your changes. Be sure to look at [our component design principles](./principles.md)!
2. Add or update tests if necessary. Be sure to look at [our testing philosophy](./testing.md)!
3. If updating an exported component, add an entry in the "unreleased" section of the changelog. It should follow the format similar to other entries.
4. Ensure the test suite passes by running `yarn test`
5. Ensure the linter passes by running `yarn lint`
6. Make a pull request
7. Verify the Github Page is working appropriate. The URL is of the form `https://mavenlink.github.io/design-system/$BRANCH` where `$BRANCH` is the branch name.

## Running the app locally

```yarn start```

and visit localhost:6060 in your browser.

## Reporting Bugs
We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/mavenlink/design-system/issues/new). Please provide details, background, and sample code if possible.
