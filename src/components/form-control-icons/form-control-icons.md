`FormControlIcons` provides a composable way to provide a validation icon and, optionally, other icons in the same container.

### Examples

Full usage with FormControl and `<input>`
```js
import FormControl from '@mavenlink/design-system/src/components/form-control/form-control.jsx';
import Icon from '@mavenlink/design-system/src/components/icon/icon.jsx';
import calendarSVG from '@mavenlink/design-system/src/svgs/calendar.svg';

function TestComponent() {
  const [valid, setValid] = React.useState(false);
  const errorMessage = 'This is an error';

  function handleClick() {
    setValid(!valid);
  }

  return (
    <div style={{
      width: '150px'
    }}>
      <FormControl id={uuid.v4()} label="Example Input" error={valid ? '' : errorMessage}>
        <input style={{ height: '20px' }} id={uuid.v4()} />
        <FormControlIcons validationMessage={valid ? '' : errorMessage}>
          <Icon icon={calendarSVG} label="open calendar" />
        </FormControlIcons>
      </FormControl>
      <button onClick={handleClick} >Toggle Validity</button>
    </div>
  )
}

<TestComponent />
```
