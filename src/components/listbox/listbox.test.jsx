import React, {
  createRef,
} from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Listbox from './listbox.jsx';
import ListOption from '../list-option/list-option.jsx';

describe('src/components/listbox/listbox', () => {
  const requiredProps = {
    refs: [],
  };

  it('has defaults', () => {
    const tree = renderer.create(<Listbox {...requiredProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays a list of things', () => {
    render((
      <Listbox {...requiredProps}>
        <ListOption key="yeah">Hello</ListOption>
        <ListOption key="yeah2">Hey</ListOption>
      </Listbox>
    ));

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hey')).toBeInTheDocument();
  });

  describe('accessibility', () => {
    beforeEach(() => {
      const refs = [createRef(), createRef()];

      // TODO(Update @testing-library/user-event)
      // - Update user-event lib when https://github.com/testing-library/user-event/issues/365 is merged
      // - Remove random button in the following render
      render((
        <Listbox {...requiredProps} refs={refs}>
          <ListOption ref={refs[0]}>Hello</ListOption>
          <ListOption ref={refs[1]}>Hey</ListOption>
          <button />
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
  });
});
