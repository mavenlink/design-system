import React from 'react';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Listbox from './listbox.jsx';

describe('src/components/listbox/listbox', () => {
  const renderComponent = (props = {}) => render(<Listbox {...props} />);

  afterEach(cleanup);

  it('has defaults', () => {
    const tree = renderer.create(<Listbox />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays a list of things', () => {
    const { getByText } = renderComponent({ children: <span>Hello</span> });

    expect(getByText('Hello')).toBeTruthy();
  });
});
