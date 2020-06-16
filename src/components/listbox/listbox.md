Here's a simple example:

```jsx
<Listbox
  selections={['Yes', 'No', 'Maybe', "I don't know", 'Can you repeat the question?']}
/>
```

If you want it to be in a smaller box, put it in a containing div and style the div:

```jsx
const container = {
  width: '200px',
  height: '150px',
};

<div style={container}>
  <Listbox
    selections={['Yes', 'No', 'Maybe', "I don't know", 'Can you repeat the question?']}
  />
</div>
```
