# Documentation in MDS

Document, document, document!

1. [Purpose](#purpose)
1. [Accessibility](#accessibility)
1. [Examples](#examples)
1. [Template](#template)

## Purpose

A short blurb on why the component exists.
This helps define the desired responsibilities of the component.

## Accessibility

In order to maintain a11y as a first-class design principle,
each component requires an a11y section.
The section describes the keyboard support, label support, and test queries.
The keyboard support showcases the possible user interactions with the keyboard.
The label support showcases the accessible names for interactive elements.
The test queries showcases the available query methods for ease-of-testing.

## Examples

The code examples should be shareable.

1. Always import the components used in the example
1. Document common usages of a component
1. Document useful complex usages of a component
1. Document the ref API with an example

## Template

```md
## Purpose

## Keyboard Support

| Key | Focused element | Function |
| --- | --------------- | -------- |
|     |                 |          |

## Label Support

| Focused element | Screen reader |
| --------------- | ------------- |
|                 |               |

## Test queries

| Query | Element |
| ----- | ------- |
|       |         |

## Props API Examples

## Ref API Example
```
