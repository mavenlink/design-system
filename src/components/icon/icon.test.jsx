import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import Icon from './icon.jsx';

describe('Icon', () => {
  const requiredProps = {
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
        <Icon {...requiredProps} icon={{ id: 'foobar', viewBox: '0 0 10 11' }} />
      ));

      expect(screen.getByRole('img')).toHaveAttribute('height', '11');
    });

    it('sets the width', () => {
      render((
        <Icon {...requiredProps} icon={{ id: 'foobar', viewBox: '0 0 10 11' }} />
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
  });
});
