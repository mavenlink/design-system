import React, { createRef } from 'react';
import { render as _render } from '@testing-library/react';
import Number from './number.jsx';

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

describe('Number cell control', () => {
  const requiredProps = {
    id: 'test-id',
    labelledBy: 'labelled-by',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Number {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(document.body).toBe(document.activeElement);
    expect(ref.current).toMatchSnapshot();
  });
});
