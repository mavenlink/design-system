A simple date field for custom fields. Permits a variety of formats and allows custom validation.

##### Basic usage:

```jsx
const ref = React.createRef();
const onChange = function() { console.log(`
value: ${ref.current.value}
dirty: ${ref.current.dirty}
name: ${ref.current.name}
id: ${ref.current.id}`
)};

<CustomFieldInputDate
    id="my-birthday-1"
    label="Andre's Birthday"
    value="1992-05-10"
    name="custom-field-1"
    ref={ref}
    onChange={onChange}
/>
```

```js
<CustomFieldInputDate
    id="my-birthday-2"
    label="Greyson's Birthday"
    value="08/20/2020"
    name="custom-field-2"
/>
```

##### Disabled state:

```js
<CustomFieldInputDate
    id="my-birthday-4"
    label="Juanca's Birthday"
    value="03/03/1990"
    name="custom-field-3"
    disabled
/>
```


##### Error state:

```js
<CustomFieldInputDate
    id="my-birthday-4"
    label="Juanca's Birthday Error"
    value="03/03/1990"
    name="custom-field-4"
    errorText="Error help."
/>
```

##### Placeholder:

```js
<CustomFieldInputDate
    id="tbd-date-1"
    label="Pick a date!"
    name="date-tbd"
    placeholder="Please select a date"
/>
```
