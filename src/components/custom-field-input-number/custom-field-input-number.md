The Custom Field Input Number component represents the UI for a custom field of type number from Mavenlink's API.
It has all the properties of the Custom Field Input Text component.
It also implements a similar validation to the custom field of type number from Mavenlink's API:
A valid number is either: a) positive whole number; b) negative whole number.
Otherwise, it is an invalid number and the component is in an invalid state.

```jsx
<CustomFieldInputNumber />
```
----
##### Disabled:
```jsx
<CustomFieldInputNumber
  disabled
  id="test-id-2"
  value="1337"
/>
```
----
##### Error:
```jsx
<CustomFieldInputNumber
  id="test-id-3"
  name="test-name-3"
  value="Text!"
/>
```
