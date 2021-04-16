## Purpose

A form control for interacting with date data.
The component leverages native date controls for a familiar date-typing experience within each browser.
In addition, it provides its own calendar popup for an easy-to-use visual experience to set a date.

## Keyboard Support

| Key | Focused element | Function |
| --- | --------------- | -------- |
|     |                 |          |

## Label Support

| Focused element | Screen reader |
| --------------- | ------------- |
|                 |               |

## Test queries

| Query | Element |
| ----- | ------- |
|       |         |

## Props API Examples

```jsx
import Date from '@mavenlink/design-system/src/components/date/date.jsx';

<Date id="example-1" label="Example date field" name="example" placeholder="YYYY-MM-DD" required />
```

```jsx
import Date from '@mavenlink/design-system/src/components/date/date.jsx';

<Date id="example-2" label="Read-only date field" name="example" readOnly value="2020-06-06" />
```

```jsx
import Date from '@mavenlink/design-system/src/components/date/date.jsx';

<Date id="example-3" label="Invalid date field" name="example" validationMessage="There is something wrong." />
```

## Ref API Example

```jsx
import Date from '@mavenlink/design-system/src/components/date/date.jsx';
import RefExample from '@mavenlink/design-system/src/components/ref-example/ref-example.jsx';

const ref = React.createRef();

<RefExample ref={ref}>
  {({ onChange }) => (
    <Date 
      id="example-1" 
      label="Example date field" 
      name="example" 
      onChange={onChange} 
      ref={ref}
    />
  )}
</RefExample>
```
