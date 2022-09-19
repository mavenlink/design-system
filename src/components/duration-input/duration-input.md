Duration input is an html input that formats the users input into a consistent output on blur. Its value of the ref is always in minutes.

| user input | ref value (minutes) | reformatted text of the input | 
| --- | --- | --- |
| 2 | 120 | 2h 00 |
| 3h | 180 | 3h 00 |
| 4.5 | 270 | 4h 30 |
| .25 | 15 | 0h 15 |
| 45m | 45 | 0h 45 |
| 45 min | 45 | 0h 45 |
| 1 hour 30 min | 90 | 1h 30 |
| 1h 15 | 75 | 1h 15 |
| 2:30 | 150 | 2h 30 |
| 1.5d | 864 | 36h 00 |
| 3 days | 1728 | 72h 00 
| 2 days 2 hours 2 mins | 1202 | 50h 02 |

```js
<DurationInput id={uuid.v4()} label="Default example" />
```

```js
<DurationInput id={uuid.v4()} label="With a value" value={120} />
```

## Ref API Example
```jsx
import DurationInput from '../../components/duration-input/duration-input.jsx';
import RefExample from '../../components/__site__/ref-example/ref-example.jsx';

const ref = React.createRef();

<RefExample ref={ref}>
  {({ onChange }) => (
    <DurationInput id={uuid.v4()} ref={ref} onChange={onChange} label='Ref Example' name={'ref-ex'}  />
  )}
</RefExample>
```

```js
<DurationInput id={uuid.v4()} label="Required example" required />
```

```js
<DurationInput id={uuid.v4()} label="Server error example" validationMessage="The server returned an error." />
```

```js
<DurationInput id={uuid.v4()} label="Read-only / disabled example" readOnly />
```
