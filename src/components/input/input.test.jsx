import React from 'react';
import renderer from 'react-test-renderer';
import Input from './input.jsx';

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

  describe('disabled API', () => {
    it('sets the disabled attribute', () => {
      const tree = renderer.create((
        <Input
          id="foo"
          disabled
          label="I am a label for accessibility"
        />
      )).root;
      expect(tree.findByType('input').props.disabled).toEqual(true);
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
      expect(tree.findByType('input').props.className).toEqual('invalid-input');
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

  describe('maxLength API', () => {
    it('sets the maxLength attribute', () => {
      const tree = renderer.create((
        <Input
          id="foo"
          label="I am a label for accessibility"
          maxLength={100}
        />
      )).root;
      expect(tree.findByType('input').props.maxLength).toEqual(100);
    });
  });

  describe('name API', () => {
    it('sets the name attribute', () => {
      const tree = renderer.create((
        <Input
          id="foo"
          label="I am a label for accessibility"
          name="test-name"
        />
      )).root;
      expect(tree.findByType('input').props.name).toEqual('test-name');
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
    it('is set to "email"', () => {
      const tree = renderer.create((
        <Input
          id="foo"
          label="I am a label for accessibility"
          type="email"
        />
      )).root;
      expect(tree.findByType('input').props.type).toEqual('email');
    });

    it('is set to "password"', () => {
      const tree = renderer.create((
        <Input
          id="foo"
          label="I am a label for accessibility"
          type="password"
        />
      )).root;
      expect(tree.findByType('input').props.type).toEqual('password');
    });

    it('is be set to "text"', () => {
      const tree = renderer.create((
        <Input
          id="foo"
          label="I am a label for accessibility"
          type="text"
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
