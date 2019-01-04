import React from 'react';
import { shallow } from 'enzyme';
import Input from './input';

function render(props) {
  return shallow(<Input {...props} id="hi" />);
}

test('rendering', () => {
  const wrapper = render();
  expect(wrapper.find('input').prop('id')).toEqual('hi');
});

test('passing props through', () => {
  const wrapper = render({ className: 'hello', required: true });
  expect(wrapper.find('input').prop('className')).toEqual('hello');
  expect(wrapper.find('input').prop('required')).toEqual(true);
});
