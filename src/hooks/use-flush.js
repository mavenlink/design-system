import { useLayoutEffect, useState } from 'react';

export default function useFlush({ ref, initialDirection = 'left', open, autoflush }) {
  const [flush, setFlush] = useState(initialDirection);

  useLayoutEffect(() => {
    if (!open || !autoflush || !ref.current) return;

    const { right, left } = ref.current.getBoundingClientRect();
    if (right > window.innerWidth) {
      setFlush('right');
    } else if (left < 0) {
      setFlush('left');
    } else {
      setFlush(flush);
    }
  }, [open]);

  return {
    flush: {
      left: flush === 'left' ? 0 : undefined,
      right: flush === 'right' ? 0 : undefined,
    },
  };
}
