# Releases

## Prerequisites

- Create an NPM account
- Enable 2FA on the NPM account for **authorization** and **publishing**
- Reach out to @juanca for access to the Mavenlink org

## How-to

1. Create a release branch (format: `vX.Y.Z`) from latest master.

1. Update the changelog:

   make a new section titled `vX.Y.Z`;
   move all items from the "unreleased" section to it;
   stage these changes.

1. Publish to NPM with `yarn publish`. Note: this will create a commit and tag with the staged changelogs and semver change.

1. `git push --tags` to persist your new version tag to the remote.

1. Create a PR

1. After merging the PR, tag a new release

   [Draft and publish a new release in Github](https://help.github.com/articles/creating-releases/).
     - Copy over the changelog section title as the release title
     - Copy over the changelog section items as the release body
