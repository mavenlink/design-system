Default usage:
```js
import Select from '@mavenlink/design-system/src/components/select/select.jsx';

<Select
  id={uuid.v4()}
  label="Default Example 1"
  name="Example 1"
  placeholder="This is a single choice field"
  listOptionRefs={[]}
/>
```

Default usage with complex value objects:
```js
import Select from '@mavenlink/design-system/src/components/select/select.jsx';
import ListOption from '../list-option/list-option.jsx';

const listOptions = [{id: 0, label: 'foo'}];
const listOptionRefs = listOptions.map(() => React.createRef());
const listOptionElements = listOptions.map((option, index) => {
  return(<ListOption key={option.id} ref={listOptionRefs[index]} value={option}>{option.label}</ListOption>);
});

<Select
  displayValueEvaluator={value => value.label}
  id={uuid.v4()}
  label="Value Object Example 1"
  name="Example 2"
  placeholder="This is a single choice field"
  listOptionRefs={listOptionRefs}
  value={listOptions[0]}
>
  {listOptionElements}
</Select>
```

## Ref API Example

```jsx
import Select from '@mavenlink/design-system/src/components/select/select.jsx';
import ListOption from '../list-option/list-option.jsx';
import RefExample from '@mavenlink/design-system/src/components/__site__/ref-example/ref-example.jsx';

const ref = React.createRef();
const listOptions = ['test', 'this', 'select'];
const listOptionRefs = listOptions.map(() => React.createRef());
const listOptionElements = listOptions.map((optionName, index) => {
  return(<ListOption key={optionName} ref={listOptionRefs[index]} value={optionName}>{optionName}</ListOption>);
});

<RefExample ref={ref}>
  {({ onChange }) => (
    <Select
      id="select-ref-example"
      label="Ref Example"
      name="ref-example"
      onChange={onChange}
      placeholder="This is a single choice field"
      ref={ref}
      listOptionRefs={listOptionRefs}
    >
      {listOptionElements}
    </Select>
  )}
</RefExample>
```
