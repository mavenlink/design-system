import { useLayoutEffect, useState } from 'react';

export default function useTooltipPositioning({
  tooltipRef,
  triangleHeight,
  direction = 'top',
}) {
  const [target, setTarget] = useState(null);
  const [position, setPosition] = useState(null);

  const show = event => setTarget(event.target);
  const hide = () => setTarget(null);

  useLayoutEffect(() => {
    if (!target) {
      setPosition(null);
      return;
    }

    // "source" in this context is where the tooltip appears to being opening from
    const sourceRect = target.getBoundingClientRect();

    // Start from the top-left of the thing we want the tooltip to "open" from.
    const sourceX = sourceRect.x + window.scrollX;
    const sourceY = sourceRect.y + window.scrollY;
    const tooltipText = tooltipRef.current.getBoundingClientRect();

    let left;
    let top;

    if (direction === 'top') {
      left = sourceX + (sourceRect.width / 2) - (tooltipText.width / 2);
      top = sourceY - tooltipText.height - triangleHeight;
    } else if (direction === 'bottom') {
      left = sourceX + (sourceRect.width / 2) - (tooltipText.width / 2);
      top = sourceY + sourceRect.height + triangleHeight;
    } else if (direction === 'left') {
      left = sourceX - tooltipText.width - triangleHeight;
      top = sourceY + (sourceRect.height / 2) - (tooltipText.height / 2);
    } else if (direction === 'right') {
      left = sourceX + sourceRect.width + triangleHeight;
      top = sourceY + (sourceRect.height / 2) - (tooltipText.height / 2);
    }

    setPosition({ left, top });
  }, [target]);

  return {
    visible: !!target,
    position,
    show,
    hide,
  };
}
