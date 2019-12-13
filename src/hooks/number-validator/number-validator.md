`useNumberValidator` is a custom hook that allows you to validate number input in functional React components using consistent business logic.

Usage example:
# TODO: Figure out how to turn off parsing
```jsx
import React, { useState } from 'react';

import useNumberValidator from 'number-validator.jsx';

const [input, setInput] = useState('');
const valid = useNumberValidator(input);

<CustomFieldInputText
  onChange={event => setInput(event.target.value)}
  error={!valid}
/>
```

The above is similar to how the `CustomFieldInputNumber` component functions (which does use this custom hook), allowing the input to be parsed as a valid `Number`, and using the result to control the `error` state of the text input.