import React, {
  createRef,
} from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Listbox from './listbox.jsx';
import ListOption from '../list-option/list-option.jsx';

describe('src/components/listbox/listbox', () => {
  const requiredProps = {
    labelledBy: 'test-label-id',
    refs: [],
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Listbox {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('accessibility', () => {
    beforeEach(() => {
      const refs = [createRef(), createRef()];

      render((
        <Listbox {...requiredProps} refs={refs}>
          {() => (<>
            <ListOption value="hello" ref={refs[0]}>Hello</ListOption>
            <ListOption value="hey" ref={refs[1]}>Hey</ListOption>
          </>)}
        </Listbox>
      ));
    });

    it('focuses on the item that is clicked', () => {
      userEvent.click(screen.getByText('Hey'));
      expect(screen.getByText('Hey')).toHaveFocus();

      userEvent.click(screen.getByText('Hello'));
      expect(screen.getByText('Hello')).toHaveFocus();
    });

    it('does not steal focus on render', () => {
      expect(screen.getByText('Hello')).not.toHaveFocus();
      expect(screen.getByText('Hey')).not.toHaveFocus();
    });

    it('only has the one option in the page tab sequence', () => {
      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(screen.getByText('Hello')).toHaveFocus();

      userEvent.tab();
      expect(screen.getByText('Hello')).not.toHaveFocus();
      expect(screen.getByText('Hey')).not.toHaveFocus();

      userEvent.tab({ shift: true });
      expect(screen.getByText('Hello')).toHaveFocus();
    });

    it('moves focus with arrows keys', () => {
      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(screen.getByText('Hello')).toHaveFocus();

      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expect(screen.getByText('Hey')).toHaveFocus();

      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expect(screen.getByText('Hey')).toHaveFocus();

      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      expect(screen.getByText('Hello')).toHaveFocus();

      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      expect(screen.getByText('Hello')).toHaveFocus();
    });

    it('moves focus with Home and End keys', () => {
      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(screen.getByText('Hello')).toHaveFocus();

      fireEvent.keyDown(document.activeElement, { key: 'End' });
      expect(screen.getByText('Hey')).toHaveFocus();

      fireEvent.keyDown(document.activeElement, { key: 'Home' });
      expect(screen.getByText('Hello')).toHaveFocus();
    });
  });

  describe('children API', () => {
    it('displays a list of things', () => {
      render((
        <Listbox {...requiredProps}>
          {() => (<>
            <ListOption value="hello">Hello</ListOption>
            <ListOption value="hey">Hey</ListOption>
          </>)}
        </Listbox>
      ));

      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(screen.getByText('Hey')).toBeInTheDocument();
    });
  });

  describe('className API', () => {
    it('allows setting the class name', () => {
      render((
        <Listbox {...requiredProps} className="prioritize-me">
          {() => (<>
            <ListOption value="hello">Hello</ListOption>
            <ListOption value="hey">Hey</ListOption>
          </>)}
        </Listbox>
      ));
      expect(screen.getByRole('listbox')).toHaveClass('prioritize-me');
    });
  });

  describe('focus ref API', () => {
    it('focuses the component', () => {
      const ref = createRef();
      const refs = [createRef(), createRef()];
      render((
        <Listbox {...requiredProps} ref={ref} refs={refs}>
          {() => (<>
            <ListOption value="hello" ref={refs[0]}>Hello</ListOption>
            <ListOption value="hey" ref={refs[1]}>Hey</ListOption>
          </>)}
        </Listbox>
      ));

      expect(screen.getByText('Hello')).not.toHaveFocus();
      act(() => ref.current.focus());
      expect(screen.getByText('Hello')).toHaveFocus();
    });
  });

  describe('labelledBy API', () => {
    it('can be set', () => {
      render((
        <React.Fragment>
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label id="unique-label-id">Label</label>
          <Listbox {...requiredProps} labelledBy="unique-label-id">
            {() => (<>
              <ListOption value="hello">Hello</ListOption>
              <ListOption value="hey">Hey</ListOption>
            </>)}
          </Listbox>
        </React.Fragment>
      ));

      expect(screen.getByLabelText('Label')).toBeInTheDocument();
    });
  });

  describe('onChange API', () => {
    it('is called with a new selection', () => {
      const ref = createRef();
      const refs = [createRef(), createRef()];
      const onChange = jest.fn();

      render((
        <Listbox {...requiredProps} ref={ref} refs={refs} onChange={onChange}>
          {({ onSelect }) => (<>
            <ListOption onSelect={onSelect} value="hello" ref={refs[0]}>Hello</ListOption>
            <ListOption onSelect={onSelect} value="hey" ref={refs[1]}>Hey</ListOption>
          </>)}
        </Listbox>
      ));

      userEvent.click(screen.getByText('Hey'));
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0][0]).toEqual({ target: expect.objectContaining({ value: 'hey' }) });
    });

    it('is called with a re-selection', () => {
      const ref = createRef();
      const refs = [createRef(), createRef()];
      const onChange = jest.fn();

      render((
        <Listbox {...requiredProps} ref={ref} refs={refs} onChange={onChange} value={refs[0]}>
          {({ onSelect }) => (<>
            <ListOption onSelect={onSelect} value="hello" ref={refs[0]}>Hello</ListOption>
            <ListOption onSelect={onSelect} value="hey" ref={refs[1]}>Hey</ListOption>
          </>)}
        </Listbox>
      ));

      userEvent.click(screen.getByText('Hello'));
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0][0]).toEqual({ target: expect.objectContaining({ value: 'hello' }) });
    });

    it('is not called on mount', () => {
      const onChange = jest.fn();

      render(<Listbox {...requiredProps} onChange={onChange} />);

      expect(onChange.mock.calls.length).toBe(0);
    });
  });

  describe('refs API', () => {
    it('does not freak out when current is undefined', () => {
      const refs = [{ current: undefined }];
      render(<Listbox {...requiredProps} refs={refs}>{() => <span tabIndex={-1}>foo</span>}</Listbox>);
      expect(() => userEvent.click(screen.getByText('foo'))).not.toThrow();
    });
  });

  describe('value API', () => {
    it('can be set', () => {
      const ref = createRef();
      render(<Listbox {...requiredProps} ref={ref} value="unique value" />);
      expect(ref.current.value).toEqual('unique value');
    });
  });

  describe('value ref API', () => {
    it('is set from value prop API', () => {
      const ref = createRef();
      render(<Listbox {...requiredProps} ref={ref} value="unique value" />);
      expect(ref.current.value).toEqual('unique value');
    });

    it('change on selection', () => {
      const ref = createRef();
      const refs = [createRef()];

      render((
        <Listbox {...requiredProps} ref={ref} refs={refs} value="unique value">
          {({ onSelect }) => (<>
            <ListOption onSelect={onSelect} value="hello" ref={refs[0]}>Hello</ListOption>
          </>)}
        </Listbox>
      ));

      userEvent.click(screen.getByText('Hello'));
      expect(ref.current.value).toEqual('hello');
    });
  });
});
