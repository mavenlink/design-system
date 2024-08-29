This component is a purely client-side select widget. 
Given a list of options, it allows a user to select a single option as the select value.
It allows customizing the displayed value in the textbox and each individual option in the listbox.
For examples on how to fetch data from the server, see the Autocompleter documentation.

Default usage:
```js
import Select from '../../components/select/select.jsx';

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
import Select from '../../components/select/select.jsx';
import ListOption from '../list-option/list-option.jsx';

const listOptions = [{id: 0, label: 'foo'}];
const listOptionRefs = listOptions.map(() => React.createRef());

<Select
  displayValueEvaluator={value => value.label}
  id={uuid.v4()}
  label="Value Object Example 1"
  name="Example 2"
  placeholder="This is a single choice field"
  listOptionRefs={listOptionRefs}
  value={listOptions[0]}
>
  {({ onSelect }) => listOptions.map((option, index) => (
    <ListOption key={option.id} onSelect={onSelect} ref={listOptionRefs[index]} value={option}>
      {option.label}
    </ListOption>
  ))}
</Select>
```

## Ref API Example

```jsx
import Select from '../../components/select/select.jsx';
import ListOption from '../list-option/list-option.jsx';
import RefExample from '../../components/__site__/ref-example/ref-example.jsx';

const ref = React.createRef();
const listOptions = ['test', 'this', 'select', 'foo', 'bar', 'baz', 'This is a much longer test value that is super long because sometimes people like to put long values in there, you know? It can make sense sometimes. Maybe this is not the best way to convey longform data, but who I am I to say? Power to the people and all that.', '1', '2', '3', '4', '5', '6', '7'];
const listOptionRefs = listOptions.map(() => React.createRef());

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
      displayComponent={(model) => { return (<h1>{model}</h1>) }}
    >
      {({ onSelect }) => listOptions.map((optionName, index) => (
        <ListOption key={optionName} onSelect={onSelect} ref={listOptionRefs[index]} value={optionName}>
          {optionName}
        </ListOption>
      ))}
    </Select>
  )}
</RefExample>
```
