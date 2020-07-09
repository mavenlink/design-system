import React from 'react';
import { render, screen } from '@testing-library/react';
import AbstractCustomField from './abstract-custom-field.jsx';

describe('AbstractCustomField', () => {
  const sharedProps = {
    label: 'Test label',
    id: 'test-id',
  };

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

  describe('step API', () => {
    it('sets the step attribute', () => {
      render(<AbstractCustomField {...sharedProps} step={2} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('step', '2');
    });
  });

  describe('type API', () => {
    it('can be set to `number`', () => {
      render(<AbstractCustomField {...sharedProps} type="number" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'number');
    });

    it('can be set to `text`', () => {
      render(<AbstractCustomField {...sharedProps} type="text" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'text');
    });

    it('can be set to `date`', () => {
      render(<AbstractCustomField {...sharedProps} type="date" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'date');
    });
  });
});
