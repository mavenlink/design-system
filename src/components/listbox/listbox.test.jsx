import React, { createRef } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
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

  describe('focus interaction', () => {
    describe('when no option is selected', () => {
      it('focuses on the first item', () => {
        const refs = [createRef(), createRef()];

        render((
          <Listbox {...requiredProps} refs={refs}>
            <ListOption key="yeah" ref={refs[0]}>Hello</ListOption>
            <ListOption key="yeah2" ref={refs[1]}>Hey</ListOption>
          </Listbox>
        ));
        fireEvent.focus(screen.getByRole('listbox'));

        expect(screen.getByText('Hello')).toHaveFocus();
      });
    });
  });
});
