import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import Icon from './icon.jsx';

describe('Icon', () => {
  const requiredProps = {
    name: 'foobar',
    icon: {
      id: 'foobar',
      viewBox: '0 0 0 0',
    },
  };

  it('has defaults', () => {
    const tree = renderer.create((
      <Icon {...requiredProps} />
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('ariaLabel API', () => {
    it('can be set', () => {
      render((
        <Icon {...requiredProps} ariaLabel="clear" />
      ));
      expect(screen.getByLabelText('clear')).toBeDefined();
    });
  });

  describe('ariaLabelledBy API', () => {
    it('can be set', () => {
      render((
        <Icon {...requiredProps} ariaLabelledBy="unique-id" />
      ));
      expect(screen.getByRole('img')).toHaveAttribute('aria-labelledby', 'unique-id');
    });
  });

  describe('icon API', () => {
    it('sets the height', () => {
      render((
        <Icon {...requiredProps} icon={{ id: 'foobar', viewBox: '0 0 10 11' }} v={2} />
      ));

      expect(screen.getByRole('img')).toHaveAttribute('height', '11');
    });

    it('sets the width', () => {
      render((
        <Icon {...requiredProps} icon={{ id: 'foobar', viewBox: '0 0 10 11' }} v={2} />
      ));

      expect(screen.getByRole('img')).toHaveAttribute('width', '10');
    });
  });

  describe('id API', () => {
    it('can be set', () => {
      render((
        <Icon {...requiredProps} id="unique-id" />
      ));
      expect(screen.getByRole('img')).toHaveAttribute('id', 'unique-id');
    });
  });

  describe('size API', () => {
    it('can be "small"', () => {
      render((
        <Icon {...requiredProps} size="small" />
      ));
      expect(screen.getByRole('img')).toHaveClass('size-small');
    });

    it('can be "medium"', () => {
      render((
        <Icon {...requiredProps} size="medium" />
      ));
      expect(screen.getByRole('img')).toHaveClass('size-medium');
    });

    it('can be "large"', () => {
      render((
        <Icon {...requiredProps} size="large" />
      ));
      expect(screen.getByRole('img')).toHaveClass('size-large');
    });

    it('can be "skip"', () => {
      render((
        <Icon {...requiredProps} size="skip" />
      ));

      expect(screen.getByRole('img')).not.toHaveClass('size-small');
      expect(screen.getByRole('img')).not.toHaveClass('size-medium');
      expect(screen.getByRole('img')).not.toHaveClass('size-large');
      expect(screen.getByRole('img')).not.toHaveClass('size-skip');
    });
  });

  describe('title API', () => {
    it('can be set', () => {
      render((
        <Icon {...requiredProps} title="yo" />
      ));
      expect(screen.getByTitle('yo')).toBeDefined();
    });
  });

  describe('className API', () => {
    it('has a class name', () => {
      render((
        <Icon {...requiredProps} size="large" className="i-am-a-classname" />
      ));
      expect(screen.getByRole('img')).toHaveClass('i-am-a-classname');
    });

    describe('fill', () => {
      it('can be "primary"', () => {
        render((
          <Icon {...requiredProps} fill="primary" />
        ));
        expect(screen.getByRole('img')).toHaveClass('fill-primary');
      });

      it('can be "action"', () => {
        render((
          <Icon {...requiredProps} fill="action" />
        ));
        expect(screen.getByRole('img')).toHaveClass('fill-action');
      });

      it('can be "highlight"', () => {
        render((
          <Icon {...requiredProps} fill="highlight" />
        ));
        expect(screen.getByRole('img')).toHaveClass('fill-highlight');
      });

      it('can be "caution"', () => {
        render((
          <Icon {...requiredProps} fill="caution" />
        ));
        expect(screen.getByRole('img')).toHaveClass('fill-caution');
      });

      it('can be "none"', () => {
        render((
          <Icon {...requiredProps} fill="none" />
        ));
        expect(screen.getByRole('img')).toHaveClass('fill-none');
      });

      it('can be "skip"', () => {
        render((
          <Icon {...requiredProps} fill="skip" />
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
          <Icon {...requiredProps} stroke="primary" />
        ));
        expect(screen.getByRole('img')).toHaveClass('stroke-primary');
      });

      it('can be "action"', () => {
        render((
          <Icon {...requiredProps} stroke="action" />
        ));
        expect(screen.getByRole('img')).toHaveClass('stroke-action');
      });

      it('can be "highlight"', () => {
        render((
          <Icon {...requiredProps} stroke="highlight" />
        ));
        expect(screen.getByRole('img')).toHaveClass('stroke-highlight');
      });

      it('can be "caution"', () => {
        render((
          <Icon {...requiredProps} stroke="caution" />
        ));
        expect(screen.getByRole('img')).toHaveClass('stroke-caution');
      });

      it('can be "none"', () => {
        render((
          <Icon {...requiredProps} stroke="none" />
        ));
        expect(screen.getByRole('img')).toHaveClass('stroke-none');
      });

      it('can be "skip"', () => {
        render((
          <Icon {...requiredProps} stroke="skip" />
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
          <Icon {...requiredProps} currentColor="primary" />
        ));
        expect(screen.getByRole('img')).toHaveClass('color-primary');
      });

      it('can be "action"', () => {
        render((
          <Icon {...requiredProps} currentColor="action" />
        ));
        expect(screen.getByRole('img')).toHaveClass('color-action');
      });

      it('can be "highlight"', () => {
        render((
          <Icon {...requiredProps} currentColor="highlight" />
        ));
        expect(screen.getByRole('img')).toHaveClass('color-highlight');
      });

      it('can be "caution"', () => {
        render((
          <Icon {...requiredProps} currentColor="caution" />
        ));
        expect(screen.getByRole('img')).toHaveClass('color-caution');
      });

      it('can be "transparent"', () => {
        render((
          <Icon {...requiredProps} currentColor="transparent" />
        ));
        expect(screen.getByRole('img')).toHaveClass('color-transparent');
      });

      it('can be "skip"', () => {
        render((
          <Icon {...requiredProps} currentColor="skip" />
        ));

        expect(screen.getByRole('img')).not.toHaveClass('color-primary');
        expect(screen.getByRole('img')).not.toHaveClass('color-action');
        expect(screen.getByRole('img')).not.toHaveClass('color-highlight');
        expect(screen.getByRole('img')).not.toHaveClass('color-caution');
        expect(screen.getByRole('img')).not.toHaveClass('color-none');
        expect(screen.getByRole('img')).not.toHaveClass('color-skip');
      });
    });

    describe('v2', () => {
      it('skips fill, stroke, and currentColor', () => {
        render(<Icon {...requiredProps} className="i-am-a-classname" v={2} />);

        expect(screen.getByRole('img')).toHaveClass('i-am-a-classname');

        expect(screen.getByRole('img')).not.toHaveClass('fill-primary');
        expect(screen.getByRole('img')).not.toHaveClass('fill-action');
        expect(screen.getByRole('img')).not.toHaveClass('fill-highlight');
        expect(screen.getByRole('img')).not.toHaveClass('fill-caution');
        expect(screen.getByRole('img')).not.toHaveClass('fill-none');
        expect(screen.getByRole('img')).not.toHaveClass('fill-skip');

        expect(screen.getByRole('img')).not.toHaveClass('stroke-primary');
        expect(screen.getByRole('img')).not.toHaveClass('stroke-action');
        expect(screen.getByRole('img')).not.toHaveClass('stroke-highlight');
        expect(screen.getByRole('img')).not.toHaveClass('stroke-caution');
        expect(screen.getByRole('img')).not.toHaveClass('stroke-none');
        expect(screen.getByRole('img')).not.toHaveClass('stroke-skip');

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
