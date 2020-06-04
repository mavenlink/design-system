```jsx
const data = [
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
