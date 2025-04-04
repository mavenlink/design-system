## Purpose

We want to provide an accessible, fully integrated input component that captures a single numeric value.

## Keyboard Support

| Key | Focused element | Function |
| --- | --------------- | -------- |
| Up  |  the input      | add one step |
| Down  |  the input    | subtract one step |

## Label Support

| Focused element | Screen reader |
| --------------- | ------------- |
|  the input      | the label     |
|  the error icon | the error message |

## Props API Examples

```js
<Number id={uuid.v4()} label="Default example" />
```

```js
<Number id={uuid.v4()} label="Required example" required />
```

```js
<Number id={uuid.v4()} label="Server error example" validationMessage="The server returned an error." />
```

```js
<Number id={uuid.v4()} label="Read-only / disabled example" readOnly />
```

## Ref API Example

```js
import Number from '../../components/number/number.jsx';

function TestComponent() {
  const ref = React.useRef();
  const [current, setCurrent] = React.useState({});

  function onChange() {
    setCurrent(ref.current);
  }
  
  return(
    <div onChange={onChange}>
      <Number id={uuid.v4()} label="Some number" ref={ref} />
      <ul>
        {Object.keys(current).map(k => <li>{k}: {JSON.stringify(current[k])}</li>)}
      </ul>
    </div>
  );
}

<TestComponent />
```
