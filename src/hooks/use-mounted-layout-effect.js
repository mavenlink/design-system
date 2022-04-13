import {
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

export default function useMountedLayoutEffect(callback, dependencies) {
  const mounted = useRef(false);

  // Run an synchronous effect if the component has already mounted.
  useLayoutEffect(() => {
    if (mounted.current) callback();
  }, dependencies);

  // Set the mounted ref (to avoid a re-render) _after_ attempting to run the provided effect
  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);
}
