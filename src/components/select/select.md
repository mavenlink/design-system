Default usage:
```js
import Select from '@mavenlink/design-system/src/components/select/select.jsx';

<Select
  id="default-example-1"
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
  id="value-object-example-1"
  label="Value Object Example 1"
  name="Example 2"
  placeholder="This is a single choice field"
  listOptionRefs={listOptionRefs}
  value={listOptions[0]}
>
  {listOptionElements}
</Select>
```

Complex usage with parent component:
```js
import Select from '@mavenlink/design-system/src/components/select/select.jsx';
import ListOption from '../list-option/list-option.jsx';

const listOptions = ['test', 'this', 'select'];
const listOptionRefs = listOptions.map(() => React.createRef());
const listOptionElements = listOptions.map((optionName, index) => {
  return(<ListOption key={optionName} ref={listOptionRefs[index]} value={optionName}>{optionName}</ListOption>);
});

function TestComponent() {
  return (
    <Select
      id="complex-example-1"
      label="Complex Example 1"
      name="Example 3"
      placeholder="This is a single choice field"
      listOptionRefs={listOptionRefs}
    >
      {listOptionElements}
    </Select>
  )
}

<TestComponent />
```
