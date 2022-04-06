The form component manages its own state for dirtiness and validity.
The form component allows a parent component to submit its data with a `onSubmit` callback.
The form component allows a parent component to listen to value changes with a `onChange` callback.

## Keyboard Support

| Key | Focused element | Function |
| --- | --------------- | -------- |
| Enter | Save button   | Submits the form |

## Label Support

| Focused element | Screen reader |
| --------------- | ------------- |
| Save button     | Save          |

## Examples

### Example with native inputs

```jsx
import Form from '@mavenlink/design-system/src/components/form/form.jsx';

const refs = [
  React.createRef(),
  React.createRef(),
];

<Form refs={refs} onSubmit={() => alert('Submitted the form!')}>
  {() => (
    <React.Fragment>
      <input defaultValue="Example for a persisted value" ref={refs[0]} />
      <input ref={refs[1]} />
    </React.Fragment>
  )}
</Form>
```

### Example with custom fields

```jsx
import Form from '@mavenlink/design-system/src/components/form/form.jsx';
import Currency from '@mavenlink/design-system/src/components/custom-field-input-currency/custom-field-input-currency.jsx';
import SingleChoice from '@mavenlink/design-system/src/components/custom-field-input-single-choice/custom-field-input-single-choice.jsx';
import MultiChoice from '@mavenlink/design-system/src/components/custom-field-input-multiple-choice/custom-field-input-multiple-choice.jsx';

const refs = [
  React.createRef(),
  React.createRef(),
  React.createRef(),
  React.createRef(),
  React.createRef(),
  React.createRef(),
];

function onSubmit(event) {
  const message = Object.keys(event.data).reduce((acc, fieldName) => {
    return `${acc}${fieldName}=${event.data[fieldName].value}; `;
  }, '');

  window.alert(message);
}

<Form refs={refs} onSubmit={onSubmit}>
  {({ onChange }) => (
    <React.Fragment>
      <Currency
        currencyCode="USD"
        id={uuid.v4()}
        label="Custom Field Currency"
        name="currency-name"
        ref={refs[2]}
        value={350}
      />
      <SingleChoice
        choices={[{ id: 1, label: 'Choice 1' }, { id: 2, label: 'Choice 2' }]}
        customFieldID="0"
        id={uuid.v4()}
        label="Custom Field Single Choice"
        name="single-choice-name"
        onChange={onChange}
        ref={refs[4]}
      />
      <MultiChoice
        choices={[{ id: 1, label: 'Choice 1' }, { id: 2, label: 'Choice 2' }, { id: 3, label: 'Choice 3' }]}
        customFieldID="0"
        id={uuid.v4()}
        label="Custom Field Multiple Choice"
        name="multiple-choice-name"
        onChange={onChange}
        ref={refs[5]}
      />
    </React.Fragment>
  )}
</Form>
```

### Example with autoSave

The `autoSave` prop determines the frequency of calling `onSubmit`.
By default, the `onSubmit` callback only gets invoked when the form is submitted.
However, setting `autoSave` will invoke the callback when changes are detected.

Note: `autoSave` debounces its `props.onSubmit` callback to about 1/3 of a second.
This allows a user to keep typing without redundantly invoking the callback.
The debounced function is created on every `Form` render but it is memoized against the function reference.
If the parent component is create a new `props.onSubmit` callback on every render, it will negate the benefits of debounce.
In this case, the parent component _must_ memoize its own `onSubmit` callback against its appropriate dependencies.

```jsx
import Form from '@mavenlink/design-system/src/components/form/form.jsx';

const refs = [
  React.createRef(),
  React.createRef(),
];

function TestComponent() {
  const [count, setCount] = React.useState(0);
  const [data, setData] = React.useState({
    first: 'Example for a persisted value',
    second: '',
  });

  function onSubmit(event) {
    setCount(count + 1);
    setData({
      first: event.data.first.value,
      second: event.data.second.value,
    })
  }

  return (
    <React.Fragment>
      <span>Saved count: {count}</span>
      <Form autoSave refs={refs} onSubmit={onSubmit}>
        {() => (
          <React.Fragment>
            <input name="first" defaultValue={data.first} ref={refs[0]} />
            <input name="second" defaultValue={data.second} ref={refs[1]} />
          </React.Fragment>
        )}
      </Form>
    </React.Fragment>
  );
}

<TestComponent />
```
