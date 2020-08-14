import React from 'react';
import renderer from 'react-test-renderer';
import Loader from './loader.jsx';

describe('Loader', () => {
  it('has defaults', () => {
    const tree = renderer.create((<Loader />)).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // describe('inline API', () => {
  //
  // });

  // describe('when inline is true', () => {
  //   beforeEach(function () {
  //     this.wrapper = this.render({ inline: true });
  //   });
  //
  //   it('applies the correct styles', function () {
  //     expect(this.wrapper.prop('className')).toEqual(styles.inlineWrapper);
  //     expect(this.wrapper.find('span').prop('className')).toEqual(styles.inline);
  //   });
  // });
});
