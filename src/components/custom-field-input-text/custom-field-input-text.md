```jsx
<CustomFieldInputText
  helpText="This is help text!"
  id="test-id-1"
  name="test-name-1"
  placeholder="This is a placeholder value"
  required={true}
/>
```
----
##### Disabled:
```jsx
<CustomFieldInputText
  disabled={true}
  helpText="This input is disabled."
  id="test-id-2"
  name="test-name-2"
  value="This value cannot be changed"
/>
```
----
##### Error:
```jsx
<CustomFieldInputText
  error={true}
  helpText="This input is bad."
  id="test-id-3"
  name="test-name-3"
  value="For some reason, this input doesn't pass validation @@1112#&&&&!@*&!&@!"
/>
```