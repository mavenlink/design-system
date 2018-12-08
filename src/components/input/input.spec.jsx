import React from 'react';
import TestRenderer from 'react-test-renderer';
import Input from './input';
import { findByType, getProp } from '../../test-utils';

function render(props) {
  return TestRenderer.create(<Input {...props} id="hi" />);
}

test('rendering', () => {
  const wrapper = render();
  const component = findByType(wrapper, 'input');
  expect(getProp(component, 'id')).toEqual('hi');
});

test('passing props through', () => {
  const wrapper = render({ className: 'hello', required: true });
  const component = findByType(wrapper, 'input');
  expect(getProp(component, 'className')).toEqual('hello');
  expect(getProp(component, 'required')).toEqual(true);
});
