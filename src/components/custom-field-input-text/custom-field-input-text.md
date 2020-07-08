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
##### Ref usage:

All CustomFieldInput* use `forwardRef` and `useImperativeHandle` to provide an API similar to the DOM native for determining their value.
Below is an example of this usage:

```jsx
const React = require('react');

function TestComponent() {
  const inputRef = React.useRef(null);
  const [value, setValue] = React.useState('');

  const onChange = () => {
    setValue(inputRef.current.value());
  }

  return (
    <div>
      <CustomFieldInputText
        id="test-id-4"
        label="Example 4"
        onChange={onChange}
        ref={inputRef}
      />
      <span>Value is: {value}</span>
    </div>
  )
}

<TestComponent />
```
