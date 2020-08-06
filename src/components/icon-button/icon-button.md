The `IconButton` component is a convenience wrapper for setting up an icon that is meant to be used as a button.

## Keyboard Support

| Key | Focused element | Function |
| --- | --- | --- |
| Space, Enter | Icon | Invokes the `onClick` handler |

## Label Support

| Focused element | Screen Reader |
| --- | --- |
| Icon | A description of the `onClick` handler |

```jsx
import caretDown from '../../svgs/caret-down.svg';

<div style={{
  border: '1px solid var(--mds-grey-54)',
  borderRadius: '3px',
  display: 'inline-flex',
}}>
  <IconButton
    label="Send an alert to the browser"
    icon={caretDown}
    onClick={() => alert('Button clicked!')}
  />
</div>
```
