import { act, renderHook } from '@testing-library/react-hooks';
import useTooltipPositioning from './use-tooltip-positioning.js';

describe('use-tooltip-positioning', () => {
  const requiredProps = {
    triangleHeight: 6,
    tooltipRef: { current: { getBoundingClientRect: () => ({}) } },
  };

  it('visible is false initially', () => {
    const { result } = renderHook(() => useTooltipPositioning(requiredProps));
    expect(result.current.visible).toBe(false);
  });

  it('visible is true after show is called', () => {
    const target = { getBoundingClientRect: () => ({}) };

    const { result } = renderHook(() => useTooltipPositioning(requiredProps));
    act(() => result.current.show({ target }));
    expect(result.current.visible).toBe(true);
  });

  it('is not visible after hide is called', () => {
    const target = { getBoundingClientRect: () => ({}) };

    const { result } = renderHook(() => useTooltipPositioning(requiredProps));
    act(() => result.current.show({ target }));
    act(() => result.current.hide());
    expect(result.current.visible).toBe(false);
  });

  describe('position and direction', () => {
    const tooltipRect = {
      height: 20,
      width: 40,
      x: 60,
      y: 80,
    };
    const triangleHeight = 5;
    const sourceRect = {
      height: 2,
      width: 4,
      x: 6,
      y: 8,
    };
    const target = { getBoundingClientRect: () => (sourceRect) };

    it('direction = top sets the position central horizontally and above vertically', () => {
      const { result } = renderHook(() => useTooltipPositioning({
        direction: 'top',
        triangleHeight,
        tooltipRef: {
          current: {
            getBoundingClientRect: () => tooltipRect,
          },
        },
      }));

      act(() => result.current.show({ target }));

      expect(result.current.position).toEqual({
        left: sourceRect.x + (sourceRect.width / 2) - (tooltipRect.width / 2),
        top: sourceRect.y - tooltipRect.height - triangleHeight,
      });
    });

    it('direction = bottom sets the position central horizontally and below vertically', () => {
      const { result } = renderHook(() => useTooltipPositioning({
        direction: 'bottom',
        triangleHeight,
        tooltipRef: {
          current: {
            getBoundingClientRect: () => tooltipRect,
          },
        },
      }));

      act(() => result.current.show({ target }));

      expect(result.current.position).toEqual({
        left: sourceRect.x + (sourceRect.width / 2) - (tooltipRect.width / 2),
        top: sourceRect.y + sourceRect.height + triangleHeight,
      });
    });

    it('direction = left sets the position to the left horizontally and centered vertically', () => {
      const { result } = renderHook(() => useTooltipPositioning({
        direction: 'left',
        triangleHeight,
        tooltipRef: {
          current: {
            getBoundingClientRect: () => tooltipRect,
          },
        },
      }));

      act(() => result.current.show({ target }));

      expect(result.current.position).toEqual({
        left: sourceRect.x - tooltipRect.width - triangleHeight,
        top: sourceRect.y + (sourceRect.height / 2) - (tooltipRect.height / 2),
      });
    });

    it('direction = right sets the position to the right horizontally and centered vertically', () => {
      const { result } = renderHook(() => useTooltipPositioning({
        direction: 'right',
        triangleHeight,
        tooltipRef: {
          current: {
            getBoundingClientRect: () => tooltipRect,
          },
        },
      }));

      act(() => result.current.show({ target }));

      expect(result.current.position).toEqual({
        left: sourceRect.x + sourceRect.width + triangleHeight,
        top: sourceRect.y + (sourceRect.height / 2) - (tooltipRect.height / 2),
      });
    });
  });
});
