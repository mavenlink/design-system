The `Popover` component provides functionality somewhere between a modal and a toggletip. It doesn't interrupt flow like a modal would, but provides more than the purely informational function of a toggletip. It is a way to allow for greater branching functionality while staying in-flow.

The `Popover` component provides a ref for getting and setting the `open` state, as well as an `onClose` callback in props. These features can be used to more tightly control the open/close functionality, and to return focus to the correct element once closed.

`Popover`s will close if a `click` event reaches the root `window`, so click events that should not close the `Popover` should have `stopPropogation` called on them.

```js
const popoverRef = React.createRef();

const onButtonClicked = () => {
  popoverRef.current.open = !popoverRef.current.open;
}

<React.Fragment>
  <button onClick={onButtonClicked}>Toggle Popover</button>
  <Popover ref={popoverRef} title="Popover Title" />
</React.Fragment>
```


`Popover` can be manually positioned relative to screenspace, and will maintain that position (doesn't scroll with page). Care should be taken to add `tabIndex` properties to interactive elements within the `Popover` to properly support keyboard accessibility.

```js
import SectionRow from '../section-row/section-row.jsx';

const popoverRef = React.createRef();

const onButtonClicked = () => {
  popoverRef.current.open = !popoverRef.current.open;
}

<React.Fragment>
  <button onClick={onButtonClicked}>Toggle Popover</button>
  <Popover ref={popoverRef} title="Popover Title" top={window.innerHeight / 2} left={window.innerWidth / 2}>
    <button tabIndex={0}>A test button</button>
    <SectionRow>
      <span>Some nested content</span>
      <span>Some more nested content</span>
    </SectionRow>
  </Popover>
</React.Fragment>
```
