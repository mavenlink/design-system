Use `Listbox` to display an accessible list of options, with its children being `ListOption` components:

```jsx
<Listbox>
  <ListOption selected>Yes</ListOption>
  <ListOption>No</ListOption>
  <ListOption selected>Maybe</ListOption>
  <ListOption>I don't know</ListOption>
  <ListOption title="Can you repeat the question?">Can you repeat the question?</ListOption>
</Listbox>
```

If the list needs to be a certain size or style, place the listbox into its own containing `div` and style that `div`:

```jsx
const container = {
  width: '150px',
  height: '150px',
};
const selections = ['Yes', 'No', 'Maybe', "I don't know", 'Can you repeat the question?'];
const children = selections.map((s, index) => <ListOption key={`${s}-${index}`} title={s}>{s}</ListOption>);
 
<div style={container}>
  <Listbox>
    { children }
  </Listbox>
</div>
```
