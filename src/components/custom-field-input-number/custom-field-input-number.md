The Custom Field Input Number component represents the UI for a custom field of type number from Mavenlink's API.
It has all the properties of the Custom Field Input Text component.
It also implements a similar validation to the custom field of type number from Mavenlink's API:
A valid number is either: a) positive whole number; b) negative whole number.
Otherwise, it is an invalid number and the component is in an invalid state.

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
