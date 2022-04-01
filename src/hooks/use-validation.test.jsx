import React, { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useValidation from './use-validation.jsx';

describe('useValidation', () => {
  function TestComponent(props) {
    const inputRef = useRef();
    const [validationMessage, validate] = useValidation(props.validationMessage, inputRef);

    return (
      <>
        <input
          aria-describedby="validation-message-id"
          aria-label="Test input"
          onBlur={() => validate()}
          onChange={() => {}}
          ref={inputRef}
          required={props.required}
          value={props.value}
        />
        <span id="validation-message-id">
          {validationMessage}
        </span>
      </>
    );
  }

  it('sets a server validation message', () => {
    const { rerender } = render(<TestComponent validationMessage="Test error" value="test value" />);
    expect(screen.getByLabelText('Test input')).toBeInvalid();
    expect(screen.getByLabelText('Test input')).toHaveAccessibleDescription('Test error');

    rerender(<TestComponent validationMessage="New test error" value="test value" />);
    expect(screen.getByLabelText('Test input')).toBeInvalid();
    expect(screen.getByLabelText('Test input')).toHaveAccessibleDescription('New test error');
  });

  it('clears a server validation message', () => {
    const { rerender } = render(<TestComponent validationMessage="Test error" value="test value" />);
    expect(screen.getByLabelText('Test input')).toBeInvalid();
    expect(screen.getByLabelText('Test input')).toHaveAccessibleDescription('Test error');

    rerender(<TestComponent validationMessage="" value="test value" />);
    expect(screen.getByLabelText('Test input')).toBeValid();
    expect(screen.getByLabelText('Test input')).toHaveAccessibleDescription('');
  });

  it('shows a new client validation message after losing focus', () => {
    render(<TestComponent required />);
    expect(screen.getByLabelText('Test input')).toBeInvalid();
    expect(screen.getByLabelText('Test input')).toHaveAccessibleDescription('');

    userEvent.click(screen.getByLabelText('Test input'));
    userEvent.tab();
    expect(screen.getByLabelText('Test input')).toBeInvalid();
    expect(screen.getByLabelText('Test input')).toHaveAccessibleDescription('Constraints not satisfied');
  });
});
