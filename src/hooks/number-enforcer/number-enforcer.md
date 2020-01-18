`useNumberEnforcer` is a custom hook that allows you to validate number input in functional React components using consistent business logic.

Usage example:
```jsx
import React, { useState } from 'react';

import CustomFieldInputText from '../../components/custom-field-input-text/custom-field-input-text.jsx';
import useNumberEnforcer from './number-enforcer.jsx';

function TestComponent () {
  const [input, setInput] = useState('');
  const [target, setTarget] = useState({selectionStart: 0, selectionStart: 0, setSelectionRange: () => {}});
  const [oldSelectionStart, setOldSelectionStart] = useState(0)
  const [enforcedNumber, valid] = useNumberEnforcer(input, 'de-ID');

  return (
    <CustomFieldInputText
      onChange={(event) => {
        setOldSelectionStart(event.target.selectionStart);
        setTarget(event.target);

        setInput(event.target.value)
      }}
      value={(() => {
        let caretStart = oldSelectionStart;
        let caretEnd = oldSelectionStart;

        target.setSelectionRange(caretStart, caretEnd);

        return enforcedNumber; 
        })()}
      error={!valid}
    />
  )
}

<TestComponent />
```

The above is similar to how the `CustomFieldInputNumber` component functions (which does use this custom hook), allowing the input to be parsed as a valid `Number`, and using the result to control the `error` state of the text input.