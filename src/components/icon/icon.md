The `<Icon>` component represents our latest patterns with using SVGs.
It is also designed to be accessible -- please read our accessibility section below!

Forward facing note:

- `currentColor` API is being deprecated in favor of self-contained SVGs -- please use `skip` for now
- `fill` API is being deprecated in favor of self-contained SVGs -- please use `skip` for now
- `skip` API is being deprecated in favor of self-contained SVGs -- please use `skip` for now
- *Self-contained are SVGs with all coloring styling applied in the SVG file

### Basic Usage

```jsx
const icon = require('../../svgs/icon-caution-fill.svg').default;
<Icon name={icon.id} size="large" currentColor="skip" fill="skip" stroke="skip" title="alert icon" />
```

### Sizes

For the most part, the `size` API is the main configurable property.

```jsx
const icon = require('../../svgs/icon-caution-fill.svg').default;
<Icon name={icon.id} size="small" currentColor="skip" fill="skip" stroke="skip" />
```

```jsx
const icon = require('../../svgs/icon-caution-fill.svg').default;
<Icon name={icon.id} size="medium" currentColor="skip" fill="skip" stroke="skip" />
```

```jsx
const icon = require('../../svgs/icon-caution-fill.svg').default;
<Icon name={icon.id} size="large" currentColor="skip" fill="skip" stroke="skip" />
```

### Accessibility

The `Icon` component exposes a few configured properties to fine-tune the accessibility provided by the SVG.

- `role` API expresses whether it is presentational (`img`) or interactive (`button`)
- `ariaLabel` API expresses an a11y description for the SVG
- `ariaLabelledBy` API expresses a complex a11y description based on IDs for the SVG
- `title` API expresses an a11y description for the SVG -- this does the same thing as `ariaLabel`

Whenever the `role="button"` is set, the Icon requires a label/title to express what the button does (e.g. "Remove item").

```jsx
const icon = require('../../svgs/icon-clear-small.svg').default;
<Icon name={icon.id} ariaLabel="Remove item" role="button" size="small" currentColor="skip" fill="skip" stroke="skip" />
```

In the above example, the SVG expresses its behavior to the user.
However, it can be improved by being more specific (i.e. what is "item" in this case?).
The `ariaLabelledBy` can indicate the action and the item specifying the IDs (in a particular order) of the elements with friendly screen reader labels.

```jsx
const icon = require('../../svgs/icon-clear-small.svg').default;

<React.Fragment>
  <span id="a11y-item">I am an item</span>
  <Icon name={icon.id} id="a11y-icon" ariaLabel="Remove" ariaLabelledBy="a11y-icon a11y-item" role="button" size="small" currentColor="skip" fill="skip" stroke="skip" />
</React.Fragment>
```
