```js
<Number id="ex-1" label="Default example" />
```

```js
<Number id="ex-2" label="Required example" required />
```

```js
<Number id="ex-3" label="Server error example" validationMessage="The server returned an error." />
```

```js
<Number id="ex-4" label="Read-only / disabled example" readOnly />
```

```js
import Number from '@mavenlink/design-system/src/components/number/number.jsx';

function TestComponent() {
  const ref = React.useRef();
  const [current, setCurrent] = React.useState({});

  function onChange() {
    setCurrent(ref.current);
  }
  
  return(
    <div onChange={onChange}>
      <Number id="test-id-1" label="Some number" ref={ref} />
      <ul>
        {Object.keys(current).map(k => <li>{k}: {JSON.stringify(current[k])}</li>)}
      </ul>
    </div>
  );
}

<TestComponent />
```
