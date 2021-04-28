import { renderHook } from '@testing-library/react-hooks';
import useFlush from './use-flush.js';

describe('useFlush', () => {
  const requiredProps = { ref: {} };
  it('sets left:0 when flushing left', () => {
    const { result } = renderHook(() => useFlush({ ...requiredProps, initialDirection: 'left' }));
    expect(result.current.flush.left).toBe(0);
    expect(result.current.flush.right).toBeUndefined();
  });

  it('sets right:0 when flushing right', () => {
    const { result } = renderHook(() => useFlush({ ...requiredProps, initialDirection: 'right' }));
    expect(result.current.flush.right).toBe(0);
    expect(result.current.flush.left).toBeUndefined();
  });

  describe('autoflush', () => {
    const jsdomDefault = global.window.innerWidth;

    beforeEach(() => {
      global.window.innerWidth = 4;
    });

    afterEach(() => {
      global.window.innerWidth = jsdomDefault;
    });

    it('sets right:0 when the component is eclipsed on the end', () => {
      const getBoundingClientRect = jest.fn();
      getBoundingClientRect.mockReturnValueOnce({ left: 0, right: 8 });

      const ref = { current: { getBoundingClientRect } };
      const { result } = renderHook(() => useFlush({ ...requiredProps, autoflush: true, ref, open: true }));

      expect(result.current.flush.right).toBe(0);
      expect(result.current.flush.left).toBeUndefined();
      expect(getBoundingClientRect.mock.calls).toHaveLength(1);
    });

    it('sets left:0 when the component is eclipsed at the start', () => {
      const getBoundingClientRect = jest.fn();
      getBoundingClientRect.mockReturnValueOnce({ left: -8, right: 0 });

      const ref = { current: { getBoundingClientRect } };
      const { result } = renderHook(() => useFlush({ ...requiredProps, autoflush: true, ref, open: true }));

      expect(result.current.flush.left).toBe(0);
      expect(result.current.flush.right).toBeUndefined();
      expect(getBoundingClientRect.mock.calls).toHaveLength(1);
    });

    it('uses the original direction when the component is completely in view', () => {
      const getBoundingClientRect = jest.fn();
      getBoundingClientRect.mockReturnValueOnce({ left: 0, right: 2 });

      const ref = { current: { getBoundingClientRect } };
      const { result } = renderHook(() => useFlush({
        ...requiredProps,
        autoflush: true,
        initialDirection: 'right',
        ref,
        open: true,
      }));

      expect(result.current.flush.right).toBe(0);
      expect(result.current.flush.left).toBeUndefined();
      expect(getBoundingClientRect.mock.calls).toHaveLength(1);
    });
  });
});
