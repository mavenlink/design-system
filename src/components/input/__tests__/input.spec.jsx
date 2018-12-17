import React from 'react';
import Input from '../input';
import { createWrapper, findByType, getProp } from '../../../test-utils';

function render(props) {
  return createWrapper(<Input {...props} id="hi" />);
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
