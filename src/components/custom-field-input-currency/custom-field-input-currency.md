This component enters an error state if the input is invalid as a currency.

```jsx
<CustomFieldInputCurrency
  placeholder="$123"
/>
```
----
##### Disabled:
```jsx
<CustomFieldInputCurrency
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
<CustomFieldInputCurrency
  helpText="This input is bad."
  id="test-id-3"
  name="test-name-3"
  value="Text!"
/>
```
