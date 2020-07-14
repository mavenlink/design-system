The `CustomFieldInputSingleChoice` component represents the UI for a custom field of type single choice from Mavenlink's API.

### Default examples

```js
<CustomFieldInputSingleChoice
  id="default-example-1"
  label="Default Example 1"
  placeholder="This is a single choice field"
/>
```

```js
<CustomFieldInputSingleChoice
  id="default-example-2"
  label="Default Example 1"
  value={{ id: '1', label: 'I am a value' }}
/>
```

### Read-only examples

```js
<CustomFieldInputSingleChoice
  id="read-only-example-1"
  label="Read Only Example 1"
  readOnly
/>
```

```js
<CustomFieldInputSingleChoice
  id="read-only-example-2"
  label="Read Only Example 2"
  readOnly
  value={{ id: '2', label: 'I am a value' }}
/>
```

### Editable examples

```js
const choices = ['yes', 'no', 'maybe', "I don't know", 'Can you repeat the question?'].map(i => ({ id: i, label: i }));

<CustomFieldInputSingleChoice
  choices={choices}
  id="editable-example-1"
  label="Editable Example 1"
  value={choices[3]}
/>
```

```js
const choices = ['hi', 'hi', 'hi'].map((i, index) => ({ id: `${index}`, label: i }));

<CustomFieldInputSingleChoice
  id="editable-example-2"
  label="Editable Example 2"
  choices={choices}
/>
```
