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
    it('always sets <input> className', () => {
      const tree = renderer.create((
        <Input
          id="foo"
          className="test-class"
          label="I am a label for accessibility"
          invalid
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

  describe('invalid API', () => {
    it('sets an invalid class', () => {
      const tree = renderer.create((
        <Input
          id="foo"
          label="I am a label for accessibility"
          invalid
        />
      )).root;
      expect(tree.findByType('input').props.className).toEqual('invalid');
    });

    it('inserts an invalid icon', () => {
      const tree = renderer.create((
        <Input
          id="foo"
          label="I am a label for accessibility"
          invalid
        />
      )).root;
      expect(tree.findByType('svg').props.className.split(' ')).toContain('invalid-icon');
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

  describe('required API', () => {
    it('adds pertinent information to the label', () => {
      const tree = renderer.create((
        <Input
          id="foo"
          label="I am a label for accessibility"
          required
        />
      )).root;
      expect(tree.findByType('label').findByType('span').props.children).toEqual('(Required)');
    });

    it('sets the required attribute', () => {
      const tree = renderer.create((
        <Input
          id="foo"
          label="I am a label for accessibility"
          required
        />
      )).root;
      expect(tree.findByType('input').props.required).toEqual(true);
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
