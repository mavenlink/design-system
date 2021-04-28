For design and accessibility functionality, see [Form Controls > Checkbox documentation](dead-link-talk-to-juanca).

## Props API Examples

Basic usage.
```jsx
import Checkbox from '@mavenlink/design-system/src/components/checkbox/checkbox.jsx';

<Checkbox id="example-1" label="Example checkbox!" name="example" checked={true} />
```

Required example. The validation message only shows when the checkbox is dirty.
```jsx
import Checkbox from '@mavenlink/design-system/src/components/checkbox/checkbox.jsx';

<Checkbox id="example-2" label="Agree to Terms and Conditions" name="example" required />
```

With a custom validation message. Messages are cleared on blur and change.
```jsx
import Checkbox from '@mavenlink/design-system/src/components/checkbox/checkbox.jsx';

<Checkbox id="example-3" label="With a Custom Validation Error" name="example" validationMessage="There is something wrong." />
```

## Ref API Example

```jsx
import Checkbox from '@mavenlink/design-system/src/components/checkbox/checkbox.jsx';
import RefExample from '@mavenlink/design-system/src/components/ref-example/ref-example.jsx';

const ref = React.createRef();

<RefExample ref={ref}>
  {({ onChange }) => (
    <Checkbox
      id="example-5"
      label="Example checkbox field"
      name="example"
      onChange={onChange}
      ref={ref}
    />
  )}
</RefExample>
```
