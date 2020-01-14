import { renderHook } from '@testing-library/react-hooks';
import useCurrencyValidator from './currency-validator.jsx.js';

describe('useCurrencyValidator', () => {
  it('passes validation for empty string', () => {
    const { result } = renderHook(() => useCurrencyValidator(''));

    expect(result.current).toBe(true);
  });
});
