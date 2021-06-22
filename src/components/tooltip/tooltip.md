The most basic usage of a tooltip (at least for Mavenlink) is typically an icon rendering the tooltip on hover.

```jsx
import Tooltip from "./tooltip.jsx";
import Icon from "../icon/icon.jsx";
import cautionSvg from '../../svgs/caution.svg';

<Tooltip text="and here that beautiful text is" id="help" direction="top">
  <Icon label="caution" icon={cautionSvg} aria-describedby="help-tooltip" />
</Tooltip>
```

However, the tooltip is intended to be usable with basically any children, such as text, input fields, buttons, etc.

_It is imperative that you use_ **`aria-describedby`** _on the component the tooltip is related to with_ **`{id}-tooltip`** _to help screenreaders and other assistive technology_.

```jsx
import Tooltip from "./tooltip.jsx";

<Tooltip text="and here that beautiful text is" id="howdy" direction="right">
  <div id="howdy" aria-describedby="howdy-tooltip">
    wow, a line of text with a tooltip
  </div>
</Tooltip>
```

Tooltips with interactive components

```jsx
import Tooltip from "./tooltip.jsx";

<Tooltip text="Click me!" id="fart" direction="bottom">
  <button id="fart" aria-describedby="fart-tooltip">fart</button>
</Tooltip>
```

The tooltip appears both on focus and hover. Tab into the next input field.

```jsx
import Tooltip from "./tooltip.jsx";

<Tooltip text="I am, indeed, a text box" id="texty-lad" direction="left">
    <input id="texty-lad" aria-describedby="texty-lad-tooltip" />
</Tooltip>
```
