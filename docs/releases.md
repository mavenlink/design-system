# Releases

## Prerequisites

- Create an NPM account
- Enable 2FA on the NPM account for **authorization** and **publishing**
- Reach out to @juanca for access to the Mavenlink org

## How-to

1. Create a release branch (format: `release-x.y.z`) from latest master.

1. Update the changelog:

   move all items from the "unreleased" section to a new section titled with the new version number;
   commit this change.

3. Publish to NPM with `yarn publish`

4. Create a PR

5. After merging the PR, tag a new release

   [Draft and publish a new release in Github](https://help.github.com/articles/creating-releases/).
     - Copy over the changelog section title as the release title
     - Copy over the changelog section items as the release body
