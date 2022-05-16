import React, { createRef } from 'react';
import { render as _render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('alerts when user focuses into the cell', () => {
    const onFocus = jest.fn(event => event.persist());
    render(<Number onChange={() => {}} value={1} {...requiredProps} onFocus={onFocus} />);

    userEvent.click(within(screen.queryByLabelText('Column Header')).getByDisplayValue('1'));

    expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({ type: 'focus' }));
  });

  it('alerts when user moves focus out of the cell', () => {
    const onBlur = jest.fn(event => event.persist());
    render(<Number onChange={() => {}} value={1} {...requiredProps} onBlur={onBlur} />);

    userEvent.click(within(screen.queryByLabelText('Column Header')).getByDisplayValue('1'));
    userEvent.tab();

    expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({ type: 'blur' }));
  });
});
