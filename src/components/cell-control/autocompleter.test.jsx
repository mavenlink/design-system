import React, { createRef } from 'react';
import { render as _render } from '@testing-library/react';
import Autocompleter from './autocompleter.jsx';

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

describe('Autocompleter cell control', () => {
  const requiredProps = {
    id: 'test-id',
    labelledBy: 'labelled-by',
    name: 'test-name',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Autocompleter {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(document.body).toBe(document.activeElement);
    expect(ref.current).toMatchSnapshot();
  });

  describe('className API', () => {
    it('can be set', () => {
      render(<Autocompleter {...requiredProps} className="unique-class-name" />);
      expect(document.body).toMatchSnapshot();
    });
  });
});
