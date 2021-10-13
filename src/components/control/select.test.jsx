import React, { createRef } from 'react';
import {
  render as _render,
  screen,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import Select from './select.jsx';

const render = (ui, options = { labelledBy: 'labelled-by' }) => (
  _render(ui, {
    ...options,
    wrapper: props => (
      <>
        <label htmlFor="test-id" id="test-label-id">Test label</label>
        {props.children}
      </>
    ),
  })
);
describe('src/components/control/select', () => {
  const requiredProps = {
    id: 'test-id',
    labelledBy: 'test-label-id',
    listOptionRefs: [],
    name: 'field-id',
    wrapperRef: null,
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Select {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
    expect(document.activeElement).toBe(document.body);
    user.click(screen.getByLabelText('Test label'));
    expect(document.body).toMatchSnapshot();
  });
});
