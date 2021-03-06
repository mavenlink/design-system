The `Textarea` component should be used when a multi-line string input is needed. For now, it does not support vertical resizing.

```js
<Textarea id={uuid.v4()} label="Default example" />
```

```js
<Textarea id={uuid.v4()} label="Required example" required />
```

```js
<Textarea id={uuid.v4()} label="Server error example" validationMessage="The server returned an error." />
```

```js
<Textarea id={uuid.v4()} label="Read-only / disabled example" readOnly />
```

```js
<Textarea id={uuid.v4()} label="Placeholder example" placeholder={'This is a placeholder\nWith multiple lines of text'} />
```

```js
function TestComponent() {
  const ref = React.useRef();
  const [componentValue, setComponentValue] = React.useState('');
  const [remoteValue, setRemoteValue] = React.useState('Waiting for example text to load');

  function changeHandler() {
    setComponentValue(ref.current.value);
  }

  React.useEffect(() => {
    async function fetchTextAreaValue() {
      await fetch('/api/v1/textarea_test')
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setRemoteValue(json.value);
        });
    }

    fetchTextAreaValue();
  }, []);

  return (
    <React.Fragment>
      <Textarea onChange={changeHandler} ref={ref} id={uuid.v4()} label="Complete usage example (with async loaded value)" value={remoteValue} />
      <div>Dirty: {ref.current ? ref.current.dirty.toString() : ''}</div>
      <div>Value: {componentValue.replaceAll ? componentValue.replaceAll('\n', '\\n') : ''}</div>
    </React.Fragment>
  )
}

<TestComponent />
```
