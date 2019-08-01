import React from 'react';
import renderer from 'react-test-renderer';
import Input from './input.jsx';

describe('Input', () => {
  it('renders', () => {
    const props = { className: 'klass', required: true };
    const tree = renderer
      .create(<Input {...props} id="foo" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
