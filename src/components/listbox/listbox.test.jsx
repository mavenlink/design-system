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
import renderer from 'react-test-renderer';
import Listbox from './listbox.jsx';
import ListOption from '../list-option/list-option.jsx';

describe('src/components/listbox/listbox', () => {
  const requiredProps = {
    labelledBy: 'test-label-id',
    refs: [],
  };

  it('has defaults', () => {
    const tree = renderer.create(<Listbox {...requiredProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('accessibility', () => {
    beforeEach(() => {
      const refs = [createRef(), createRef()];

      render((
        <Listbox {...requiredProps} refs={refs}>
          <ListOption value="hello" ref={refs[0]}>Hello</ListOption>
          <ListOption value="hey" ref={refs[1]}>Hey</ListOption>
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

      act(() => userEvent.tab());
      expect(screen.getByText('Hello')).toHaveFocus();

      act(() => userEvent.tab());
      expect(screen.getByText('Hello')).not.toHaveFocus();
      expect(screen.getByText('Hey')).not.toHaveFocus();

      act(() => userEvent.tab({ shift: true }));
      expect(screen.getByText('Hello')).toHaveFocus();
    });

    it('moves focus with arrows keys', () => {
      expect(document.body).toHaveFocus();

      act(() => userEvent.tab());
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

      act(() => userEvent.tab());
      expect(screen.getByText('Hello')).toHaveFocus();

      fireEvent.keyDown(document.activeElement, { key: 'End' });
      expect(screen.getByText('Hey')).toHaveFocus();

      fireEvent.keyDown(document.activeElement, { key: 'Home' });
      expect(screen.getByText('Hello')).toHaveFocus();
    });

    describe('selection', () => {
      it('selects the item that is clicked', () => {
        userEvent.click(screen.getByText('Hey'));
        expect(screen.getByText('Hey')).toHaveAttribute('aria-selected', 'true');
      });

      it('select the item focused when the enter key is pressed', () => {
        act(() => userEvent.tab());
        act(() => { fireEvent.keyDown(document.activeElement, { key: 'Enter' }); });
        expect(screen.getByText('Hello')).toHaveAttribute('aria-selected', 'true');
      });
    });
  });

  describe('children API', () => {
    it('displays a list of things', () => {
      render((
        <Listbox {...requiredProps}>
          <ListOption value="hello">Hello</ListOption>
          <ListOption value="hey">Hey</ListOption>
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
          <ListOption value="hello">Hello</ListOption>
          <ListOption value="hey">Hey</ListOption>
        </Listbox>
      ));
      expect(screen.getByRole('listbox')).toHaveClass('prioritize-me');
    });
  });

  describe('labelledBy API', () => {
    it('can be set', () => {
      render((
        <React.Fragment>
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label id="unique-label-id">Label</label>
          <Listbox {...requiredProps} labelledBy="unique-label-id">
            <ListOption value="hello">Hello</ListOption>
            <ListOption value="hey">Hey</ListOption>
          </Listbox>
        </React.Fragment>
      ));

      expect(screen.getByLabelText('Label')).toBeInTheDocument();
    });
  });

  describe('onSelectionChange API', () => {
    it('informs when a selection is made', () => {
      const refs = [createRef(), createRef()];
      const onSelectionChange = jest.fn();

      render((
        <Listbox {...requiredProps} refs={refs} onSelectionChange={onSelectionChange}>
          <ListOption value="hello" ref={refs[0]}>Hello</ListOption>
          <ListOption dataId="hey" value="hey" ref={refs[1]}>Hey</ListOption>
        </Listbox>
      ));

      userEvent.click(screen.getByText('Hey'));
      expect(onSelectionChange.mock.calls.length).toBe(1);
      expect(onSelectionChange.mock.calls[0][0]).toMatchObject({ id: 'hey', label: 'hey' });
    });
  });

  describe('refs API', () => {
    it('does not freak out when current is undefined', () => {
      const refs = [{ current: undefined }];
      render(<Listbox {...requiredProps} refs={refs}><span tabIndex={-1}>foo</span></Listbox>);
      expect(() => userEvent.click(screen.getByText('foo'))).not.toThrow();
    });
  });

  describe('selectionLimit API', () => {
    it('allows all things to be selected on 0', () => {
      const refs = [createRef(), createRef()];

      render((
        <Listbox {...requiredProps} refs={refs} selectionLimit={0}>
          <ListOption value="hello" ref={refs[0]}>Hello</ListOption>
          <ListOption value="hey" ref={refs[1]}>Hey</ListOption>
        </Listbox>
      ));

      userEvent.click(screen.getByText('Hello'));
      expect(document.activeElement).toHaveAttribute('aria-selected', 'true');

      userEvent.click(screen.getByText('Hey'));
      expect(document.activeElement).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Hello')).toHaveAttribute('aria-selected', 'true');
    });

    it('can be set to 1', () => {
      const refs = [createRef(), createRef()];

      render((
        <Listbox {...requiredProps} refs={refs} selectionLimit={1}>
          <ListOption value="hello" ref={refs[0]}>Hello</ListOption>
          <ListOption value="hey" ref={refs[1]}>Hey</ListOption>
        </Listbox>
      ));

      userEvent.click(screen.getByText('Hello'));
      expect(document.activeElement).toHaveAttribute('aria-selected', 'true');

      userEvent.click(screen.getByText('Hey'));
      expect(document.activeElement).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Hello')).toHaveAttribute('aria-selected', 'false');
    });
  });
});
