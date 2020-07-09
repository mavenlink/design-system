import React from 'react';
import { render, screen } from '@testing-library/react';
import AbstractCustomField from './abstract-custom-field.jsx';

describe('AbstractCustomField', () => {
  const sharedProps = {
    label: 'Test label',
    id: 'test-id',
  };

  describe('step API', () => {
    it('sets the step attribute', () => {
      render(<AbstractCustomField {...sharedProps} step={2} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('step', '2');
    });
  });

  describe('max API', () => {
    it('sets the max attribute', () => {
      render(<AbstractCustomField {...sharedProps} max={5} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('max', '5');
    });

    it('allows a date string', () => {
      render(<AbstractCustomField {...sharedProps} max="2001-09-11" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('max', '2001-09-11');
    });
  });

  describe('min API', () => {
    it('sets the min attribute', () => {
      render(<AbstractCustomField {...sharedProps} min={-5} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('min', '-5');
    });

    it('allows a date string', () => {
      render(<AbstractCustomField {...sharedProps} min="2001-09-11" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('min', '2001-09-11');
    });
  });
});
