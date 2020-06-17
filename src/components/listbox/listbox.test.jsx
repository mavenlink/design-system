import React from 'react';
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
    it('focuses on the item that is clicked', () => {
      render((
        <Listbox {...requiredProps}>
          <ListOption key="yeah">Hello</ListOption>
          <ListOption key="yeah2">Hey</ListOption>
        </Listbox>
      ));

      userEvent.click(screen.getByText('Hey'));
      expect(screen.getByText('Hey')).toHaveFocus();

      userEvent.click(screen.getByText('Hello'));
      expect(screen.getByText('Hello')).toHaveFocus();
    });
  });
});
