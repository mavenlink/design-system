import React, { createRef } from 'react';
import { render as _render } from '@testing-library/react';
import Textarea from './textarea.jsx';

const render = (ui, options = { labelledBy: 'labelled-by' }) => (
  _render(ui, {
    ...options,
    wrapper: props => (
      <table>
        <thead>
          <tr>
            <th id={options.labelledBy}>Column Header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {props.children}
          </tr>
        </tbody>
      </table>
    ),
  })
);

describe('Textarea cell control', () => {
  const requiredProps = {
    labelledBy: 'labelled-by',
    id: 'test-id',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Textarea {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });
});
