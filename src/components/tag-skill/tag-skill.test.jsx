import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import TagSkill from './tag-skill.jsx';

describe('TagSkill', () => {
  const requiredProps = {
    id: 'test-id',
  };

  it('has default', () => {
    expect(renderer.create(<TagSkill {...requiredProps} name="Egg" />).toJSON()).toMatchSnapshot();
  });

  describe('id API', () => {
    it('can be set', () => {
      render(<TagSkill {...requiredProps} id="unique-id" name="Bacon" />);
      expect(screen.getByText('Bacon').parentElement.parentElement).toHaveAttribute('id', 'unique-id');
    });
  });

  describe('name API', () => {
    it('can be set', () => {
      render(<TagSkill {...requiredProps} name="Bacon" />);
      expect(screen.getByText('Bacon')).toBeDefined();
    });
  });

  describe('level API', () => {
    it('can be set', () => {
      render(<TagSkill {...requiredProps} name="Avocado" level={1} />);
      expect(screen.getByText('1')).toBeDefined();
    });
  });
});
