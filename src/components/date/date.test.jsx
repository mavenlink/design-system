import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import Date from './date.jsx';

describe('src/components/date/date.test.jsx', () => {
  const requiredProps = {
    id: 'test-id',
    label: 'Test label',
  };

  it('has defaults', () => {
    render(<Date {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  describe('id API', () => {
    it('is a string', () => {
      render(<Date {...requiredProps} id="unique-id" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'unique-id');
    });
  });

  describe('label API', () => {
    it('is a string', () => {
      render(<Date {...requiredProps} label="Unique label" />);
      expect(screen.getByLabelText('Unique label')).toBeInTheDocument();
    });
  });

  describe('readOnly API', () => {
    it('is true', () => {
      render(<Date {...requiredProps} readOnly={true} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('readonly');
    });

    it('is false', () => {
      render(<Date {...requiredProps} readOnly={false} />);
      expect(screen.getByLabelText('Test label')).not.toHaveAttribute('readonly');
    });
  });

  describe('required API', () => {
    it('is true', () => {
      render(<Date {...requiredProps} required={true} />);
      expect(screen.getByLabelText('Test label')).toBeRequired();
      expect(screen.getByText('(Required)')).toBeInTheDocument();
    });

    it('is false', () => {
      render(<Date {...requiredProps} required={false} />);
      expect(screen.getByLabelText('Test label')).not.toBeRequired();
      expect(screen.queryByText('(Required)')).not.toBeInTheDocument();
    });
  });

  describe('validationMessage API', () => {
    it('is a string', () => {
      render(<Date {...requiredProps} validationMessage="This is a provided error." />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('This is a provided error.');
      expect(screen.getByTitle('This is a provided error.')).toBeInTheDocument();
    });
  });
});
