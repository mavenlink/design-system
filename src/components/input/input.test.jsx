import React from 'react';
import renderer from 'react-test-renderer';
import Input from './input';

describe('Input', () => {
  it('has defaults', () => {
    const tree = renderer
      .create((
        <Input
          id="foo"
          label="I am a label for accessibility"
        />
      )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('className API', () => {
    it('sets the <input> className', () => {
      const tree = renderer.create((
        <Input
          id="foo"
          label="I am a label for accessibility"
          className="test-class"
        />
      )).root;
      expect(tree.findByType('input').props.className).toEqual('test-class');
    });
  });

  describe('id API', () => {
    it('sets the ID', () => {
      const tree = renderer.create((
        <Input
          id="test-id"
          label="I am a label for accessibility"
        />
      )).root;
      expect(tree.findByType('input').props.id).toEqual('test-id');
    });
  });

  describe('onChange API', () => {
    it('sets the onchange handler', () => {
      const onChangeSpy = jest.fn();
      const tree = renderer.create((
        <Input
          id="foo"
          label="I am a label for accessibility"
          onChange={onChangeSpy}
        />
      )).root;
      tree.findByType('input').props.onChange();
      expect(onChangeSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('placeholder API', () => {
    it('sets the placeholder attribute', () => {
      const tree = renderer.create((
        <Input
          id="foo"
          label="I am a label for accessibility"
          placeholder="test-placeholder"
        />
      )).root;
      expect(tree.findByType('input').props.placeholder).toEqual('test-placeholder');
    });
  });

  describe('type API', () => {
    it('is set to "text"', () => {
      const tree = renderer.create((
        <Input
          id="foo"
          label="I am a label for accessibility"
          type="checkbox"
        />
      )).root;
      expect(tree.findByType('input').props.type).toEqual('text');
    });
  });

  describe('value API', () => {
    it('sets the value', () => {
      const tree = renderer.create((
        <Input
          id="foo"
          label="I am a label for accessibility"
          value="test-value"
        />
      )).root;
      expect(tree.findByType('input').props.value).toEqual('test-value');
    });
  });
});
