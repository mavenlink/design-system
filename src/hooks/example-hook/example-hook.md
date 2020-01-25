Example hook to showcase how to document a hook in Styleguidist.
Do not forget to write tests!

Usage example:
```jsx
import React from 'react';

import useExampleHook from './example-hook.jsx';

function TestComponent(props) {
  const [value, setValue] = useExampleHook(props.value);

  function handleOnChange(event) {
    setValue(event.target.value);
  }

  return (
    <input
      onChange={handleOnChange}
      value={value}
    />
  )
}

<TestComponent />
```
