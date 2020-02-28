This component may be used to express currency. Provide a numeric value to the component along with an 
[ISO 4217 standard currency code](https://www.currency-iso.org/en/home.html), and the component will present the
monetary value automatically using the browser's locale. Focusing into the component allows the user to directly modify
the numeric value of the currency, while the component's unfocused state presents the formatted currency value held
within itself. 

```jsx
<CustomFieldInputCurrency
  placeholder="$123.00"
  label="US Dollars"
  id="us-dollars"
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

Errors can be classified as technical or contextual. The first example below is a technical error--cFa cannot be
separated below a single cFa. The second, on the other hand, is contextual--perhaps the backend denied the value
presented to it, responding with a specific message for the context of that specific currency value.

```jsx
<CustomFieldInputCurrency
  id="test-id-3"
  name="test-name-3"
  value={1.12}
  currencyCode="XAF"
  label="Internal Error State"
/>

<CustomFieldInputCurrency
  label="External Error State"
  id="test-id-4"
  name="test-name-4"
  value={3.50}
  currencyCode="USD"
  error
  helpText="What do you want from us monster!?"
/>
```
