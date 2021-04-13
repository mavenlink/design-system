import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('has a calendar', () => {
    const today = (new window.Date()).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
    });

    render(<Date {...requiredProps} />);
    userEvent.click(screen.getByTitle('Test label calendar button'));
    expect(screen.getByText(today)).toBeInTheDocument();
    userEvent.click(screen.getByTitle('Test label calendar button'));
    expect(screen.queryByText(today)).not.toBeInTheDocument();
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

  describe('max API', () => {
    it('is date-only', () => {
      render(<Date {...requiredProps} max="2000-01-01" />);
      userEvent.type(screen.getByLabelText('Test label'), '2000-01-01');
      expect(screen.getByLabelText('Test label')).toBeValid();
      userEvent.clear(screen.getByLabelText('Test label'));
      userEvent.type(screen.getByLabelText('Test label'), '2000-01-02');
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('');
      userEvent.tab();
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('Constraints not satisfied');
    });
  });

  describe('min API', () => {
    it('is date-only', () => {
      render(<Date {...requiredProps} min="2000-01-01" />);
      userEvent.type(screen.getByLabelText('Test label'), '2000-01-01');
      expect(screen.getByLabelText('Test label')).toBeValid();
      userEvent.clear(screen.getByLabelText('Test label'));
      userEvent.type(screen.getByLabelText('Test label'), '1999-12-31');
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('');
      userEvent.tab();
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('Constraints not satisfied');
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
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('');
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.tab();
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('Constraints not satisfied');
    });

    it('is false', () => {
      render(<Date {...requiredProps} required={false} />);
      expect(screen.getByLabelText('Test label')).not.toBeRequired();
      expect(screen.queryByText('(Required)')).not.toBeInTheDocument();
    });
  });

  describe('validationMessage API', () => {
    it('is a string', () => {
      const { rerender } = render(<Date {...requiredProps} validationMessage="This is a provided error." />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('This is a provided error.');
      expect(screen.getByTitle('This is a provided error.')).toBeInTheDocument();

      rerender(<Date {...requiredProps} validationMessage="This is a new provided error." />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('This is a new provided error.');
      expect(screen.getByTitle('This is a new provided error.')).toBeInTheDocument();
    });

    it('is cleared', () => {
      const { rerender } = render(<Date {...requiredProps} validationMessage="This is a provided error." />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('This is a provided error.');
      expect(screen.getByTitle('This is a provided error.')).toBeInTheDocument();

      rerender(<Date {...requiredProps} validationMessage="" />);
      expect(screen.getByLabelText('Test label')).toBeValid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('');
    });
  });
});
