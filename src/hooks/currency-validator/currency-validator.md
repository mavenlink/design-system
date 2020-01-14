`useCurrencyValidator` is a custom hook that allows you to validate currency input in functional React components using consistent business logic.

Usage example:
```jsx
import React, { useState } from 'react';

import CustomFieldInputText from '../../components/custom-field-input-text/custom-field-input-text.jsx';
import useCurrencyValidator from './currency-validator.jsx';

function TestComponent () {
  const [input, setInput] = useState('');
  const valid = useCurrencyValidator(input);

  return (
    <CustomFieldInputText
      onChange={event => setInput(event.target.value)}
      error={!valid}
    />
  )
}

<TestComponent />
```

The above is similar to how the `CustomFieldInputCurrency` component functions (which does use this custom hook), allowing the input to be parsed as a valid `currency`, and using the result to control the `error` state of the text input.