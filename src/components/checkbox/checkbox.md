For design and accessibility functionality, see [Form Controls > Checkbox documentation](https://www.notion.so/Checkbox-2c117a30d5c14e50a171a263e04b4fd9).

## Props API Examples

Basic usage.

```jsx
import Checkbox from '../../components/checkbox/checkbox.jsx';

<React.Fragment>
  <Checkbox
    id={uuid.v4()}
    label="Example checkbox!"
    name="example"
    checked={true}
  />
  <Checkbox
    id={uuid.v4()}
    label="Readonly checked box"
    name="example"
    checked={true}
    readOnly
  />
  <Checkbox
    id={uuid.v4()}
    label="Readonly unchecked box"
    name="example"
    readOnly
  />
</React.Fragment>
```

Required example. The validation message only shows when the checkbox is dirty.

```jsx
import Checkbox from '../../components/checkbox/checkbox.jsx';

<Checkbox
  id={uuid.v4()}
  label="Agree to Terms and Conditions"
  name="example"
  required
/>
```

With a custom validation message. Messages are cleared on blur.

```jsx
import Checkbox from '../../components/checkbox/checkbox.jsx';

<Checkbox
  id={uuid.v4()}
  label="With a Custom Validation Error"
  name="example"
  validationMessage="There is something wrong."
/>
```

Inline

```jsx
import Checkbox from '../../components/checkbox/checkbox.jsx';

<Checkbox id={uuid.v4()} label="Inline Checkbox" name="example" inline />;
```

Inline Required example. The validation message only shows when the checkbox is dirty.

```jsx
import Checkbox from '../../components/checkbox/checkbox.jsx';

<Checkbox
  id={uuid.v4()}
  label="Agree to Terms and Conditions"
  name="example"
  required
  inline
/>
```

Inline with validation message

```jsx
import Checkbox from '../../components/checkbox/checkbox.jsx';

<Checkbox
  id={uuid.v4()}
  label="Inline Checkbox"
  name="example"
  inline
  validationMessage="There is something wrong."
/>
```

Inline with tooltip

```jsx
import Checkbox from '../../components/checkbox/checkbox.jsx';

<Checkbox
  id={uuid.v4()}
  label="Inline Checkbox"
  name="example"
  inline
  tooltip="Can I offer you a nice egg in this trying time?"
/>
```

## Ref API Example

```jsx
import Checkbox from '../../components/checkbox/checkbox.jsx';
import RefExample from '../../components/__site__/ref-example/ref-example.jsx';

const ref = React.createRef();

<RefExample ref={ref}>
  {({ onChange }) => (
    <Checkbox
      id={uuid.v4()}
      label="Example checkbox field"
      name="example"
      onChange={onChange}
      ref={ref}
    />
  )}
</RefExample>
```
