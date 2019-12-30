import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import Icon from './icon.jsx';

describe('Icon', () => {
  it('has defaults', () => {
    const tree = renderer.create((
      <Icon name="foobar" />
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has title', () => {
    render((
      <Icon name="foobar" title="yo" />
    ));
    expect(screen.getByRole('img')).toContainHTML('<title>yo</title>');
  });

  describe('size API', () => {
    it('can be "small"', () => {
      render((
        <Icon name="foobar" size="small" />
      ));
      expect(screen.getByRole('img')).toHaveClass('size-small');
    });

    it('can be "medium"', () => {
      render((
        <Icon name="foobar" size="medium" />
      ));
      expect(screen.getByRole('img')).toHaveClass('size-medium');
    });

    it('can be "large"', () => {
      render((
        <Icon name="foobar" size="large" />
      ));
      expect(screen.getByRole('img')).toHaveClass('size-large');
    });
  });

  describe('className API', () => {
    describe('fill', () => {
      it('can be "primary"', () => {
        render((
          <Icon name="foobar" fill="primary" />
        ));
        expect(screen.getByRole('img')).toHaveClass('fill-primary');
      });

      it('can be "action"', () => {
        render((
          <Icon name="foobar" fill="action" />
        ));
        expect(screen.getByRole('img')).toHaveClass('fill-action');
      });

      it('can be "highlight"', () => {
        render((
          <Icon name="foobar" fill="highlight" />
        ));
        expect(screen.getByRole('img')).toHaveClass('fill-highlight');
      });

      it('can be "caution"', () => {
        render((
          <Icon name="foobar" fill="caution" />
        ));
        expect(screen.getByRole('img')).toHaveClass('fill-caution');
      });

      it('can be "none"', () => {
        render((
          <Icon name="foobar" fill="none" />
        ));
        expect(screen.getByRole('img')).toHaveClass('fill-none');
      });
    });

    describe('stroke', () => {
      it('can be "primary"', () => {
        render((
          <Icon name="foobar" stroke="primary" />
        ));
        expect(screen.getByRole('img')).toHaveClass('stroke-primary');
      });

      it('can be "action"', () => {
        render((
          <Icon name="foobar" stroke="action" />
        ));
        expect(screen.getByRole('img')).toHaveClass('stroke-action');
      });

      it('can be "highlight"', () => {
        render((
          <Icon name="foobar" stroke="highlight" />
        ));
        expect(screen.getByRole('img')).toHaveClass('stroke-highlight');
      });

      it('can be "caution"', () => {
        render((
          <Icon name="foobar" stroke="caution" />
        ));
        expect(screen.getByRole('img')).toHaveClass('stroke-caution');
      });

      it('can be "none"', () => {
        render((
          <Icon name="foobar" stroke="none" />
        ));
        expect(screen.getByRole('img')).toHaveClass('stroke-none');
      });
    });

    describe('currentColor', () => {
      it('can be "primary"', () => {
        render((
          <Icon name="foobar" currentColor="primary" />
        ));
        expect(screen.getByRole('img')).toHaveClass('color-primary');
      });

      it('can be "action"', () => {
        render((
          <Icon name="foobar" currentColor="action" />
        ));
        expect(screen.getByRole('img')).toHaveClass('color-action');
      });

      it('can be "highlight"', () => {
        render((
          <Icon name="foobar" currentColor="highlight" />
        ));
        expect(screen.getByRole('img')).toHaveClass('color-highlight');
      });

      it('can be "caution"', () => {
        render((
          <Icon name="foobar" currentColor="caution" />
        ));
        expect(screen.getByRole('img')).toHaveClass('color-caution');
      });

      it('can be "transparent"', () => {
        render((
          <Icon name="foobar" currentColor="transparent" />
        ));
        expect(screen.getByRole('img')).toHaveClass('color-transparent');
      });
    });
  });
});
