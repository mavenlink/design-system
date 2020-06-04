```jsx
const data = [
  'Molotov Solution',
  'Band Name',
];
const refs = data.map(() => React.createRef());

<TagList refs={refs}>
  {
    data.map((datum, index) => (
      <Tag key={`tag-${index}`} id={`tag-${index}`} ref={refs[index]}>{datum}</Tag>
    ))
  }
</TagList>
```
