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

  describe('children prop API', () => {
    it('can be set', () => {
      const refs = [
        createRef(),
        createRef(),
      ];

      render((
        <Form refs={refs}>
          {() => (
            <React.Fragment>
              <input aria-label="input test 1" ref={refs[0]} />
              <input aria-label="input test 2" ref={refs[1]} />
            </React.Fragment>
          )}
        </Form>
      ));

      expect(screen.getByLabelText('input test 1')).toEqual(refs[0].current);
      expect(screen.getByLabelText('input test 2')).toEqual(refs[1].current);
    });
  });

  describe('dirty ref API', () => {
    it('checks for some dirty control', () => {
      const ref = createRef();
      const refs = [
        createRef(),
        createRef(),
      ];

      render((
        <Form ref={ref} refs={refs}>
          {() => (
            <React.Fragment>
              <input aria-label="input test 1" ref={refs[0]} />
              <input aria-label="input test 2" ref={refs[1]} />
            </React.Fragment>
          )}
        </Form>
      ));

      expect(ref.current.dirty).toEqual(false);
      userEvent.type(screen.getByLabelText('input test 2'), 'abc');
      expect(ref.current.dirty).toEqual(true);
      userEvent.type(screen.getByLabelText('input test 2'), '{backspace}{backspace}{backspace}');
      expect(ref.current.dirty).toEqual(false);
    });
  });

  describe('onChange prop API', () => {
    it('is called', () => {
      const onChangeSpy = jest.fn((event) => event.persist());
      const refs = [
        createRef(),
      ];

      render((
        <Form onChange={onChangeSpy} refs={refs}>
          {() => (
            <input aria-label="input test 1" name="input-test-1" ref={refs[0]} />
          )}
        </Form>
      ));

      userEvent.type(screen.getByLabelText('input test 1'), 'unique value');
      expect(onChangeSpy).toHaveBeenCalledWith(expect.objectContaining({
        target: refs[0].current,
      }));
    });
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

  describe('ref prop API', () => { /* Tested in usages */ })

  describe('refs prop API', () => { /* Tested in usages */ });
});
