For design and accessibility functionality, see [Form Controls > Date documentation](https://www.notion.so/Date-eb1b5fc8ce324cc39eaaa28772d055da).

## Props API Examples

```jsx
import Date from '../../components/date/date.jsx';

<Date id={uuid.v4()} label="Example date field" name="example" placeholder="YYYY-MM-DD" required />
```

```jsx
import Date from '../../components/date/date.jsx';

<Date id={uuid.v4()} label="Read-only date field" name="example" readOnly value="2020-06-06" />
```

```jsx
import Date from '../../components/date/date.jsx';

<Date id={uuid.v4()} label="Invalid date field" name="example" validationMessage="There is something wrong." />
```

## Ref API Example

```jsx
import Date from '../../components/date/date.jsx';
import RefExample from '../../components/__site__/ref-example/ref-example.jsx';

const ref = React.createRef();

<RefExample ref={ref}>
  {({ onChange }) => (
    <Date
      id={uuid.v4()} 
      label="Example date field" 
      name="example" 
      onChange={onChange} 
      ref={ref}
    />
  )}
</RefExample>
```
