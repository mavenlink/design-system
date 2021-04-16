A form control to be specifically used for custom field date types. 
It composes the MDS Date component.

## Props API Examples

```js
import CustomFieldInputDate from '@mavenlink/design-system/src/components/custom-field-input-date/custom-field-input-date.jsx';

<CustomFieldInputDate
  id="tbd-date-1"
  label="Pick a date!"
  name="date-tbd"
  placeholder="Please select a date"
/>
```

```js
import CustomFieldInputDate from '@mavenlink/design-system/src/components/custom-field-input-date/custom-field-input-date.jsx';

<CustomFieldInputDate
    id="my-birthday-2"
    label="Greyson's Birthday"
    value="2020-08-20"
    name="birthday[greyson]"
/>
```

```js
import CustomFieldInputDate from '@mavenlink/design-system/src/components/custom-field-input-date/custom-field-input-date.jsx';

<CustomFieldInputDate
    id="independence-day"
    label="The Fourth"
    value="1776-07-04"
    name="independence_day"
    readOnly
/>
```

```js
import CustomFieldInputDate from '@mavenlink/design-system/src/components/custom-field-input-date/custom-field-input-date.jsx';

<CustomFieldInputDate
    id="my-birthday-4"
    label="Juanca's Birthday"
    value="1990-03-04"
    name="birthday[juanca]"
    errorText="Not Juanca's birthday."
/>
```

## Ref API Example

```jsx
import CustomFieldInputDate from '@mavenlink/design-system/src/components/custom-field-input-date/custom-field-input-date.jsx';
import RefExample from '@mavenlink/design-system/src/components/ref-example/ref-example.jsx';

const ref = React.createRef();

<RefExample ref={ref}>
  {({ onChange }) => (
    <CustomFieldInputDate
      id="my-birthday-1"
      label="Andre's Birthday"
      value="1992-05-10"
      name="birthday[andre]"
      ref={ref}
      onChange={onChange}
    />
  )}
</RefExample>
```
