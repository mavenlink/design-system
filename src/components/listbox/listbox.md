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

```js
const refs = [React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()];

<FormControl
  label="Choose your answer"
  labelId="listbox-example-1"
>
  <Listbox labelledBy="listbox-example-1" refs={refs}>
    <ListOption ref={refs[0]} value="1">Yes</ListOption>
    <ListOption ref={refs[1]} value="2">No</ListOption>
    <ListOption ref={refs[2]} value="3">Maybe</ListOption>
    <ListOption ref={refs[3]} value="4">I don't know</ListOption>
    <ListOption ref={refs[4]} title="Can you repeat the question?" value="5">Can you repeat the question?</ListOption>
  </Listbox>
</FormControl>
```

If the list needs to be a certain size or style, place the listbox into its own containing `div` and style that `div`:

```js
const container = {
  width: '150px',
  height: '150px',
};
const options = ['Yes', 'No', 'Maybe', "I don't know", 'Can you repeat the question?'];
const refs = options.map(_ => React.createRef());
const children = options.map((option, index) => (
  <ListOption key={`${option}-${index}`} ref={refs[index]} title={option} value={option}>
    {option}
  </ListOption>
));

<div style={container}>
  <FormControl
    label="Dynamic answers"
    labelId="listbox-example-2"
  >
    <Listbox labelledBy="listbox-example-2" refs={refs}>
      { children }
    </Listbox>
  </FormControl>
</div>
```
