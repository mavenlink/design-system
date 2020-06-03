### Accessibility

This component's accessibility was built using the [WAI ARIA Examples](https://www.w3.org/TR/wai-aria-practices-1.1/examples/grid/LayoutGrids.html#ex2_label).

#### Keyboard navigation

- Tags in the TagList can be navigated with _only_ the arrow keys
- On first time render, the first tag can be focused
- After navigating within a TagList, the last focused tag is the only focusable tag

## Basic example

```
<TagList>
  {(lastFocusedIndex, moveNext, movePrevious) => (
    <React.Fragment>
      <Tag
        lastFocused={lastFocusedIndex === 0}
        moveNext={moveNext}
        movePrevious={movePrevious}
      >
        Eggs
      </Tag>
      <Tag
        lastFocused={lastFocusedIndex === 1}
        moveNext={moveNext}
        movePrevious={movePrevious}
      >
        Bacon
      </Tag>
      <Tag
        lastFocused={lastFocusedIndex === 2}
        moveNext={moveNext}
        movePrevious={movePrevious}
      >
        Avocado
      </Tag>
    </React.Fragment>
  )}
</TagList>
```
