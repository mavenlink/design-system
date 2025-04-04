This component may be used to express currency. Provide a numeric value to the component along with an
[ISO 4217 standard currency code](https://www.currency-iso.org/en/home.html), and the component will present the
monetary value automatically using the browser's locale. Focusing into the component allows the user to directly modify
the numeric value of the currency, while the component's unfocused state presents the formatted currency value held
within itself.

```js
<MoneyInput
  placeholder="$123.00"
  label="US Dollars"
  name="example_name"
  id={uuid.v4()}
/>
```

```js
<MoneyInput
  placeholder="$123.00"
  label="US Dollars"
  id={uuid.v4()}
  name="example_name"
  value={0}
/>
```

```js
<MoneyInput
  label="Iraqi Dinar"
  currencyCode="IQD"
  id={uuid.v4()}
  name="example_name"
  value={182211}
/>
```

```js
<MoneyInput
  label="Central African Francs"
  id={uuid.v4()}
  currencyCode="XAF"
  name="example_name"
  value={5200}
/>
```

```js
<MoneyInput
  readOnly
  id={uuid.v4()}
  name="test-name-2"
  value={123}
  label="Disabled /read-only field"
/>
```

Errors can be classified as technical or contextual. The first example below is a technical error--cFa cannot be
separated below a single cFa. The second, on the other hand, is contextual--perhaps the backend denied the value
presented to it, responding with a specific message for the context of that specific currency value.

```js
<MoneyInput
  id={uuid.v4()}
  name="test-name-3"
  value={112.5}
  currencyCode="XAF"
  label="Internal Error State"
/>
```

```js
<MoneyInput
  label="External Error State"
  id={uuid.v4()}
  name="test-name-4"
  value={350}
  currencyCode="USD"
  validationMessage="What do you want from us monster!?"
/>
```

## Ref API Example
```jsx
import MoneyInput from '../../components/money-input/money-input.jsx';
import RefExample from '../../components/__site__/ref-example/ref-example.jsx';

const ref = React.createRef();

<RefExample ref={ref}>
  {({ onChange }) => (
    <MoneyInput id={uuid.v4()} ref={ref} onChange={onChange} label='Ref Example' name={'ref-ex'}  />
  )}
</RefExample>
```
