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
    const selections = ['Hello', 'Hey', 'How are you?'];
    const { getByText } = renderComponent({ selections });

    expect(getByText('Hello')).toBeTruthy();
    expect(getByText('Hey')).toBeTruthy();
    expect(getByText('How are you?')).toBeTruthy();
  });
});
