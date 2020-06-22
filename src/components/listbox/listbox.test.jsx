import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Listbox from './listbox.jsx';
import ListOption from '../list-option/list-option.jsx';

describe('src/components/listbox/listbox', () => {
  const renderComponent = (props = {}) => render(<Listbox {...props} />);

  it('has defaults', () => {
    const tree = renderer.create(<Listbox />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays a list of things', () => {
    const children = [<ListOption key="yeah">Hello</ListOption>, <ListOption key="yeah2">Hey</ListOption>];
    renderComponent({ children });

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hey')).toBeInTheDocument();
  });
});
