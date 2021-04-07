The `Textarea` component should be used when a multi-line string input is needed. For now, it does not support vertical resizing.

```js
<Textarea id="ex-1" label="Default example" />
```

```js
<Textarea id="ex-2" label="Required example" required />
```

```js
<Textarea id="ex-3" label="Server error example" validationMessage="The server returned an error." />
```

```js
<Textarea id="ex-4" label="Read-only / disabled example" readOnly />
```

```js
<Textarea id="ex-5" label="Placeholder example" placeholder={'This is a placeholder\nWith multiple lines of text'} />
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
      <Textarea onChange={changeHandler} ref={ref} id="ex-6" label="Complete usage example (with async loaded value)" value={remoteValue} />
      <div>Dirty: {ref.current ? ref.current.dirty.toString() : ''}</div>
      <div>Value: {componentValue.replaceAll('\n', '\\n')}</div>
    </React.Fragment>
  )
}

<TestComponent />
```
