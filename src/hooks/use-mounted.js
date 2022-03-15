import {
  useEffect,
  useRef,
} from 'react';

// Deprecated. Use `useMountedEffect` instead.
export default function useMounted() {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return mounted;
}
