The `Percentage` component allows for representing a percentage in the range of [0, 100] with up to 2 significant digits.

```js
<Percentage id="ex-1" label="Default example" />
```

```js
<Percentage id="ex-2" label="Required example" required />
```

```js
<Percentage id="ex-3" label="Server error example" validationMessage="The server returned an error." />
```

```js
<Percentage id="ex-4" label="Read-only / disabled example" readOnly />
```

## Ref API Example

```jsx
import Percentage from '@mavenlink/design-system/src/components/percentage/percentage.jsx';
import RefExample from '@mavenlink/design-system/src/components/ref-example/ref-example.jsx';

const ref = React.createRef();

<RefExample ref={ref}>
  {({ onChange }) => (
    <Percentage 
      id="ex-5" 
      label="Ref example Percentage"
      name="percentage-ref"
      onChange={onChange}
      ref={ref}
    />
  )}
</RefExample>
```