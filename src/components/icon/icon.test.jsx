import React from 'react';
import renderer from 'react-test-renderer';
import Icon from './icon';

describe('Icon', () => {
  it('has defaults', () => {
    const tree = renderer.create((
      <Icon name={'foobar'} />
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
