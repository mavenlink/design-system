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
  name="birthday[greyson]"
  value="2020-08-20"
/>
```

```js
import CustomFieldInputDate from '@mavenlink/design-system/src/components/custom-field-input-date/custom-field-input-date.jsx';

<CustomFieldInputDate
  id="independence-day"
  label="The Fourth"
  name="independence_day"
  readOnly
  value="1776-07-04"
/>
```

```js
import CustomFieldInputDate from '@mavenlink/design-system/src/components/custom-field-input-date/custom-field-input-date.jsx';

<CustomFieldInputDate
  errorText="Not Juanca's birthday."
  id="my-birthday-4"
  label="Juanca's Birthday"
  name="birthday[juanca]"
  value="1990-03-04"
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
      name="birthday[andre]"
      onChange={onChange}
      ref={ref}
      value="1992-05-10"
    />
  )}
</RefExample>
```
