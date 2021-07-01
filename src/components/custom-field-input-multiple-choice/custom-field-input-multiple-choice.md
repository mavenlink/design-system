## Purpose

The `CustomFieldInputMultipleChoice` component represents the UI for a custom field of type multi choice from Mavenlink's API.

## Keyboard Support

| Key | Focused element | Function |
| --- | --------------- | -------- |
| Arrows | Selected choice | Moves focuses between selected choices |
| Enter, Space | Selected choice remove button | Removes the selected choice |
| Escape | Any element | Closes autocomplete list |
| Typing | Autocomplete textbox | Opens the available choices listbox |
| Enter | Available choice | Selects the choice |

## Label Support

| Focused element | Screen reader |
| --------------- | ------------- |
| Selected choice | Choice label |
| Selected choice remove button | Remove `<choice label>` |
| Autocomplete textbox | Field label and any validation state |
| Remove button | Remove all selected choices on `<field label>` |
| Available choice | Choice label |

## Test Queries

| Query | Element |
| ----- | -------- |
| `*Autcompleter` | The autocompleter input |
| `*AvailableChoice` | A particular choice in the popup |
| `*RemoveButton` | Either the remove all button or remove choice button |
| `*SelectedChoice` | A particular selected choice |

## Props API Examples

```js
import CustomFieldInputMultipleChoice from '@mavenlink/design-system/src/components/custom-field-input-multiple-choice/custom-field-input-multiple-choice.jsx';

<CustomFieldInputMultipleChoice
  customFieldID="0"
  id={uuid.v4()}
  label="This custom field is empty"
  name="example-empty"
  placeholder="This is an empty multi-choice field"
  required
/>
```

```js
import CustomFieldInputMultipleChoice from '@mavenlink/design-system/src/components/custom-field-input-multiple-choice/custom-field-input-multiple-choice.jsx';

<CustomFieldInputMultipleChoice
  customFieldID="-1"
  id={uuid.v4()}
  label="This custom field has no choices"
  name="example-no-choices"
  placeholder="This input represents a custom field with no choices"
/>
```

```js
import CustomFieldInputMultipleChoice from '@mavenlink/design-system/src/components/custom-field-input-multiple-choice/custom-field-input-multiple-choice.jsx';

<CustomFieldInputMultipleChoice
  customFieldID="0"
  id={uuid.v4()}
  label="This custom field is read-only"
  name="example-readonly"
  readOnly
  value={['0', '1']}
/>
```

```js
import CustomFieldInputMultipleChoice from '@mavenlink/design-system/src/components/custom-field-input-multiple-choice/custom-field-input-multiple-choice.jsx';

<CustomFieldInputMultipleChoice
  customFieldID="0"
  errorText="If you're not first, you're last!"
  id={uuid.v4()}
  label="This custom field is invalid"
  name="example-invalid"
  value={['0']}
/>
```

## Ref API Example

```js
import CustomFieldInputMultipleChoice from '@mavenlink/design-system/src/components/custom-field-input-multiple-choice/custom-field-input-multiple-choice.jsx';

const initialValue = [
  '3',
  '11',
  '4',
  '6',
  '7',
  '8',
  '9',
];
const swapValue = [
  '5',
  '10',
  '11',
];

function TestComponent() {
  const ref = React.useRef();
  const [target, setTarget] = React.useState({});
  const [useSwapValue, setUseSwapValue] = React.useState(false);

  function onChange(event) {
    setTarget(event.target)
  }

  function onSwapValueClick() {
    setUseSwapValue(!useSwapValue);
  }

  return (
    <React.Fragment>
      <CustomFieldInputMultipleChoice
        customFieldID="1"
        id={uuid.v4()}
        label="This custom field has a lot of choices"
        name="example-lotsa"
        onChange={onChange}
        value={useSwapValue ? swapValue : initialValue}
      />
      <ul>
        {Object.keys(target).map(key => (
          <li key={key}>{key}: {JSON.stringify(target[key])}</li>
        ))}
        <li>useSwapValue: {JSON.stringify(useSwapValue)}</li>
      </ul>
      <button onClick={onSwapValueClick}>Swap Value</button>
    </React.Fragment>
  );
}

<TestComponent />
```
