The `<Icon />` component's API is mostly self-evident and you can
refer to the Props table at the bottom of this page. However, let's look
at the color properties in more detail. While `fill`
sets the color inside the object, and `stroke` sets
color of the line drawn around the SVG, `currentColor` is used to,
essentially, set the font `color` CSS property to the SVG icon. The
reason it's called `currentColor` is that we utilize `currentColor`
to allow an additional fill color to be applied by way of the fact that
`currentColor` is a CSS value that tells the engine to use whatever CSS
font `color` is inherited.

The `currentColor` approach assumes the SVG _sub-elements_ of interest have
something like `<path fill="currentColor" ...` defined within them. You
can inspect the SVG itself to see this.

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
