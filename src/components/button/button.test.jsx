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
    it('can be "blank"', () => {
      const tree = renderer.create((
        <Button color="blank">
          Hello world!
        </Button>
      )).toJSON();
      expect(tree.props.className).toEqual('blank');
    });

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

  it('can be disabled', () => {
    const tree = renderer.create((
      <Button disabled>
        Hello world!
      </Button>
    )).toJSON();
    expect(tree.props.disabled).toEqual(true);
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
