See [design specifications.](https://www.notion.so/MultiSelect-9da6ee3245d946699106231cf161f783)

`MultiSelect` allows for the selection of multiple values in an accessible, searchable interface. It also provides flexibility in how you render selected options and options in the dropdown, but the default is MDS compatible and assured.

## Basic Usage
```jsx
import MultiSelect from '../../components/multi-select/multi-select.jsx';

<MultiSelect
  id="example-1"
  label="Basic MultiSelect"
  name="example"
  options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }, { value: '3', label: 'Option 3' }]}
  placeholder="Select some options"
/>
```

## Required
```jsx
import MultiSelect from '../../components/multi-select/multi-select.jsx';

<MultiSelect
  id="example-2"
  label="Required MultiSelect"
  name="example"
  options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }, { value: '3', label: 'Option 3' }]}
  required
/>
```

## Readonly
```jsx
import MultiSelect from '../../components/multi-select/multi-select.jsx';

<MultiSelect
  id="example-3"
  label="Readonly MultiSelect"
  name="example"
  options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }, { value: '3', label: 'Option 3' }]}
  value={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]}
  readOnly
/>
```

## Loader
```jsx
import MultiSelect from '../../components/multi-select/multi-select.jsx';

<MultiSelect
  id="example-4"
  label="Loader MultiSelect"
  name="example"
  options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }, { value: '3', label: 'Option 3' }]}
  value={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]}
  showLoader
/>
```

## Custom Listbox and TagList Children
With the `listboxChildren` and `tagChildren` props, you can provide your own function for rendering both the dropdown options and the selected values. While the `Listbox` has very few requirements for its children, `TagList` has a few more necessary from the `ref` API of its children. Either use `Tag` compositionally as we do here, or implement the same `ref` API in your own component.

```jsx
import MultiSelect from '../../components/multi-select/multi-select.jsx';
import Tag from '../../components/tag/tag.jsx';

const ListboxChild = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} onClick={() => { props.onOptionSelect({ target: ref }) }}>{props.option.label}</div>
  )
});

const TagChild = React.forwardRef((props, ref) => {
  return (
    <div>
      <span>Some Custom Text</span>
      <Tag
        defaultActive={props.index === 0}
        id={props.option.value}
        key={props.option.value}
        onRemove={props.onOptionRemove}
        ref={ref}
      >
        {props.option.label}
      </Tag>
    </div>
  )
});

const listboxChildren = (visibleOptions, refs, onOptionSelect) => {
  return (
    <div>
      {visibleOptions.map((option, index) => (
        <ListboxChild key={option.value} option={option} onOptionSelect={onOptionSelect} ref={refs[index]} />
      ))}
    </div>
  )
}

const tagChildren = (selectedOptions, refs, onOptionRemove) => {
  return (
    <React.Fragment>
      {selectedOptions.map((option, index) => (
        <TagChild key={option.value} index={index} onOptionRemove={onOptionRemove} option={option} ref={refs[index]} />
      ))}
    </React.Fragment>
  )
}

<MultiSelect
  id="example-5"
  label="MultiSelect with Custom Children"
  name="example"
  options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }, { value: '3', label: 'Option 3' }]}
  listboxChildren={listboxChildren}
  tagChildren={tagChildren}
/>
```

## Ref API Example

```jsx
import MultiSelect from '../../components/multi-select/multi-select.jsx';
import RefExample from '../../components/__site__/ref-example/ref-example.jsx';

const ref = React.createRef();

<RefExample ref={ref}>
  {({ onChange }) => (
    <MultiSelect
      options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }, { value: '3', label: 'Option 3' }, { value: '4', label: 'Option with an egregiously long label that takes up just a ridiculous amount of visual space and you should probably never actually do this because it makes readers sad and is bad for accessibility in so many ways but here we are testing it anyway... I heard you like run-on sentences!' }]}
      id="example-6"
      label="Ref example MultiSelect"
      name="example"
      onChange={onChange}
      ref={ref}
      value={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]}
    />
  )}
</RefExample>
```
