import React, { createRef } from 'react';
import { render as _render, screen } from '@testing-library/react';
import Select from './select.jsx';
import ListOption from '../list-option/list-option.jsx';

const baseListOptions = ['foo', 'bar'];
const baseListOptionRefs = baseListOptions.map(() => createRef());
const baseListOptionElements = ({ onSelect }) => baseListOptions.map((option, index) => (
  <ListOption key={option} onSelect={onSelect} ref={baseListOptionRefs[index]} value={option}>
    {option}
  </ListOption>
));

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

describe('Select cell control', () => {
  const requiredProps = {
    id: 'test-id',
    labelledBy: 'labelled-by',
    listOptionRefs: [],
    name: 'test-name',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Select {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(document.body).toBe(document.activeElement);
    expect(ref.current).toMatchSnapshot();
  });

  it('className API', () => {
    render(<Select {...requiredProps} className="unique-class-name" />);
    expect(document.body).toMatchSnapshot();
  });

  it('accepts a value', () => {
    const value = 'foo';
    render(<Select {...requiredProps} value={value}>{baseListOptionElements}</Select>);
    expect(screen.getByRole('combobox')).toHaveValue('foo');
  });
});
