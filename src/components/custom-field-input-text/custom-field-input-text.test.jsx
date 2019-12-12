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
      const r = renderer.create((
        <CustomFieldInputText disabled={true} />
      ));
      const tree = r.toJSON();
      const root = r.root;

      expect(tree.props.className).toContain('disabled');
      expect(root.findByType('input').findByProps({ disabled: true }));
    });

    it('can be enabled', () => {
      const r = renderer.create((
        <CustomFieldInputText disabled={false} />
      ));
      const tree = r.toJSON();
      const root = r.root;

      expect(tree.props.className).not.toContain('disabled');
      expect(root.findByType('input').findByProps({ disabled: false }));
    });
  });

  describe('error API', () => {
    it('can have an error state', () => {
      const r = renderer.create((
        <CustomFieldInputText error={true} />
      ));
      const tree = r.toJSON();
      const root = r.root;

      expect(tree.props.className).toContain('error');
      expect(root.findByProps({ currentColor: 'caution' }));
    });

    it('can have no error state', () => {
      const r = renderer.create((
        <CustomFieldInputText error={false} />
      ));
      const tree = r.toJSON();
      const root = r.root;

      expect(tree.props.className).not.toContain('error');
      expect(root.findByProps({ className: 'input-container' }).children.length).toEqual(1);
    });
  });

  describe('help text API', () => {
    it('can have help text', () => {
      const helpText = 'Oh wow big helpful yes!';
      const r = renderer.create((
        <CustomFieldInputText helpText={helpText} />
      ));
      const root = r.root;

      expect(root.findByProps({ className: 'help' }).children).toContain(helpText);
    });

    it('can have empty help text', () => {
      const r = renderer.create((
        <CustomFieldInputText />
      ));
      const root = r.root;

      expect(root.findByProps({ className: 'help' }).children).toEqual([]);
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
