import React from 'react';
import renderer from 'react-test-renderer';
import Input from './input';

describe('Input', () => {
  it('has defaults', () => {
    const tree = renderer
      .create(<Input id="foo" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('aria-labelledby API', () => {
    it('sets the aria-labelledby', () => {
      const tree = renderer.create(<Input aria-labelledby="test-label" />).toJSON();
      expect(tree.props['aria-labelledby']).toEqual('test-label');
    });
  });

  describe('className API', () => {
    it('sets the className', () => {
      const tree = renderer.create(<Input className="test-class" />).toJSON();
      expect(tree.props.className).toEqual('test-class');
    });
  });

  describe('id API', () => {
    it('sets the ID', () => {
      const tree = renderer.create(<Input id="test-id" />).toJSON();
      expect(tree.props.id).toEqual('test-id');
    });
  });

  describe('onChange API', () => {
    it('sets the onchange handler', () => {
      const onChangeSpy = jest.fn();
      const tree = renderer.create(<Input onChange={onChangeSpy} />).toJSON();
      tree.props.onChange();
      expect(onChangeSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('placeholder API', () => {
    it('sets the placeholder attribute', () => {
      const tree = renderer.create(<Input placeholder="test-placeholder" />).toJSON();
      expect(tree.props.placeholder).toEqual('test-placeholder');
    });
  });

  describe('type API', () => {
    it('is set to "text"', () => {
      const tree = renderer.create(<Input type="checkbox" />).toJSON();
      expect(tree.props.type).toEqual('text');
    });
  });

  describe('value API', () => {
    it('sets the value', () => {
      const tree = renderer.create(<Input value="test-value" />).toJSON();
      expect(tree.props.value).toEqual('test-value');
    });
  });
});
