import React from 'react';
import { shallow } from 'enzyme';
import Input from './input';

function render(props) {
  return shallow(<Input {...props} id="hi" />)
}

test('rendering', function () {
  const wrapper = render();
  expect(wrapper.type()).toEqual('input');
});

test('passing props through', function () {
  const wrapper = render({ className: 'hi', required: true });
  expect(wrapper.prop('className')).toEqual('hi');
  expect(wrapper.prop('required')).toEqual(true);
});
