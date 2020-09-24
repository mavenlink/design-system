```js
import ListOption from '../list-option/list-option.jsx';

const listOptions = ['test', 'this', 'select'];
const listOptionRefs = listOptions.map(() => React.createRef());
const listOptionElements = listOptions.map((optionName, index) => {
  return(<ListOption key={optionName} ref={listOptionRefs[index]} value={optionName}>{optionName}</ListOption>);
});

function TestComponent() {
  return (
    <Select
      id="default-example-1"
      label="Default Example 1"
      name="Example 1"
      placeholder="This is a single choice field"
      listOptionRefs={listOptionRefs}
    >
      {listOptionElements}
    </Select>
  )
}

<TestComponent />
```
