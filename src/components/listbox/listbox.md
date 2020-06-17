Use `Listbox` to display an accessible list of options, with its children being `ListOption` components:

```jsx
const refs = [React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()];

<FormControl
  label="Choose your answer"
  labelId="listbox-example-1"
>
  <Listbox id="listbox-example-1" refs={refs}>
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
    <Listbox id="listbox-example-2" refs={refs}>
      { children }
    </Listbox>
  </FormControl>
</div>
```
