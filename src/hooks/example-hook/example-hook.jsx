import React, { useState } from 'react';

// This exists to satisfy Styleguidist, don't use it!
export function ExampleHook() {
  return (
    <div />
  );
}

export default function useExampleHook(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  return [value, setValue];
}
