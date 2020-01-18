import { renderHook } from '@testing-library/react-hooks';
import useNumberValidator from './number-enforcer.jsx';

describe('useNumberValidator', () => {
  it('passes validation for empty string', () => {
    const { result } = renderHook(() => useNumberValidator(''));

    expect(result.current[1]).toBe(true);
  });
});
