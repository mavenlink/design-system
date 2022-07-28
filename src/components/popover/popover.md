The `Popover` component provides functionality somewhere between a modal and a toggle-tip. 
It doesn't interrupt flow like a modal would, but provides more than the purely informational function of a toggle-tip. 
It is a way to allow for greater branching functionality while staying in-flow.

The `Popover` component provides an API to control the open and/or close functionality:
use the ref to get or set the `open` state;
use the `shouldClose` callback to avoid closing the dialog;
and/or use the `onClose` callback to return focus to correct element.

```js
import Popover from '../../components/popover/popover.jsx';

const containerRef = React.createRef();
const popoverRef = React.createRef();

function onBlur(event) {
  if (shouldClose(event)) popoverRef.current.open = false;
}

function onButtonClicked(event) {
  popoverRef.current.open = true;
}

function shouldClose(event) {
  return !containerRef.current.contains(event.relatedTarget);
}

<div onBlur={onBlur} ref={containerRef} tabIndex={-1}>
  <button onClick={onButtonClicked}>Open Popover</button>
  <Popover ref={popoverRef} shouldClose={shouldClose} title="Popover Title" />
</div>
```


`Popover` contents should generally be a mix of informational and interactive components. 
Interactive components should be in the user focus flow, usually by making sure they have a `tabIndex={0}`.

```js
import Popover from '../../components/popover/popover.jsx';
import SectionRow from '../../components/section-row/section-row.jsx';
import RefExample from '../../components/__site__/ref-example/ref-example.jsx';

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

Example with no heading that looks more like 'fly-out menu'
```js
import Popover from '../../components/popover/popover.jsx';

const popoverRef = React.createRef();
const containerRef = React.createRef();

function onBlur(event) {
  if (shouldClose(event)) popoverRef.current.open = false;
}

function onButtonClicked(event) {
  popoverRef.current.open = true;
}

function shouldClose(event) {
  return !containerRef.current.contains(event.relatedTarget);
}

<div onBlur={onBlur} ref={containerRef} tabIndex={-1} style={{position: 'relative'}}>
  <button onClick={onButtonClicked}>Fly Out menu example</button>
  <Popover ref={popoverRef} shouldClose={shouldClose} hideHeading style={{position: 'absolute'}}>
  <ul>
    <li>option 1</li>
    <li>option 2</li>
    <li>option 3</li>
  </ul>
  </Popover>
</div>
```
