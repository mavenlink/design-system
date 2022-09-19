The `Percentage` component allows for representing a percentage in the range of [0, 100] with up to 2 significant digits.

```js
<Percentage id={uuid.v4()} label="Default example" />
```

```js
<Percentage id={uuid.v4()} label="Required example" required />
```

```js
<Percentage id={uuid.v4()} label="Server error example" validationMessage="The server returned an error." />
```

```js
<Percentage id={uuid.v4()} label="Read-only / disabled example" readOnly />
```

## Ref API Example

```jsx
import Percentage from '../../components/percentage/percentage.jsx';
import RefExample from '../../components/__site__/ref-example/ref-example.jsx';

const ref = React.createRef();

<RefExample ref={ref}>
  {({ onChange }) => (
    <Percentage
      id={uuid.v4()}
      label="Ref example Percentage"
      name="percentage-ref"
      onChange={onChange}
      ref={ref}
    />
  )}
</RefExample>
```
