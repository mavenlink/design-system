import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import TagSkill from './tag-skill.jsx';

describe('TagSkill', () => {
  it('has default', () => {
    expect(renderer.create(<TagSkill name="Egg" />).toJSON()).toMatchSnapshot();
  });

  describe('name API', () => {
    it('can be set', () => {
      render(<TagSkill name="Bacon" />);
      expect(screen.getByText('Bacon')).toBeDefined();
    });
  });

  describe('level API', () => {
    it('can be set', () => {
      render(<TagSkill name="Avocado" level={1} />);
      expect(screen.getByText('1')).toBeDefined();
    });
  });
});
