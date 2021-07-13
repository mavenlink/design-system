# Testing MDS changes in Bigmaven before release

## Purpose

Before releasing a new version of MDS, we should ensure there are no breaking changes in bigmaven; either user behavior or to the test suite.

## How-to

1. Push MDS branch, `git push -u origin head`

1. Within Bigmaven, cut a new branch and set mds in package.json to reference the MDS branch, and then `yarn install`. Eg. `"@mavenlink/design-system": "mavenlink/design-system#my-branch",`

1. Push Bigmaven branch  `git push -u origin head`

1. Run the Bigmaven test suite and address any relevant QA

1. After the Bigmaven is QA'd and the test suite is green, you may follow the MDS steps to [release](./releases.md)

1. Once MDS has been released, update the release in Bigmaven, and then `yarn install`, eg. `"@mavenlink/design-system": "^0.XX.0",`

1. Once Bigmaven is LGTM, deploy!
