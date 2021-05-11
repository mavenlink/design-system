The `Popover` component provides functionality somewhere between a modal and a toggletip. It doesn't interrupt flow like a modal would, but provides more than the purely informational function of a toggletip. It is a way to allow for greater branching functionality while staying in-flow.

The `Popover` component provides a ref for getting and setting the `open` state, as well as an `onClose` callback in props. These features can be used to more tightly control the open/close functionality, and to return focus to the correct element once closed.

`Popover`s will close if a `click` or `focusin` event reaches the root `window` (the popover ignores these events if they originate from within it), so click/focus events that should not close the `Popover` should have `stopPropogation` called on them.

```js
import Popover from '@mavenlink/design-system/src/components/popover/popover.jsx';

const popoverRef = React.createRef();
const buttonRef = React.createRef();

function onButtonClicked(event) {
  popoverRef.current.open = true;
}

function shouldClose(focusedElement) {
  return focusedElement !== buttonRef.current;
}

<React.Fragment>
  <button onClick={onButtonClicked} ref={buttonRef}>Open Popover</button>
  <Popover ref={popoverRef} shouldClose={shouldClose} title="Popover Title" />
</React.Fragment>
```


`Popover` contents should generally be a mix of informational and interactive components. 
Interactive components should be in the user focus flow, usually by making sure they have a `tabIndex={0}`.

```js
import Popover from '@mavenlink/design-system/src/components/popover/popover.jsx';
import SectionRow from '@mavenlink/design-system/src/components/section-row/section-row.jsx';
import RefExample from '@mavenlink/design-system/src/components/ref-example/ref-example.jsx';

const ref = React.createRef();

function onPopoverOpenButtonClick() {
  ref.current.open = true;
}

<RefExample ref={ref}>
  {({ onChange }) => (
    <React.Fragment>
      <button onClick={onPopoverOpenButtonClick}>Open Popover</button>
      <Popover ref={ref} title="Popover Title" onClose={onChange}>
        <button tabIndex={0}>A test button</button>
        <SectionRow>
          <span>Some nested content</span>
          <span>Some more nested content</span>
        </SectionRow>
      </Popover>
    </React.Fragment>
  )}
</RefExample>
```
