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
    const { result } = renderHook(() => useValidation(false, '', mockRef(true, '')));
    expect(result.current).toBe('');
  });
});
