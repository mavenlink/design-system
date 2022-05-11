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
    const onEnterCell = jest.fn();
    render(<Number onChange={() => {}} value={1} {...requiredProps} onEnterCell={onEnterCell} />);

    userEvent.click(within(screen.queryByLabelText('Column Header')).getByDisplayValue('1'));

    expect(onEnterCell).toHaveBeenCalledWith('1');
  });

  it('alerts when user moves focus out of the cell', () => {
    const onExitCell = jest.fn();
    render(<Number onChange={() => {}} value={1} {...requiredProps} onExitCell={onExitCell} />);

    userEvent.click(within(screen.queryByLabelText('Column Header')).getByDisplayValue('1'));
    userEvent.tab();

    expect(onExitCell).toHaveBeenCalledWith('1');
  });
});
