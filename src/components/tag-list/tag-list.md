The `TagList` component encompasses the design and accessibility requires for a list of tags.
It is designed to take arbitirary nested components.
It only requires a few things to get it working:

1. A list of `ref`s which each individual `ref` is passed into a tag
1. Events are propagated to the `TagList` to handle interactions

### Accessibility

This component's accessibility was built using the [WAI ARIA example for a layout grid](https://www.w3.org/TR/wai-aria-practices-1.1/examples/grid/LayoutGrids.html#ex2_label).

### Labeling

The TagList is a grid widget.
Each individual tag is a row.
A tag can be made up of many grid cells.
This ensures screen readers can know:

1. How many tags are in the list
1. Which tag has focus
1. Which element in a tag has focus

#### Keyboard interactions

| Key | State | Interaction |
| --- | --- | --- |
| Left / Up Arrrow | --- | Moves the focus to the previous tag |
| Right / Down Arrrow | --- | Moves the focus to the next tag |
| Home | --- | Moves the focus to the first tag |
| Last | --- | Moves the focus to the first tag |

Notes:

1. The focus does not wrap around a tag list
1. There is only 1 active tag in the page tab sequence

#### Mouse interactions

Clicking on a tag will focus the tag.

### Example

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
