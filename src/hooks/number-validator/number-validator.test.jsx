import { renderHook } from '@testing-library/react-hooks';
import useNumberValidator from './number-validator.jsx';

describe('useNumberValidator', () => {
  it('passes validation for empty string', () => {
    const { result } = renderHook(() => useNumberValidator(''));

    expect(result.current).toBe(true);
  });

  it('passes validation for undefined', () => {
    const { result } = renderHook(() => useNumberValidator(undefined));

    expect(result.current).toBe(true);
  });

  it('passes validation for natural numbers', () => {
    const { result } = renderHook(() => useNumberValidator('123'));

    expect(result.current).toBe(true);
  });

  it('passes validation for rational numbers', () => {
    const { result } = renderHook(() => useNumberValidator('0'));

    expect(result.current).toBe(true);
  });

  it('passes validation for integers', () => {
    const { result } = renderHook(() => useNumberValidator('-1'));

    expect(result.current).toBe(true);
  });

  it('passes validation for decimal numbers', () => {
    const { result } = renderHook(() => useNumberValidator('1.23'));

    expect(result.current).toBe(true);
  });

  it('passes validation for decimal numbers with no whole component', () => {
    const { result } = renderHook(() => useNumberValidator('.23'));

    expect(result.current).toBe(true);
  });

  it('passes validation for negative decimal numbers with no whole component', () => {
    const { result } = renderHook(() => useNumberValidator('-.23'));

    expect(result.current).toBe(true);
  });

  it('fails validation for alpha characters', () => {
    const { result } = renderHook(() => useNumberValidator('a'));

    expect(result.current).toBe(false);
  });

  it('fails validation for alpha characters mixed with numbers', () => {
    const { result } = renderHook(() => useNumberValidator('1a23'));

    expect(result.current).toBe(false);
  });

  it('fails validation for non-alpha characters', () => {
    const { result } = renderHook(() => useNumberValidator('&'));

    expect(result.current).toBe(false);
  });

  it('fails validation for multiple - characters', () => {
    const { result } = renderHook(() => useNumberValidator('--1'));

    expect(result.current).toBe(false);
  });

  it('fails validation for multiple . characters', () => {
    const { result } = renderHook(() => useNumberValidator('1.2.3'));

    expect(result.current).toBe(false);
  });

  it('fails validation for incomplete decimals', () => {
    const { result } = renderHook(() => useNumberValidator('1.'));

    expect(result.current).toBe(false);
  });

  it('fails validation for numbers with spaces', () => {
    const { result } = renderHook(() => useNumberValidator('1 2'));

    expect(result.current).toBe(false);
  });
});
