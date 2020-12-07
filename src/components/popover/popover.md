The `Popover` component provides functionality somewhere between a modal and a toggletip. It doesn't interrupt flow like a modal would, but provides more than the purely informational function of a toggletip. It is a way to allow for greater branching functionality while staying in-flow.

The `Popover` component provides a ref for getting and setting the `open` state, as well as an `onClose` callback in props. These features can be used to more tightly control the open/close functionality, and to return focus to the correct element once closed.

`Popover`s will close if a `click` or `focusin` event reaches the root `window` (the popover ignores these events if they originate from within it), so click/focus events that should not close the `Popover` should have `stopPropogation` called on them.

```js
const popoverRef = React.createRef();

const onButtonClicked = (event) => {
  popoverRef.current.open = true;
  event.stopPropagation();
  // These are to prevent the popover from closing when we want to keep it open
}

const onButtonFocused = (event) => {
  event.stopPropagation();
  event.preventDefault();
  // These are to prevent the popover from closing when we want to keep it open
  // Unfortunately, for focus events, this only works in React>=17
  // See: https://github.com/facebook/react/issues/6410
}

<React.Fragment>
  <button onClick={onButtonClicked} onFocus={onButtonFocused}>Open Popover</button>
  <Popover ref={popoverRef} title="Popover Title" />
</React.Fragment>
```


`Popover` contents should generally be a mix of informational and interactive components. Interactive components should be in the user focus flow, usually by making sure they have a `tabIndex={0}`.

```js
import SectionRow from '../section-row/section-row.jsx';

const popoverRef = React.createRef();

const onPopoverOpenButtonClick = () => {
  popoverRef.current.open = true;
}

<React.Fragment>
  <button onClick={onPopoverOpenButtonClick}>Open Popover</button>
  <Popover ref={popoverRef} title="Popover Title">
    <button tabIndex={0}>A test button</button>
    <SectionRow>
      <span>Some nested content</span>
      <span>Some more nested content</span>
    </SectionRow>
  </Popover>
</React.Fragment>
```
