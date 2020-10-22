This component may be used to express currency. Provide a numeric value to the component along with an
[ISO 4217 standard currency code](https://www.currency-iso.org/en/home.html), and the component will present the
monetary value automatically using the browser's locale. Focusing into the component allows the user to directly modify
the numeric value of the currency, while the component's unfocused state presents the formatted currency value held
within itself.

```js
<CustomFieldInputCurrency
  placeholder="$123.00"
  label="US Dollars"
  id="us-dollars"
/>
```

```js
<CustomFieldInputCurrency
  placeholder="$123.00"
  label="US Dollars"
  id="us-dollars-1"
  value={0}
/>
```

```js
<CustomFieldInputCurrency
  label="Iraqi Dinar"
  currencyCode="IQD"
  id="iraqi-dinar"
  value={182211}
/>
```

```js
<CustomFieldInputCurrency
  label="Central African Francs"
  id="cFa"
  currencyCode="XAF"
  value={5200}
/>
```

```js
<CustomFieldInputCurrency
  readOnly
  id="test-id-2"
  name="test-name-2"
  value={123}
  label="Disabled /read-only field"
/>
```

Errors can be classified as technical or contextual. The first example below is a technical error--cFa cannot be
separated below a single cFa. The second, on the other hand, is contextual--perhaps the backend denied the value
presented to it, responding with a specific message for the context of that specific currency value.

```js
<CustomFieldInputCurrency
  id="test-id-3"
  name="test-name-3"
  value={112.5}
  currencyCode="XAF"
  label="Internal Error State"
/>
```

```js
<CustomFieldInputCurrency
  label="External Error State"
  id="test-id-4"
  name="test-name-4"
  value={350}
  currencyCode="USD"
  errorText="What do you want from us monster!?"
/>
```

### Ref usage:

The component uses `forwardRef` and `useImperativeHandle` to provide an API similar to the DOM native for determining their value.
Below is an example of this usage:

```jsx
import CustomFieldInputCurrency from '@mavenlink/design-system/src/components/custom-field-input-currency/custom-field-input-currency.jsx';

function TestComponent() {
  const ref = React.useRef();
  const [current, setCurrent] = React.useState({});

  const onChange = () => {
    setCurrent(ref.current);
  }

  return (
    <div onChange={onChange}>
      <CustomFieldInputCurrency
        currencyCode="USD"
        id="test-id-4"
        label="Example 4"
        ref={ref}
      />
      <ul>
        {Object.keys(current).map(key => (
          <li>{key}: {JSON.stringify(current[key])}</li>
        ))}
      </ul>
    </div>
  )
}

<TestComponent />
```
