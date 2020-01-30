The Custom Field Input Number component represents the UI for a custom field of type number from Mavenlink's API.
It has all the properties of the Custom Field Input Text component.
It also implements a similar validation to the custom field of type number from Mavenlink's API:
A valid number is either: a) positive whole number; b) negative whole number.
Otherwise, it is an invalid number and the component is in an invalid state.

```jsx
<CustomFieldInputNumber
  id="test-id-1"
  label="Example 1"
/>
```
----
##### Disabled:
```jsx
<CustomFieldInputNumber
  disabled
  id="test-id-2"
  label="Example 2"
  value="1337"
/>
```
----
##### Error:
```jsx
<CustomFieldInputNumber
  id="test-id-3"
  label="Example 3"
  value="Text!"
/>
```
