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
