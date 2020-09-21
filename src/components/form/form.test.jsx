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

  describe('checkValidity ref API', () => {
    it('checks for some invalid control', () => {
      const ref = createRef();
      const refs = [
        createRef(),
        createRef(),
      ];

      render((
        <Form ref={ref} refs={refs}>
          {() => (
            <React.Fragment>
              <input aria-label="required input" ref={refs[0]} required/>
              <input aria-label="3-digit area code" ref={refs[1]} pattern="[0-9]{3}" />
            </React.Fragment>
          )}
        </Form>
      ));

      expect(ref.current.checkValidity()).toEqual(false);
      userEvent.type(screen.getByLabelText('required input'), 'abc');
      expect(ref.current.checkValidity()).toEqual(true);
      userEvent.type(screen.getByLabelText('3-digit area code'), '1');
      expect(ref.current.checkValidity()).toEqual(false);
      userEvent.type(screen.getByLabelText('3-digit area code'), '23');
      expect(ref.current.checkValidity()).toEqual(true);
    });
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
      const onChangeSpy = jest.fn(event => event.persist());
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

  describe('refs prop API', () => { /* Tested in usages */ });

  describe('save button', () => {
    it('is enables/disables on changes', () => {
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

      expect(screen.getByText('Save')).toBeDisabled();
      userEvent.type(screen.getByLabelText('input test 2'), 'abc');
      expect(screen.getByText('Save')).toBeEnabled();
      userEvent.type(screen.getByLabelText('input test 2'), '{backspace}{backspace}{backspace}');
      expect(screen.getByText('Save')).toBeDisabled();
    });
  });
});
