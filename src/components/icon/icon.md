The `<Icon>` component represents our latest patterns with using SVGs.
It is designed to be accessible and easy-to-use.

## Label Support

| Element | Label |
| --- | --- |
| SVG | Provided by `label` or `labelledBy` props |

## Keyboard functionality

The `<Icon>` component does not support any interaction.
For a interactive icon component, see [`<IconButton>`](#/Components/IconButton)

## Example

```js
import arrowLeft from '../../svgs/arrow-left.svg';

<Icon icon={arrowLeft} label="Left arrow" />
```
