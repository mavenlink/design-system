import { renderHook, act } from '@testing-library/react-hooks';
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

  describe('inputRef validation', () => {
    it('does not set a validation message on initial render when invalid', () => {
      const mockInputRef = mockRef('Welcome to Zombocom');
      const { result } = renderHook(() => useValidation('', mockInputRef));
      expect(result.current[0]).toBe('');
    });
  });

  describe('errorText', () => {
    it('provides the error text', () => {
      const { result } = renderHook(() => useValidation('yo', mockRef()));
      expect(result.current[0]).toBe('yo');
    });

    it('sets the custom validity to the error text', () => {
      const ref = mockRef();
      renderHook(() => useValidation('yo', ref));
      expect(ref.current.setCustomValidity.mock.calls.length > 0).toBe(true);
    });

    it('does not set the custom validity when there is no error text', () => {
      const ref = mockRef();
      renderHook(() => useValidation('', ref));
      expect(ref.current.setCustomValidity.mock.calls[0][0]).toBe('');
    });

    it('unsets custom validity when the error text is removed', () => {
      const ref = mockRef('this is an error', { customError: true });
      renderHook(() => useValidation('', ref));
      expect(ref.current.setCustomValidity.mock.calls[0][0]).toBe('');
    });
  });

  // FIXME we should test that calling validate will set the validationMessage;
  xdescribe('validate', () => {
    it('', () => {
      const mockedRef = mockRef();

      const { result } = renderHook(() => useValidation('', mockedRef));
      const validate = result.current[1];

      act(() => {
        mockedRef.current.validity.valid = false;
        mockedRef.current.validity.validationMessage = 'no bueno';
      });

      validate();

      expect(result.current[0]).toEqual('no bueno');
    });
  });
});
