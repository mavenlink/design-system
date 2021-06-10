The Custom Field Input Text component represents the UI for a custom field of type text from Mavenlink's API.
It is also used as the basis for the Custom Field Input Number components (and probably others).
It has no underlying validations besides developer intent (see Error example for more information).

### Examples

```js
import CustomFieldInputText from '@mavenlink/design-system/src/components/custom-field-input-text/custom-field-input-text.jsx';

<CustomFieldInputText id={uuid.v4()} label="Default example" />
```

```js
import CustomFieldInputText from '@mavenlink/design-system/src/components/custom-field-input-text/custom-field-input-text.jsx';

<CustomFieldInputText id={uuid.v4()} label="Required example" required />
```

```js
import CustomFieldInputText from '@mavenlink/design-system/src/components/custom-field-input-text/custom-field-input-text.jsx';

<CustomFieldInputText id={uuid.v4()} label="Server error example" errorText="The server returned an error." />
```

```js
import CustomFieldInputText from '@mavenlink/design-system/src/components/custom-field-input-text/custom-field-input-text.jsx';

<CustomFieldInputText id={uuid.v4()} label="Read-only / disabled example" readOnly />
```

### Ref usage:

The component uses `forwardRef` and `useImperativeHandle` to provide an API similar to the DOM native for determining their value.
Below is an example of this usage:

```jsx
import CustomFieldInputText from '@mavenlink/design-system/src/components/custom-field-input-text/custom-field-input-text.jsx';

function TestComponent() {
  const ref = React.useRef();
  const [current, setCurrent] = React.useState({});

  const onChange = () => {
    setCurrent(ref.current);
  }

  return (
    <div onChange={onChange}>
      <CustomFieldInputText
        id={uuid.v4()}
        label="Example 4"
        ref={ref}
      />
      <ul>
        {Object.keys(current).map(key => (
          <li>{key}: {JSON.stringify(current[key])}</li>
        ))}
      </ul>
    </div>
  )
}

<TestComponent />
```
