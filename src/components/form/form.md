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
````

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
