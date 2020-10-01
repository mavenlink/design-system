The `CustomFieldInputSingleChoice` component represents the UI for a custom field of type single choice from Mavenlink's API.

### Default examples

```js
<CustomFieldInputSingleChoice
  id="default-example-1"
  label="Default Example 1"
  name="default-1"
  placeholder="This is a single choice field"
/>
```

```js
<CustomFieldInputSingleChoice
  id="default-example-2"
  label="Default Example 2"
  name="default-2"
  value={{ id: 1, label: 'I am a value' }}
/>
```

### Read-only examples

```js
<CustomFieldInputSingleChoice
  id="read-only-example-1"
  label="Read Only Example 1"
  name="read-only-1"
  readOnly
/>
```

```js
<CustomFieldInputSingleChoice
  id="read-only-example-2"
  label="Read Only Example 2"
  name="read-only-2"
  readOnly
  value={{ id: 2, label: 'I am a value' }}
/>
```

### Editable examples

```js
const choices = ['yes', 'no', 'maybe', "I don't know", 'Can you repeat the question?'].map((i, index) => ({ id: index, label: i }));

function TestComponent() {
  const [value, setValue] = React.useState();
  const inputRef = React.useRef();

  function buttonOnClickHandler() {
    setValue(inputRef.current.value);
  }

  return(
    <div>
      <CustomFieldInputSingleChoice
        choices={choices}
        id="editable-example-1"
        label="Editable Example 1"
        name="editable-1"
        ref={inputRef}
        value={choices[3]}
      />
      <button onClick={buttonOnClickHandler}>Get Value</button>
      <div><span>{value}</span></div>
    </div>
  )
}

<TestComponent />
```

```js
const choices = ['hi', 'hi', 'hi'].map((i, index) => ({ id: index, label: i }));

<CustomFieldInputSingleChoice
  id="editable-example-2"
  label="Editable Example 2"
  name="editable-2"
  choices={choices}
  value={choices[0]}
/>
```

##### Error:
```jsx
const choices = ['yes', 'no', 'maybe', "I don't know", 'Can you repeat the question?'].map((i, index) => ({ id: index, label: i }));

<CustomFieldInputSingleChoice
  id="error-example-1"
  label="Error Example 1"
  name="error-1"
  choices={choices}
  value={choices[1]}
  errorText="Error help."
/>
```
