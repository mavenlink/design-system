import { renderHook } from '@testing-library/react-hooks';
import useCurrencyValidator from './currency-validator.jsx';

describe('useCurrencyValidator', () => {
  it('passes validation for empty string', () => {
    const { result } = renderHook(() => useCurrencyValidator('', '$'));

    expect(result.current).toBe(true);
  });

  it('passes validation for a fully qualified dollar amount', () => {
    const { result } = renderHook(() => useCurrencyValidator('$123.45', '$'));

    expect(result.current).toBe(true);
  });

  it('passes validation for a partially qualified dollar amount', () => {
    const { result } = renderHook(() => useCurrencyValidator('$.45', '$'));

    expect(result.current).toBe(true);
  });

  it('passes validation for a zero padded dollar amount', () => {
    const { result } = renderHook(() => useCurrencyValidator('$0.45', '$'));

    expect(result.current).toBe(true);
  });

  it('passes validation for a properly configured alternate currency', () => {
    const { result } = renderHook(() => useCurrencyValidator('€0.45', '€'));

    expect(result.current).toBe(true);
  });

  it('passes validation for a euro amount with European partial digit delimiter', () => {
    const { result } = renderHook(() => useCurrencyValidator('€0,45', '€'));

    expect(result.current).toBe(true);
  });

  it('fails validation for an improperly configured alternate currency', () => {
    const { result } = renderHook(() => useCurrencyValidator('€0.45', '$'));

    expect(result.current).toBe(false);
  });

  it('fails validation for a dollar amount with too many significant digits', () => {
    const { result } = renderHook(() => useCurrencyValidator('$0.4523', '$'));

    expect(result.current).toBe(false);
  });

  it('fails validation for a dollar amount with alpha characters', () => {
    const { result } = renderHook(() => useCurrencyValidator('$a0.4523', '$'));

    expect(result.current).toBe(false);
  });

  it('fails validation for a dollar amount with multiple dots', () => {
    const { result } = renderHook(() => useCurrencyValidator('$0.452.3', '$'));

    expect(result.current).toBe(false);
  });

  it('fails validation for a dollar amount with space characters', () => {
    const { result } = renderHook(() => useCurrencyValidator('$45 23', '$'));

    expect(result.current).toBe(false);
  });
});
