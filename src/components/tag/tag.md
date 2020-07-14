The `Tag` component is intended to represent a value, usually in a series with `TagList`, with a minimal footprint.

### Accessibility

This component's accessibility was built using the [WAI ARIA Examples](https://www.w3.org/TR/wai-aria-practices-1.1/examples/grid/LayoutGrids.html#ex2_label).

#### Keyboard navigation

| Key | State | Function |
| --- | --- | --- |
| Left arrow/Up arrow | | Moves focus to text content |
| Right arrow/Down arrow | | Moves focus to the clear button |
| Enter | Focused on clear button | Invokes `onRemove` callback |
| Space | Focused on clear button | Invokes `onRemove` callback |

#### Labels

- The text content has its own label as "${text content}"
- The clear button has a label of "Remove ${text content}"

### Basic examples

```js
<Tag id="basic-example-1" readOnly>Test Title</Tag>
```

```js
<Tag id="basic-example-2" >Test Title</Tag>
```

### Composition examples

```js
<Tag id="composition-example-1" readOnly>
  Test Title
  <span style={{color: "var(--mds-grey-54)", marginLeft: "var(--spacing-medium)"}}>
    4
  </span>
</Tag>
```

```js
import Icon from '../icon/icon.jsx';
import iconTick from '../../svgs/icon-tick.svg';

<Tag id="composition-example-2" readOnly>
  <span style={{display: 'inline-flex', alignItems: 'center'}}>
    Test Title
    <span style={{marginLeft: 'var(--spacing-medium)', display: 'inline-flex', alignItems: 'center'}}>
      <Icon name={iconTick.id} size="small" stroke="skip" fill="skip" currentColor="skip" />
    </span>
  </span>
</Tag>
```

### Functional API usage

The `onRemove` prop is used to register a handler for interaction with the tag's `clear` action being used by pointer, keyboard, or accessibility feature.


```js
<Tag id="on-clear-example" onRemove={event => { console.log(event); window.alert('Removed!'); }}>Test Title</Tag>
```

### Advanced usage

If not using inside a `TagList`, tags must be contained in an element with the `role="grid"` attribute set because each tag is a `row` containing two `gridcell`s.

When using `Tag` components outside of the `TagList` component, ensure that focus is properly managed. The "tab" key should change focus between groups of elements, and the "arrow" keys should navigate internally in those lists. The native behavior shown here is incorrect, as the "tab" key moves between `Tag` components, and the "arrow" keys only navigate the internal `Tag` elements. Using `TagList` implements the correct behavior for you.

```js
function Spacer() {
  return (<div style={{display: 'inline-block', width: 'var(--spacing-medium)'}} />);
}

<div role="grid">
  <Tag id="adv-example-1">Test 1</Tag>
  <Spacer />
  <Tag id="adv-example-2">Test 2</Tag>
  <Spacer />
  <Tag id="adv-example-3">Test 3</Tag>
  <Spacer />
  <Tag id="adv-example-4">Test 4</Tag>
</div>
```
