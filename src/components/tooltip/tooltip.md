The most basic usage of a tooltip (at least for Mavenlink) is typically an icon rendering the tooltip on hover.

```jsx
import Tooltip from './tooltip.jsx';
import Icon from '../icon/icon.jsx';
import cautionSvg from '../../svgs/caution.svg';

<Tooltip
  text="and here that beautiful text is"
  id="help-tooltip"
  direction="top"
>
  <Icon label="caution" icon={cautionSvg} describedBy="help-tooltip" />
</Tooltip>
```

However, the tooltip is intended to be usable in conjunction with any children or sibling components.

**Regardless, it is _imperative_ that there is an `aria-describedby` in the tooltipped component with the value of the `id` provided to `<Tooltip>`. This sets up the accessible relationship which help screenreaders and other assistive technology**.

There is a `useLayoutEffect` hook on the tooltip that will scan the document for a linking element and raise an error if it is not found.

```jsx
import Tooltip from './tooltip.jsx';

<Tooltip
  text="and here that beautiful text is"
  id="howdy-tooltip"
  direction="right"
>
  <div id="howdy" aria-describedby="howdy-tooltip">
    wow, a line of text with a tooltip
  </div>
</Tooltip>
```

Tooltips with interactive components

```jsx
import Tooltip from './tooltip.jsx';

<Tooltip text="Click me!" id="button-tooltip" direction="bottom">
  <button id="button" aria-describedby="button-tooltip">
    fart
  </button>
</Tooltip>
```

The tooltip appears both on focus and hover. Tab into the next input field.

```jsx
import Tooltip from './tooltip.jsx';

<Tooltip
  text="I am, indeed, a text box"
  id="texty-lad-tooltip"
  direction="left"
>
  <input id="texty-lad" aria-describedby="texty-lad-tooltip" />
</Tooltip>
```

Light variant tooltip

```jsx
import Tooltip from './tooltip.jsx';

<Tooltip
  text="and here that beautiful text is"
  id="light-tooltip"
  direction="top"
  variant="light"
>
  <div id="light-message" aria-describedby="light-tooltip">
    wow, a line of text with a tooltip
  </div>
</Tooltip>
```

Tooltip with graphic

```jsx
import Tooltip from './tooltip.jsx';
import Icon from '../icon/icon.jsx';
import arrowLeft from '../../svgs/arrow-left.svg';

<Tooltip
  text={
    <>
      <span>Here's pointed at me </span>
      <hr />
      <Icon icon={arrowLeft} label="Left arrow" />
    </>
  }
  id="graphic-tooltip"
  direction="top"
  variant="light"
>
  <div id="graphic-message" aria-describedby="graphic-tooltip">
    wow, look at this neato thing
  </div>
</Tooltip>
```
