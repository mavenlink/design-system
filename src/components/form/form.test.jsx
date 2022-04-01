import React, { createRef } from 'react';
import {
  render,
  screen,
  waitFor,
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

  describe('autoSave prop API', () => {
    xit('can be set', async () => {
      const onSubmitSpy = jest.fn();
      const ref = createRef();
      const refs = [
        createRef(),
      ];

      render((
        <Form autoSave={true} onSubmit={onSubmitSpy} ref={ref} refs={refs}>
          {() => (
            <input aria-label="input test 1" name="input-test-1" ref={refs[0]} />
          )}
        </Form>
      ));

      expect(screen.queryByText('Save')).not.toBeInTheDocument();
      await userEvent.type(screen.getByLabelText('input test 1'), 'unique value', { delay: 200 });
      await userEvent.type(screen.getByLabelText('input test 1'), '!', { delay: 300 });
      await waitFor(() => expect(onSubmitSpy.mock.calls.length).toBe(13));
      expect(onSubmitSpy).toHaveBeenCalledWith({
        data: {
          'input-test-1': refs[0].current,
        },
        target: ref.current,
      });
    });

    it('can be unset', () => {
      const onSubmitSpy = jest.fn();
      const ref = createRef();
      const refs = [
        createRef(),
      ];

      render((
        <Form autoSave={false} onSubmit={onSubmitSpy} ref={ref} refs={refs}>
          {() => (
            <input aria-label="input test 1" name="input-test-1" ref={refs[0]} />
          )}
        </Form>
      ));

      userEvent.type(screen.getByLabelText('input test 1'), 'unique value');
      expect(onSubmitSpy).not.toHaveBeenCalled();

      expect(screen.queryByText('Save')).toBeInTheDocument();
      userEvent.click(screen.getByText('Save'));
      expect(onSubmitSpy).toHaveBeenCalledWith({
        data: {
          'input-test-1': refs[0].current,
        },
        redirect: true,
        target: ref.current,
      });
    });
  });

  describe('buttonContainerClassName API', () => {
    it('accepts a buttonContainerClassName', () => {
      const className = 'foo-bar';
      render(<Form {...requiredProps} submitText="YOLO SWAG" buttonContainerClassName={className} />);
      expect(screen.getByText('YOLO SWAG').parentElement).toHaveClass('foo-bar');
    });
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
              <input aria-label="required input" ref={refs[0]} required />
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

  describe('className API', () => {
    it('is set', () => {
      render(<Form {...requiredProps} className="unique-class-name" />);
      expect(document.querySelector('.unique-class-name')).toBeInTheDocument();
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
        redirect: true,
        target: ref.current,
      });
    });

    it('is called with redirect: false when add another is clicked', () => {
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
      userEvent.click(screen.getByText('Save & Add Another'));
      expect(onSubmitSpy).toHaveBeenCalledWith({
        data: {
          'input-test-1': refs[0].current,
        },
        redirect: false,
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

  describe('submitText API', () => {
    it('can be set', () => {
      render(<Form {...requiredProps} submitText="YOLO SWAG" />);
      expect(screen.getByText('YOLO SWAG').type).toEqual('submit');
    });
  });

  describe('Save & Add Another button', () => {
    it('is shown by default', () => {
      render(<Form {...requiredProps} />);
      expect(screen.getByText('Save & Add Another')).toBeInTheDocument();
    });

    it('can be hidden when hideSaveAndAddAnother is true', () => {
      render(<Form {...requiredProps} hideSaveAndAddAnother />);
      expect(screen.queryByText('Save & Add Another')).not.toBeInTheDocument();
    });
  });

  describe('save button', () => {
    it('is enables/disables on changes', () => {
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

      expect(screen.getByText('Save')).toBeDisabled();
      userEvent.type(screen.getByLabelText('input test 2'), 'abc');
      expect(screen.getByText('Save')).toBeEnabled();
      userEvent.type(screen.getByLabelText('input test 2'), '{backspace}{backspace}{backspace}');
      expect(screen.getByText('Save')).toBeDisabled();
    });

    it('is enables/disables on validity changes', () => {
      const refs = [
        createRef(),
        createRef(),
      ];

      render((
        <Form refs={refs}>
          {() => (
            <React.Fragment>
              <input aria-label="required input" ref={refs[0]} required />
              <input aria-label="3-digit area code" ref={refs[1]} pattern="[0-9]{3}" />
            </React.Fragment>
          )}
        </Form>
      ));

      expect(screen.getByText('Save')).toBeDisabled();
      userEvent.type(screen.getByLabelText('required input'), 'abc');
      expect(screen.getByText('Save')).toBeEnabled();
      userEvent.type(screen.getByLabelText('3-digit area code'), '1');
      expect(screen.getByText('Save')).toBeDisabled();
      userEvent.type(screen.getByLabelText('3-digit area code'), '23');
      expect(screen.getByText('Save')).toBeEnabled();
    });

    it('is enables/disables on validity re-renders', () => {
      const refs = [
        createRef(),
      ];

      const { rerender } = render((
        <Form refs={refs}>
          {() => (
            <React.Fragment>
              <input aria-label="3-digit area code" ref={refs[1]} pattern="[0-9]{3}" />
            </React.Fragment>
          )}
        </Form>
      ));
      userEvent.type(screen.getByLabelText('3-digit area code'), '23');
      expect(screen.getByText('Save')).toBeDisabled();

      rerender((
        <Form refs={refs}>
          {() => (
            <React.Fragment>
              <input aria-label="3-digit area code" ref={refs[0]} pattern="[0-9]{2}" />
            </React.Fragment>
          )}
        </Form>
      ));
      expect(screen.getByText('Save')).toBeEnabled();
    });
  });
});
