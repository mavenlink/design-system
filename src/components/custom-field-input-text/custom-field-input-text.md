The Custom Field Input Text component represents the UI for a custom field of type text from Mavenlink's API.
It is also used as the basis for the Custom Field Input Number components (and probably others).
It has no underlying validations besides developer intent (see Error example for more information).

##### Basic usage:

```jsx
<CustomFieldInputText
  id="test-id-1"
  label="Example 1"
/>
```
----
##### Disabled state:
```jsx
<CustomFieldInputText
  disabled
  id="test-id-2"
  label="Example 2"
  value="This value cannot be changed"
/>
```
----
##### Errored state:

The `error` property indicates the error state of the component.
However, the underlying `<input />` element will still be valid unless one of the two is true:

1. The `<input />` uses native input validation and is in fact invalid.
2. The `helpText` property is a non-empty string (which represents the validation message).

Violating the conditions above will result in an improper state of the component.

```jsx
<CustomFieldInputText
  error
  helpText="Custom error message here."
  id="test-id-3"
  label="Example 3"
/>
```
----
Inputs that derive from this component, or use cases that require context for the data, can specify `data` attributes to interact with the DOM native `dataset` property.

```jsx
<CustomFieldInputText
  id="test-id-4"
  label="Custom Data Attributes Example"
  dataAttributes={{'test-me': 'test'}}
/>
```
