The `IconButton` component encapsulates the requirements for using an icon as a button.
It is recommended to apply some padding to the icon as a means of increasing the size of the button for easier usage.

## Keyboard Support

| Key | Focused element | Function |
| --- | --------------- | -------- |
| Enter | SVG           | Invokes the `onPress` handler |
| Space | SVG           | Invokes the `onPress` handler |

## Label Support

| Focused element | Screen Reader |
| --------------- | ------------- |
| SVG             | A description of the `onPress` handler |

```css { "file": "./icon-button.md.css" }
```

## Basic example

```jsx
import caretDown from '../../svgs/caret-down.svg';
import styles from './icon-button.md.css';

<IconButton
  className={styles.button}
  label="Send an alert to the browser"
  icon={caretDown}
  onPress={() => alert('Button pressed!')}
/>
```

## Advanced example

A button represents an action on an object.
It is recommened to link the button's label with the object's label.
This is usually implemented by leveraging the `labelledBy` property which can reference many elements on the page.
In the following example:
the button clears the input;
the button has a label of "clear";
the input has a label of "the input";
thus, the computed label is actually "clear the input".

```jsx
import clear from '../../svgs/clear.svg';
import styles from './icon-button.md.css';

<div className={styles['adv-example']}>
  <input aria-label="the input" id={uuid.v4()} />
  <IconButton
    className={styles['clear-button']}
    label="clear"
    labelledBy="adv-ex-button adv-ex-input"
    id={uuid.v4()}
    icon={clear}
    onPress={() => alert('Imagine the input was cleared.')}
  />
</div>
```
