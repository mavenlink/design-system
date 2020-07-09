import { renderHook } from '@testing-library/react-hooks';
import useValidation from './use-validation.jsx';

describe('useValidation', () => {
  const mockRef = (validationMessage = '') => ({
    current: {
      validity: {
        valid: validationMessage === '',
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

    it('unsets the custom validity when there is no error', () => {
      const ref = mockRef();
      renderHook(() => useValidation(false, '', ref));
      expect(ref.current.setCustomValidity.mock.calls[0][0]).toBe('');
    });
  });
});
