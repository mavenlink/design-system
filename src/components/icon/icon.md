The `<Icon>` component represents our latest patterns with using SVGs.
It is also designed to be accessible -- please read our accessibility section below!

Forward facing note:

- `currentColor` API is being deprecated in favor of self-contained SVGs -- please use `skip` for now
- `fill` API is being deprecated in favor of self-contained SVGs -- please use `skip` for now
- `skip` API is being deprecated in favor of self-contained SVGs -- please use `skip` for now
- *Self-contained are SVGs with all coloring styling applied in the SVG file

### Accessibility

#### Labeling

The `Icon` component exposes a few configured properties to fine-tune the accessibility provided by the SVG.

- `ariaLabel` API expresses an a11y description for the SVG
- `ariaLabelledBy` API expresses a complex a11y description based on IDs for the SVG
- `title` API expresses an a11y description for the SVG -- this does the same thing as `ariaLabel`

#### Keyboard functionality

| Key | State | Behavior |
| --- | --- | --- |

Refactor in-progress.
