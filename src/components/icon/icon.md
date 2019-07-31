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
