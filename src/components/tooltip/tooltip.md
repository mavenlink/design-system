The most basic usage of a tooltip (at least for Mavenlink) is typically an icon rendering the tooltip on hover.

```jsx
import Tooltip from "./tooltip.jsx";
import Icon from "../icon/icon.jsx";
import cautionSvg from '../../svgs/caution.svg';

<Tooltip text="and here that beautiful text is" id="help-tooltip" direction="top">
  <Icon label="caution" icon={cautionSvg} aria-describedby="help-tooltip" />
</Tooltip>
```

However, the tooltip is intended to be usable in conjunction with any children or sibling components.

**Regardless, it is _imperative_ that you use `aria-describedby` on the component the tooltip is related to with the `id` provided to `<Tooltip>` to help screenreaders and other assistive technology**.

```jsx
import Tooltip from "./tooltip.jsx";

<Tooltip text="and here that beautiful text is" id="howdy-tooltip" direction="right">
  <div id="howdy" aria-describedby="howdy-tooltip">
    wow, a line of text with a tooltip
  </div>
</Tooltip>
```

Tooltips with interactive components

```jsx
import Tooltip from "./tooltip.jsx";

<Tooltip text="Click me!" id="button-tooltip" direction="bottom">
  <button id="button" aria-describedby="button-tooltip">fart</button>
</Tooltip>
```

The tooltip appears both on focus and hover. Tab into the next input field.

```jsx
import Tooltip from "./tooltip.jsx";

<Tooltip text="I am, indeed, a text box" id="texty-lad-tooltip" direction="left">
    <input id="texty-lad" aria-describedby="texty-lad-tooltip" />
</Tooltip>
```

Finally, you can also use the `truncate` prop to limit tooltip length.

In general, this is not recommended. Tooltips should be kept short and concise. If something needs a particularly long and verbose set of text, it should be somewhere other than a tooltip. However, in cases where tooltips render user-entered data, this is not always achievable. Use this option mindfully.

```jsx
import Tooltip from "./tooltip.jsx";

const terms = "By using this Site, you agree to be bound by, and to comply with, these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use this site.";

<Tooltip text={terms} id="terms-n-conditions-tooltip" truncate>
    <input type="checkbox" id="terms-n-conditions" aria-describedby="terms-n-conditions-tooltip" />
</Tooltip>
```
