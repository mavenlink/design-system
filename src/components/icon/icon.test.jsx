import React from 'react';
import renderer from 'react-test-renderer';
import Icon from './icon.jsx';

describe('Icon', () => {
  it('has defaults', () => {
    const tree = renderer.create((
      <Icon name="foobar" />
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has title', () => {
    const tree = renderer.create((
      <Icon name="foobar" title="yo" />
    )).root;
    expect(tree.findByType('title').props.children).toBe('yo');
  });

  describe('size API', () => {
    it('renders small, medium, and large sizes', () => {
      const sizes = ['small', 'medium', 'large'];
      sizes.forEach((size) => {
        const tree = renderer.create((
          <Icon name="foobar" size={size} />
        )).toJSON();
        expect(tree.props.className).toContain(`size-${size}`);
      });
    });
  });

  describe('className API', () => {
    describe('fill', () => {
      it('sets all fill colors', () => {
        const colors = ['primary', 'action', 'highlight', 'caution'];
        colors.forEach((color) => {
          const tree = renderer.create((
            <Icon name="foobar" fill={color} />
          )).toJSON();
          expect(tree.props.className).toContain('icon-base');
          expect(tree.props.className).toContain(`fill-${color}`);
          expect(tree.props.className).not.toContain('stroke');
        });
      });
    });

    describe('stroke', () => {
      it('sets stroke colors turning off fills and color', () => {
        const colors = ['primary', 'action', 'highlight', 'caution'];
        colors.forEach((color) => {
          const tree = renderer.create((
            <Icon name="foobar" stroke={color} />
          )).toJSON();
          expect(tree.props.className).toContain('icon-base');
          expect(tree.props.className).toContain(`stroke-${color}`);
          expect(tree.props.className).toContain('fill-none');
          expect(tree.props.className).toContain('color-transparent');
        });
      });
    });

    describe('currentColor', () => {
      it('sets all font colors', () => {
        const colors = ['primary', 'action', 'highlight', 'caution'];
        colors.forEach((color) => {
          const tree = renderer.create((
            <Icon name="foobar" currentColor={color} />
          )).toJSON();
          expect(tree.props.className).toContain('icon-base');
          expect(tree.props.className).toContain(`color-${color}`);
        });
      });
    });

    describe('combining colors', () => {
      it('can combine fill, stroke, and currentColor', () => {
        const colors = ['primary', 'action', 'highlight', 'caution'];
        colors.forEach((color) => {
          const tree = renderer.create((
            <Icon name="foobar" fill={color} stroke={color} currentColor={color} />
          )).toJSON();
          expect(tree.props.className).toContain('icon-base');
          expect(tree.props.className).toContain(`fill-${color}`);
          expect(tree.props.className).toContain(`color-${color}`);
          expect(tree.props.className).toContain(`stroke-${color}`);
        });
      });
    });
  });
});
