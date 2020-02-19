# Releases

**_For maintainers_**, how to release a new version of @mavenlink/design-system:

1. __Create a Release Branch__

   Create a new branch from master to contain your release changes, which should only include changelog and version change.

2. __Update the changelog__

   As components are added and modified, updates should be added to the "unreleased" section of the changelog. Now we should move all items from the "unreleased" section to a new section in the changelog with the current date and the new version number). For example, see [this example commit](https://github.com/mavenlink/design-system/commit/783bc20a82503f2332c093b702296527b15a4db0). Commit this change.

3. __Publish to NPM__

   Use `yarn publish`, which will ask for your NPM credentials and a new version.

4. __Create a Release PR__

   Create a new PR in github with the `release` tag targeted at `master`, and merge with success/approval as normal.

5. __Tag a new release__

   [Draft and publish a new release in Github](https://help.github.com/articles/creating-releases/). Copy over the items from the changelog corresponding to the version into the release's description.
