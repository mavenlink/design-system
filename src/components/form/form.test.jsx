import React, { createRef } from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './form.jsx';

describe('<Form />', () => {
  const requiredProps = {
    children: () => {},
    refs: [],
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Form {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('onSubmit prop API', () => {
    it('is called', () => {
      const onSubmitSpy = jest.fn();
      const ref = createRef();
      const refs = [
        createRef(),
      ];

      render((
        <Form onSubmit={onSubmitSpy} ref={ref} refs={refs}>
          {() => (
            <input aria-label="input test 1" name="input-test-1" ref={refs[0]} />
          )}
        </Form>
      ));

      userEvent.type(screen.getByLabelText('input test 1'), 'unique value');
      userEvent.click(screen.getByText('Save'));
      expect(onSubmitSpy).toHaveBeenCalledWith({
        data: {
          'input-test-1': refs[0].current,
        },
        target: ref.current,
      });
    });
  });

  describe('readOnly prop API', () => {
    it('can be set', () => {
      render(<Form {...requiredProps} readOnly={true} />);
      expect(screen.queryByText('Save')).not.toBeInTheDocument();
    });

    it('can be unset', () => {
      render(<Form {...requiredProps} readOnly={false} />);
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });

  describe('refs prop API', () => { /* Tested in usages */ });
});
