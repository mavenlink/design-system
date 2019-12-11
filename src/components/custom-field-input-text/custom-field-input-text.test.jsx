import React from 'react';
import renderer from 'react-test-renderer';
import CustomFieldInputText from './custom-field-input-text.jsx';

describe('CustomFieldInputText', () => {
  it('has defaults', () => {
    const tree = renderer.create((
      <CustomFieldInputText />
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('className API', () => {
    it('prioritizes className prop', () => {
      const tree = renderer.create((
        <CustomFieldInputText className="prioritize-me" />
      )).toJSON();
      expect(tree.props.className).toEqual('prioritize-me');
    });
  });

  describe('disabled API', () => {
    it('can be disabled', () => {
      const tree = renderer.create((
        <CustomFieldInputText disabled={true} />
      )).root;
      expect(tree.findByProps({ className: 'custom-field-input-text' }).findByProps({ disabled: true }));
      expect(tree.findByType('input').findByProps({ disabled: true }));
    });

    it('can be enabled', () => {
      const tree = renderer.create((
        <CustomFieldInputText disabled={false} />
      )).root;
      expect(tree.findByProps({ className: 'custom-field-input-text' }).findByProps({ disabled: false }));
      expect(tree.findByType('input').findByProps({ disabled: false }));
    });
  });

  describe('name API', () => {
    it('sets the name attribute', () => {
      const tree = renderer.create((
        <CustomFieldInputText name="test-name" />
      )).root;
      expect(tree.findByType('input').findByProps({ name: 'test-name' }));
    });
  });

  describe('id API', () => {
    it('sets the id attribute', () => {
      const tree = renderer.create((
        <CustomFieldInputText id="test-id" />
      )).root;
      expect(tree.findByType('input').findByProps({ id: 'test-id' }));
    });
  });

  describe('onClick API', () => {
    it('sets the onclick handler', () => {
      const onClickSpy = jest.fn();
      const tree = renderer.create((
        <CustomFieldInputText onClick={onClickSpy} />
      )).root;
      tree.findByType('input').props.onClick();
      expect(onClickSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('value API', () => {
    it('sets the value attribute', () => {
      const tree = renderer.create((
        <CustomFieldInputText value="test-value" />
      )).root;
      expect(tree.findByType('input').findByProps({ value: 'test-value' }));
    });
  });
});
