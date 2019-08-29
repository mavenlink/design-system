import React from 'react';
import renderer from 'react-test-renderer';
import Button from './button';

describe('Button', () => {
  it('has defaults', () => {
    const tree = renderer.create((
      <Button>
        Hello world!
      </Button>
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('className API', () => {
    it('prioritizes className prop', () => {
      const tree = renderer.create((
        <Button className="prioritize-me" color="primary">
          Hello world!
        </Button>
      )).toJSON();
      expect(tree.props.className).toEqual('prioritize-me');
    });

    it('has a fallback to color prop', () => {
      const tree = renderer.create((
        <Button color="primary">
          Hello world!
        </Button>
      )).toJSON();
      expect(tree.props.className).toEqual('primary');
    });
  });

  describe('color API', () => {
    it('can be "primary"', () => {
      const tree = renderer.create((
        <Button color="primary">
          Hello world!
        </Button>
      )).toJSON();
      expect(tree.props.className).toEqual('primary');
    });

    it('can be "secondary"', () => {
      const tree = renderer.create((
        <Button color="secondary">
          Hello world!
        </Button>
      )).toJSON();
      expect(tree.props.className).toEqual('secondary');
    });
  });

  describe('disabled API', () => {
    it('can be disabled', () => {
      const tree = renderer.create((
        <Button disabled={true}>
          Hello world!
        </Button>
      )).toJSON();
      expect(tree.props.disabled).toEqual(true);
    });

    it('can be enabled', () => {
      const tree = renderer.create((
        <Button disabled={false}>
          Hello world!
        </Button>
      )).toJSON();
      expect(tree.props.disabled).toEqual(false);
    });
  });

  describe('id API', () => {
    it('sets the id attribute', () => {
      const tree = renderer.create((
        <Button id="test-id">
          Hello world!
        </Button>
      )).toJSON();
      expect(tree.props.id).toEqual('test-id');
    });
  });

  describe('onClick API', () => {
    it('sets the onclick handler', () => {
      const onClickSpy = jest.fn();
      const tree = renderer.create((
        <Button onClick={onClickSpy}>
          Hello world!
        </Button>
      )).toJSON();
      tree.props.onClick();
      expect(onClickSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('type API', () => {
    it('can be "button"', () => {
      const tree = renderer.create((
        <Button type="button">
          Hello world!
        </Button>
      )).toJSON();
      expect(tree.props.type).toEqual('button');
    });

    it('can be "reset"', () => {
      const tree = renderer.create((
        <Button type="reset">
          Hello world!
        </Button>
      )).toJSON();
      expect(tree.props.type).toEqual('reset');
    });

    it('can be "submit"', () => {
      const tree = renderer.create((
        <Button type="submit">
          Hello world!
        </Button>
      )).toJSON();
      expect(tree.props.type).toEqual('submit');
    });
  });
});
