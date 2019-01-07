# Component Design Principles

- **Made for 3rd-party developers**

  Keep in mind the customer of the components in this package: external, non-Mavenlink developers. The needs of Mavenlink developers should be taken into consideration, but only as much as the needs of 3rd-party developers. If something would only make sense for internal Mavenlink purposes, then it doesn't belong here.

- **Be conservative about what components are included**

  If we're not sure a component should be included here, we'll leave it out. This package does not need to meet all possible needs, and being more focused is better than having everything under the sun. Doing so will help us ensure that everything in here is of the highest quality, and as easy as possible to use.

- **Maximize flexibility and simplicity**

  The most important things a component in this package can be are **_simple_** and _**flexible**_. These things are even better than being featureful, or doing cool things. For an example of this, see our [Table component](https://github.com/mavenlink/design-system/blob/c41c3452e14ce6c9801b0db75cd7786f8f45d042/src/components/table/table.md).

  It's API is simple, and a little verbose. It's not doing anything fancy (like filtering or column sorting), and is really just supplying a really nice base for other people to build abstractions on top of.

  Cater to the simple/base cases, with an API that more complicated abstractions can be built on top of.
