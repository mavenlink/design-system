`useNumberValidator` is a custom hook that allows you to validate number input in functional React components using consistent business logic.

Usage example:
```jsx
import React, { useState } from 'react';

import CustomFieldInputText from '../../components/custom-field-input-text/custom-field-input-text.jsx';
import useNumberValidator from './number-validator.jsx';

function TestComponent () {
  const [input, setInput] = useState('');
  const valid = useNumberValidator(input);

  return (
    <CustomFieldInputText
      onChange={event => setInput(event.target.value)}
      error={!valid}
    />
  )
}

<TestComponent />
```

The above is similar to how the `CustomFieldInputNumber` component functions (which does use this custom hook), allowing the input to be parsed as a valid `Number`, and using the result to control the `error` state of the text input.