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
    expect(screen.getByTitle('yo')).toBeDefined();
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
    it('has a class name', () => {
      render((
        <Icon name="foobar" size="large" className="i-am-a-classname" />
      ));
      expect(screen.getByRole('img')).toHaveClass('i-am-a-classname');
    });

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

      it('can be "skip"', () => {
        render((
          <Icon name="foobar" fill="skip" />
        ));

        expect(screen.getByRole('img')).not.toHaveClass('fill-primary');
        expect(screen.getByRole('img')).not.toHaveClass('fill-action');
        expect(screen.getByRole('img')).not.toHaveClass('fill-highlight');
        expect(screen.getByRole('img')).not.toHaveClass('fill-caution');
        expect(screen.getByRole('img')).not.toHaveClass('fill-none');
        expect(screen.getByRole('img')).not.toHaveClass('fill-skip');
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

      it('can be "skip"', () => {
        render((
          <Icon name="foobar" stroke="skip" />
        ));

        expect(screen.getByRole('img')).not.toHaveClass('stroke-primary');
        expect(screen.getByRole('img')).not.toHaveClass('stroke-action');
        expect(screen.getByRole('img')).not.toHaveClass('stroke-highlight');
        expect(screen.getByRole('img')).not.toHaveClass('stroke-caution');
        expect(screen.getByRole('img')).not.toHaveClass('stroke-none');
        expect(screen.getByRole('img')).not.toHaveClass('stroke-skip');
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

      it('can be "skip"', () => {
        render((
          <Icon name="foobar" currentColor="skip" />
        ));

        expect(screen.getByRole('img')).not.toHaveClass('color-primary');
        expect(screen.getByRole('img')).not.toHaveClass('color-action');
        expect(screen.getByRole('img')).not.toHaveClass('color-highlight');
        expect(screen.getByRole('img')).not.toHaveClass('color-caution');
        expect(screen.getByRole('img')).not.toHaveClass('color-none');
        expect(screen.getByRole('img')).not.toHaveClass('color-skip');
      });
    });
  });
});
