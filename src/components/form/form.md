The form component manages its own state for dirtiness and validity.
The form component allows a parent component to submit its data with a `onSubmit` callback.
The form component allows a parent component to listen to value changes with a `onChange` callback.

## Keyboard Support

| Key | Focused element | Function |
| --- | --- |
| Enter | Save button | Submits the form |

## Label Support

| Element | Label |
| --- | --- |
| Save button | Save |

## Examples

### Example with native inputs

```jsx
import Form from '@mavenlink/design-system/src/components/form/form.jsx';

const refs = [
  React.createRef(),
  React.createRef(),
];

<Form refs={refs} onSubmit={() => alert('Submitted the form!')}>
  {() => (
    <React.Fragment>
      <input defaultValue="Example for a persisted value" ref={refs[0]} />
      <input ref={refs[1]} />
    </React.Fragment>
  )}
</Form>
```

### Example with custom fields

```jsx
import Form from '@mavenlink/design-system/src/components/form/form.jsx';
import Text from '@mavenlink/design-system/src/components/custom-field-input-text/custom-field-input-text.jsx';
import Number from '@mavenlink/design-system/src/components/custom-field-input-number/custom-field-input-number.jsx';
import Currency from '@mavenlink/design-system/src/components/custom-field-input-currency/custom-field-input-currency.jsx';
import Date from '@mavenlink/design-system/src/components/custom-field-input-date/custom-field-input-date.jsx';
import SingleChoice from '@mavenlink/design-system/src/components/custom-field-input-single-choice/custom-field-input-single-choice.jsx';
import MultiChoice from '@mavenlink/design-system/src/components/custom-field-input-multiple-choice/custom-field-input-multiple-choice.jsx';

const refs = [
  React.createRef(),
  React.createRef(),
  React.createRef(),
  React.createRef(),
  React.createRef(),
  React.createRef(),
];

function onSubmit(event) {
  const message = Object.keys(event.data).reduce((acc, fieldName) => {
    return `${acc}${fieldName}=${event.data[fieldName].value}; `;
  }, '');

  window.alert(message);
}

<Form refs={refs} onSubmit={onSubmit}>
  {() => (
    <React.Fragment>
      <Text
        defaultValue="Example for a persisted value"
        id="text-field"
        label="Custom Field Text"
        name="text-name"
        ref={refs[0]}
      />
      <Number
        id="number-field"
        label="Custom Field Number"
        name="number-name"
        ref={refs[1]}
        value={1337}
      />
      <Currency
        currencyCode="USD"
        id="currency-field"
        label="Custom Field Currency"
        name="currency-name"
        ref={refs[2]}
        value={350}
      />
      <Date
        id="date-field"
        label="Custom Field Date"
        name="date-name"
        ref={refs[3]}
      />
      <SingleChoice
        choices={[{ id: 1, label: 'Choice 1' }, { id: 2, label: 'Choice 2' }]}
        id="single-choice-field"
        label="Custom Field Single Choice"
        name="single-choice-name"
        ref={refs[4]}
      />
      <MultiChoice
        choices={[{ id: 1, label: 'Choice 1' }, { id: 2, label: 'Choice 2' }, { id: 3, label: 'Choice 3' }]}
        id="multiple-choice-field"
        label="Custom Field Multiple Choice"
        name="multiple-choice-name"
        ref={refs[5]}
      />
    </React.Fragment>
  )}
</Form>
```
