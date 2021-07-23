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

Uses the `<MultiSelect>` test queries.

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
  value={['0']}
/>
```

## Ref API Example
```jsx
import CustomFieldInputMultipleChoice from '@mavenlink/design-system/src/components/custom-field-input-multiple-choice/custom-field-input-multiple-choice.jsx';
import RefExample from '@mavenlink/design-system/src/components/__site__/ref-example/ref-example.jsx';

const ref = React.createRef();

<RefExample ref={ref}>
  {({ onChange }) => (
    <CustomFieldInputMultipleChoice customFieldID="0" ref={ref} onChange={onChange} id="customfieldmultiplechoice-ref-example" name="example-ref" label="CustomFieldInputMultipleChoice Ref Example" />
  )}
</RefExample>
```
