Use `Listbox` to display an accessible list of options, where each option is a [`ListOption` component](#/Components/ListOption).

### Accessbility

This component's accessibility was built using the [WAI ARIA example for a listbox](https://www.w3.org/TR/wai-aria-practices-1.1/examples/listbox/listbox-scrollable.html).

#### Labels

The `Listbox` is a listbox role where each `ListOption` is an option role.
The `Listbox` has a label defined by its `labelledBy` prop API.
Otherwise, the user does not know the context of the list.

#### Interactions

| Key | State | Interaction |
| --- | --- | --- |
| Up Arrrow | --- | Moves the focus to the previous list option |
| Down Arrrow | --- | Moves the focus to the next list option |
| Home | --- | Moves the focus to the first list option |
| End | --- | Moves the focus to the last list option |

1. The focus does not wrap around the listbox
1. There is only 1 active list option in the page tab sequence
1. Clicking on a list option will focus the list option.

### Examples

```jsx
const refs = [React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()];

<FormControl
  label="Choose your answer"
  labelId="listbox-example-1"
>
  <Listbox id="listbox-example-1" labelledBy="listbox-example-1" refs={refs}>
    <ListOption ref={refs[0]}>Yes</ListOption>
    <ListOption ref={refs[1]}>No</ListOption>
    <ListOption ref={refs[2]}>Maybe</ListOption>
    <ListOption ref={refs[3]}>I don't know</ListOption>
    <ListOption ref={refs[4]} title="Can you repeat the question?">Can you repeat the question?</ListOption>
  </Listbox>
</FormControl>
```

If the list needs to be a certain size or style, place the listbox into its own containing `div` and style that `div`:

```jsx
const container = {
  width: '150px',
  height: '150px',
};
const selections = ['Yes', 'No', 'Maybe', "I don't know", 'Can you repeat the question?'];
const refs = selections.map(_ => React.createRef());
const children = selections.map((s, index) => <ListOption key={`${s}-${index}`} ref={refs[index]} title={s}>{s}</ListOption>);

<div style={container}>
  <FormControl
    label="Dynamic answers"
    labelId="listbox-example-2"
  >
    <Listbox id="listbox-example-2" labelledBy="listbox-example-2" refs={refs}>
      { children }
    </Listbox>
  </FormControl>
</div>
```
