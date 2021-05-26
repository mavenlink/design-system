See [design specifications.](https://www.notion.so/MultiSelect-9da6ee3245d946699106231cf161f783)

`MultiSelect` allows for the selection of multiple values in an accessible, searchable interface. It also provides flexibility in how you render selected options and options in the dropdown, but the default is MDS compatible and assured.

## Basic Usage
```jsx
import MultiSelect from '@mavenlink/design-system/src/components/multi-select/multi-select.jsx';

<MultiSelect
  id="example-1"
  label="Basic MultiSelect"
  name="example"
  options={['Option 1', 'Option 2', 'Option 3']}
  placeholder="Select some options"
/>
```

## Required
```jsx
import MultiSelect from '@mavenlink/design-system/src/components/multi-select/multi-select.jsx';

<MultiSelect
  id="example-2"
  label="Required MultiSelect"
  name="example"
  options={['Option 1', 'Option 2', 'Option 3']}
  required
/>
```

## Readonly
```jsx
import MultiSelect from '@mavenlink/design-system/src/components/multi-select/multi-select.jsx';

<MultiSelect
  id="example-3"
  label="Readonly MultiSelect"
  name="example"
  options={['Option 1', 'Option 2', 'Option 3']}
  value={['Option 1', 'Option 2']}
  readOnly
/>
```

## Object Options
```jsx
import MultiSelect from '@mavenlink/design-system/src/components/multi-select/multi-select.jsx';

const options = [
  {
    id: '0',
    text: 'Hello'
  },
  {
    id: '1',
    text: 'World!'
  },
];

<MultiSelect
  id="example-4"
  label="MultiSelect with Object Options"
  name="example"
  options={options}
  optionIDGetter={option => option.id}
  optionLabelGetter={option => option.text}
/>
```

## Loader
```jsx
import MultiSelect from '@mavenlink/design-system/src/components/multi-select/multi-select.jsx';

<MultiSelect
  id="example-5"
  label="Loader MultiSelect"
  name="example"
  options={['Option 1', 'Option 2', 'Option 3']}
  value={['Option 1', 'Option 2']}
  showLoader
/>
```

## Custom Listbox and TagList Children
With the `listboxChildren` and `tagChildren` props, you can provide your own function for rendering both the dropdown options and the selected values. While the `Listbox` has very few requirements for its children, `TagList` has a few more necessary from the `ref` API of its children. Either use `Tag` compositionally as we do here, or implement the same `ref` API in your own component.

```jsx
import MultiSelect from '@mavenlink/design-system/src/components/multi-select/multi-select.jsx';
import Tag from '@mavenlink/design-system/src/components/tag/tag.jsx';

const ListboxChild = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} onClick={() => { props.onOptionSelect({ target: ref }) }}>{props.option}</div>
  )
});

const TagChild = React.forwardRef((props, ref) => {
  return (
    <div>
      <span>Some Custom Text</span>
      <Tag
        defaultActive={props.index === 0}
        id={props.val}
        key={props.val}
        onRemove={props.onOptionRemove}
        ref={ref}
      >
        {props.val}
      </Tag>
    </div>
  )
});

const listboxChildren = (visibleOptions, refs, onOptionSelect) => {
  return (
    <div>
      {visibleOptions.map((option, index) => (
        <ListboxChild key={option} option={option} onOptionSelect={onOptionSelect} ref={refs[index]} />
      ))}
    </div>
  )
}

const tagChildren = (values, refs, onOptionRemove) => {
  return (
    <React.Fragment>
      {values.map((val, index) => (
        <TagChild key={val} index={index} onOptionRemove={onOptionRemove} val={val} ref={refs[index]} />
      ))}
    </React.Fragment>
  )
}

<MultiSelect
  id="example-6"
  label="MultiSelect with Custom Children"
  name="example"
  options={['Option 1', 'Option 2', 'Option 3']}
  listboxChildren={listboxChildren}
  tagChildren={tagChildren}
/>
```

## Ref API Example

```jsx
import MultiSelect from '@mavenlink/design-system/src/components/multi-select/multi-select.jsx';
import RefExample from '@mavenlink/design-system/src/components/ref-example/ref-example.jsx';

const ref = React.createRef();

<RefExample ref={ref}>
  {({ onChange }) => (
    <MultiSelect
      options={['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6', 'Test 7', 'Test 8', 'Test 9', 'Test 10', 'Test 11', 'Test 12', 'Test 13', 'Test 14', 'Test 15', 'Test 16', 'Test 17', 'Test 18', 'Test 19', 'Test 20', 'Test 79163871268371687326137812763818894792384723978',]}
      id="example-7"
      label="Ref example MultiSelect"
      name="example"
      onChange={onChange}
      ref={ref}
      value={['Test 1', 'Test 2',]}
    />
  )}
</RefExample>
```
