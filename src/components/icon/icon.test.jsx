import React from 'react';
import renderer from 'react-test-renderer';
import Icon from './icon';

describe('Icon', () => {
  it('has defaults', () => {
    const tree = renderer.create((
      <Icon />
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
