The `<Icon />` component's API is mostly self-evident and you can refer to the props table at the bottom of this page.
However, let's look at the color properties in more detail.
We use three different properties to apply different colors to an SVG:

- `fill` sets the fill color
- `stroke` sets the stroke color
- `currentColor` is an SVG trick to provide an additional `fill` and/or `stroke` color

Basic Usage

```jsx
const icon = require('../../svgs/icon-caution-fill.svg').default;
<Icon name={icon.id} size="large" currentColor="caution" title="alert icon" />
```
Sizes

```jsx
const styles = require('./example.css'); /* For example purposes only! */
const icon = require('../../svgs/icon-caution-fill.svg').default;

<div>
  <span className={styles['icon-example']}>
    <Icon name={icon.id} size="small" currentColor="caution" />
  </span>
  <span className={styles['icon-example']}>
    <Icon name={icon.id} size="medium" currentColor="caution" />
  </span>
  <span className={styles['icon-example']}>
    <Icon name={icon.id} size="large" currentColor="caution" />
  </span>
</div>
```

Current Color Example

Can be one of 'primary', 'action', 'highlight', or 'caution';

```jsx
const icon = require('../../svgs/icon-caution-fill.svg').default;

<div>
  <Icon name={icon.id} size="large" currentColor="primary" />
</div>
```

### Accessibility

The `Icon` role defaults to `img`, but should be overridden to `button` if the icon is used in a "clickable" manner: IE to take an action. `Icon` also provides an `aria-label` attribute to describe its intent, and this defaults to the second chunk of the svg icon id. As an example: `icon-caution-fill.svg` will get `caution` as the `aria-label`. This won't work for every case, either due to file naming scheme, or the file name not accurately describing the context of the icon usage. The `ariaLabel` prop should be used to override in these cases.
