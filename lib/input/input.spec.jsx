import React from 'react';
import TestRenderer from 'react-test-renderer';
import Input from './input';

function render(props) {
  return TestRenderer.create(<Input {...props} id="hi" />);
}

test('rendering', () => {
  const tree = render();
  expect(tree).toMatchSnapshot();
});

test('passing props through', () => {
  const tree = render({ className: 'hi', required: true });
  expect(tree).toMatchSnapshot();
});
