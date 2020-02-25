This component enters an error state if the input is invalid as a currency.

```jsx
<CustomFieldInputCurrency
  placeholder="$123"
  label="US Dollars"
  id="us-dollars"
  value={15.22}
/>

<CustomFieldInputCurrency
  label="Iraqi Dinar"
  currencyCode="IQD"
  id="iraqi-dinar"
  value={182.211}
/>

<CustomFieldInputCurrency
  label="Central African Francs"
  id="cFa"
  currencyCode="XAF"
  value={5200}
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
  value={123}
  label="money"
/>
```
----
##### Error:
```jsx
<CustomFieldInputCurrency
  id="test-id-3"
  name="test-name-3"
  value={500}
  currencyCode="XAF"
  label="money"
/>
```
