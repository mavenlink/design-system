The `TagList` component encompasses the design and accessibility requires for a list of tags.
It is designed to take arbitirary nested components.
It only requires a few things to get it working:

1. A list of `ref`s which each individual `ref` is passed into a tag
1. Events are propagated to the `TagList` to handle interactions

### Accessibility

This component's accessibility was built using the [WAI ARIA example for a layout grid](https://www.w3.org/TR/wai-aria-practices-1.1/examples/grid/LayoutGrids.html#ex2_label).

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
