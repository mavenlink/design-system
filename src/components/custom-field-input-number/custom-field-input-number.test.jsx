import React from 'react';
import renderer from 'react-test-renderer';
import CustomFieldInputNumber from './custom-field-input-number.jsx';

// TODO: Update these tests to actually test the Number input specific props and traits
describe('CustomFieldInputNumber', () => {
  it('has defaults', () => {
    const tree = renderer.create((
      <CustomFieldInputNumber />
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('className API', () => {
    it('prioritizes className prop', () => {
      const tree = renderer.create((
        <CustomFieldInputNumber className="prioritize-me" />
      )).toJSON();
      expect(tree.props.className).toEqual('prioritize-me');
    });
  });

  describe('disabled API', () => {
    it('can be disabled', () => {
      const r = renderer.create((
        <CustomFieldInputNumber disabled={true} />
      ));
      const tree = r.toJSON();
      const root = r.root;

      expect(tree.props.className).toContain('disabled');
      expect(root.findByType('input').findByProps({ disabled: true }));
    });

    it('can be enabled', () => {
      const r = renderer.create((
        <CustomFieldInputNumber disabled={false} />
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
        <CustomFieldInputNumber error={true} />
      ));
      const tree = r.toJSON();
      const root = r.root;

      expect(tree.props.className).toContain('error');
      expect(root.findByProps({ currentColor: 'caution' }));
    });

    it('can have no error state', () => {
      const r = renderer.create((
        <CustomFieldInputNumber error={false} />
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
        <CustomFieldInputNumber helpText={helpText} />
      ));
      const root = r.root;

      expect(root.findByProps({ className: 'help' }).children).toContain(helpText);
    });

    it('can have empty help text', () => {
      const r = renderer.create((
        <CustomFieldInputNumber />
      ));
      const root = r.root;

      expect(root.findByProps({ className: 'help' }).children).toEqual([]);
    });
  });

  describe('name API', () => {
    it('sets the name attribute', () => {
      const tree = renderer.create((
        <CustomFieldInputNumber name="test-name" />
      )).root;
      expect(tree.findByType('input').findByProps({ name: 'test-name' }));
    });
  });

  describe('placeholder API', () => {
    it('can have placeholder for input', () => {
      const placeholder = 'This is placeholder input';
      const r = renderer.create((
        <CustomFieldInputNumber placeholder={placeholder} />
      ));
      const root = r.root;

      expect(root.findByType('input').props.placeholder).toEqual(placeholder);
    });

    it('can have no placeholder for input', () => {
      const r = renderer.create((
        <CustomFieldInputNumber />
      ));
      const root = r.root;

      expect(root.findByType('input').props.placeholder).toBeUndefined();
    });
  });

  describe('required API', () => {
    it('can have a required indicator', () => {
      const r = renderer.create((
        <CustomFieldInputNumber required={true} />
      ));
      const root = r.root;

      expect(root.findByProps({ className: 'optional' }));
    });

    it('can have no required indicator', () => {
      const r = renderer.create((
        <CustomFieldInputNumber />
      ));
      const root = r.root;

      expect(root.findByProps({ className: 'input-container' }).children.length).toEqual(1);
    });
  });

  describe('id API', () => {
    it('sets the id attribute', () => {
      const tree = renderer.create((
        <CustomFieldInputNumber id="test-id" />
      )).root;
      expect(tree.findByType('input').findByProps({ id: 'test-id' }));
    });
  });

  describe('onClick API', () => {
    it('sets the onclick handler', () => {
      const onClickSpy = jest.fn();
      const tree = renderer.create((
        <CustomFieldInputNumber onClick={onClickSpy} />
      )).root;
      tree.findByType('input').props.onClick();
      expect(onClickSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('value API', () => {
    it('sets the value attribute', () => {
      const tree = renderer.create((
        <CustomFieldInputNumber value="test-value" />
      )).root;
      expect(tree.findByType('input').findByProps({ value: 'test-value' }));
    });
  });
});
