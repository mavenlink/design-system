import { renderHook } from '@testing-library/react-hooks';
import useValidation from './use-validation.jsx';

describe('useValidation', () => {
  const mockRef = (valid, validationMessage) => ({
    current: {
      validity: {
        valid,
      },
      validationMessage,
      setCustomValidity: jest.fn(),
    },
  });

  it('has no validation message for a readOnly field', () => {
    const { result } = renderHook(() => useValidation(true, '', mockRef(true, '')));
    expect(result.current).toBe('');
  });

  it('provides a validation message when the native validation is failing', () => {
    const mockInputRef = mockRef(false, 'Welcome to Zombocom');
    const { result } = renderHook(() => useValidation(false, '', mockInputRef));
    expect(result.current).toBe('Welcome to Zombocom');
  });
});
