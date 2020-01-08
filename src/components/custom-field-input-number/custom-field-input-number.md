This component enters an error state if the input is an invalid `float`.

```jsx
<CustomFieldInputNumber
  placeholder="123"
/>
```
----
##### Disabled:
```jsx
<CustomFieldInputNumber
  disabled={true}
  helpText="This input is disabled."
  id="test-id-2"
  name="test-name-2"
  value="123"
/>
```
----
##### Error:
```jsx
<CustomFieldInputNumber
  helpText="This input is bad."
  id="test-id-3"
  name="test-name-3"
  value="Text!"
/>
```
