/* eslint-disable react/prop-types, jsx-a11y/no-static-element-interactions */

import React, {
  forwardRef,
  useEffect,
  useState,
} from 'react';

const RefExample = forwardRef(function RefExample(props, ref) {
  const [, setRerender] = useState(0);
  const refKeys = Object.keys(ref.current || {});

  function rerender() {
    setRerender(state => state + 1);
  }

  function onChange() {
    rerender();
  }

  useEffect(rerender, []);

  return (
    <div onClick={onChange} onFocus={onChange} onKeyDown={onChange} onKeyUp={onChange}>
      {props.children({ onChange })}
      <table>
        <thead>
          <tr>
            {refKeys.map(key => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            {refKeys.map(key => <td key={key}>{JSON.stringify(ref.current[key])}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default RefExample;
