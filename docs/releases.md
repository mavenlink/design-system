# Releases

**_For maintainers_**, how to release a new version of @mavenlink/design-system:

1. __Bump the version number__

   Update the version number in the package.json. For example, see [this example commit](https://github.com/mavenlink/design-system/commit/783bc20a82503f2332c093b702296527b15a4db0). Alse note that we follow [semver](https://semver.org/) when selecting version numbers.

2. __Update the changelog__

   As components are added and modified, updates should be added to the "unreleased" section of the changelog. Now we should move all items from the "unreleased" section to a new section in the changelog with the current date and the new version number). For example, see [this example commit](https://github.com/mavenlink/design-system/commit/783bc20a82503f2332c093b702296527b15a4db0).

3. __Push up changes__

   Push up the changes from the previous two steps.

4. __Tag a new release__

   [Draft and publish a new release in Github](https://help.github.com/articles/creating-releases/). Copy over the items from the changelog corresponding to the version into the release's description.

5. __Publish to NPM__

   If not already logged in to npm from the command line, first run `npm login`. To publish, run `npm publish`.
