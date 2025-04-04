The `<Icon>` component represents our latest patterns with using SVGs.
It is designed to be accessible and easy-to-use.

## Label Support

| Focused element | Screen reader |
| --------------- | ------------- |
| SVG             | Description of the usage of the icon |

## Keyboard Support

The `<Icon>` component does not support any interaction.
For an interactive icon component, @see [`<IconButton>`](#/Components/IconButton)

## Example

```js
import arrowLeft from '../../svgs/arrow-left.svg';

<Icon icon={arrowLeft} label="Left arrow" />
```
