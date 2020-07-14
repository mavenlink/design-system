import { renderHook } from '@testing-library/react-hooks';
import useValidation from './use-validation.jsx';

describe('useValidation', () => {
  const mockRef = (validationMessage = '', validitySpread = {}) => ({
    current: {
      validity: {
        valid: validationMessage === '',
        ...validitySpread,
      },
      validationMessage,
      setCustomValidity: jest.fn(),
    },
  });

  describe('native validation', () => {
    it('responds with the native validation error message', () => {
      const mockInputRef = mockRef('Welcome to Zombocom');
      const { result } = renderHook(() => useValidation(false, '', mockInputRef));
      expect(result.current).toBe('Welcome to Zombocom');
    });

    it('prioritizes native validation errors over contextual ones', () => {
      const { result } = renderHook(() => useValidation(false, 'hey listen', mockRef('yo')));
      expect(result.current).toBe('yo');
    });

    xit('is dependent on the checked validity', () => {
      const { result, rerender } = renderHook(() => useValidation(false, '', mockRef('yo'), true));
      expect(result.current).toBe('');
      rerender(false, '', mockRef('yo'), false);
      expect(result.current).toBe('yo');
    });
  });

  describe('contextual validation', () => {
    it('has no validation message for a readOnly field', () => {
      const { result } = renderHook(() => useValidation(true, 'yo', mockRef()));
      expect(result.current).toBe('');
    });

    it('provides the contextual error when one exists', () => {
      const { result } = renderHook(() => useValidation(false, 'yo', mockRef()));
      expect(result.current).toBe('yo');
    });

    it('sets the custom validity to the contextual error', () => {
      const ref = mockRef();
      renderHook(() => useValidation(false, 'yo', ref));
      expect(ref.current.setCustomValidity.mock.calls.length > 0).toBe(true);
    });

    it('does not set the custom validity when there is no error', () => {
      const ref = mockRef();
      renderHook(() => useValidation(false, '', ref));
      expect(ref.current.setCustomValidity.mock.calls[0][0]).toBe('');
    });

    it('unsets custom validity when an an error is removed', () => {
      const ref = mockRef('this is an error', { customError: true });
      renderHook(() => useValidation(false, '', ref));
      expect(ref.current.setCustomValidity.mock.calls[0][0]).toBe('');
    });
  });
});
