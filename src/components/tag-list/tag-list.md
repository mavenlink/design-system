### Accessibility

This component's accessibility was built using the [WAI ARIA Examples](https://www.w3.org/TR/wai-aria-practices-1.1/examples/grid/LayoutGrids.html#ex2_label).

#### Keyboard navigation

- Tags in the TagList can be navigated with _only_ the arrow keys
- On first time render, the first tag can be focused
- After navigating within a TagList, the last focused tag is the only focusable tag

## Basic example

```jsx
const refs = Array(3).fill().map(() => React.createRef());

<TagList refs={refs}>
  <Tag ref={refs[0]} defaultFocusable={true}>
    Eggs
  </Tag>
  <Tag ref={refs[1]} defaultFocusable={false}>
    Bacon
  </Tag>
  <Tag ref={refs[2]} defaultFocusable={false}>
    Avocado
  </Tag>
</TagList>
```

## Real case

```jsx
const backendTagData = [
  'Eggs',
  'Bacon',
  'Avocado',
];

const refs = backendTagData.map(() => React.createRef());

<TagList refs={refs}>
  {backendTagData.map((datum, i) => (
    <Tag ref={refs[i]} defaultFocusable={i === 0}>{datum}</Tag>
  ))}
</TagList>
```
