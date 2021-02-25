The `CustomFieldInputSingleChoice` component represents the UI for a custom field of type single choice from Mavenlink's API.

### Default examples

```js
<CustomFieldInputSingleChoice
  id="default-example-1"
  customFieldID={0}
  label="Default Example 1"
  name="default-1"
  placeholder="This is a single choice field"
/>
```

```js
<CustomFieldInputSingleChoice
  id="default-example-2"
  customFieldID={1}
  label="Default Example 2"
  name="default-2"
  value={[2]}
/>
```

### Read-only examples

```js
<CustomFieldInputSingleChoice
  id="read-only-example-1"
  customFieldID={0}
  label="Read Only Example 1"
  name="read-only-1"
  readOnly
/>
```

```js
<CustomFieldInputSingleChoice
  id="read-only-example-2"
  customFieldID={0}
  label="Read Only Example 2"
  name="read-only-2"
  readOnly
  value={[0]}
/>
```

### Editable examples

```js
function TestComponent() {
  const [value, setValue] = React.useState([]);
  const inputRef = React.useRef();
  const dirty = inputRef.current ? inputRef.current.dirty : false;

  function onChangeHandler(event) {
    setValue(event.target.value);
  }

  return(
    <div>
      <CustomFieldInputSingleChoice
        id="editable-example-1"
        customFieldID={0}
        label="Editable Example 1"
        name="editable-1"
        onChange={onChangeHandler}
        ref={inputRef}
        value={[0]}
      />
      <div>Value: <span>{JSON.stringify(value)}</span></div>
      <div>Dirty: <span>{dirty ? 'true' : 'false'}</span></div>
    </div>
  )
}

<TestComponent />
```

```js
<CustomFieldInputSingleChoice
  id="editable-example-2"
  customFieldID={0}
  label="Editable Example 2"
  name="editable-2"
  value={[0]}
/>
```

##### Error:
```jsx
<CustomFieldInputSingleChoice
  id="error-example-1"
  customFieldID={0}
  label="Error Example 1"
  name="error-1"
  value={[0]}
  errorText="Error help."
/>
```
