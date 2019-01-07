# Releases

**_For maintainers_**, how to release a new version of @mavenlink/design-system:

1. [Bump the version number](#bump-the-version-number)
2. [Update the changelog](#update-the-changelog)
3. [Push up changes](#push-up-changes)
4. [Tag a new release](#tag-a-new-release)
5. [Publish to NPM](#publish-to-npm)

## Bump the version number

Update the version number in the package.json. For example, see [this example commit](https://github.com/mavenlink/design-system/commit/783bc20a82503f2332c093b702296527b15a4db0). Alse note that we follow [semver](https://semver.org/) when selecting version numbers.

## Update the changelog

As components are added and modified, updates should be added to the "unreleased" section of the changelog. Now we should move all items from the "unreleased" section to a new section in the changelog with the current date and the new version number). For example, see [this example commit](https://github.com/mavenlink/design-system/commit/783bc20a82503f2332c093b702296527b15a4db0).

## Push up changes

Push up the changes from the previous two steps.

## Tag a new release

[Draft and publish a new release in Github](https://help.github.com/articles/creating-releases/). Copy over the items from the changelog corresponding to the version into the release's description.

## Publish to NPM

If not already logged in to npm from the command line, first run `npm login`. To publish, run `npm publish`.
