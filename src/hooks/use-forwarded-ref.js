import { useRef } from 'react';

export default function useForwardedRef(ref) {
  const backupRef = useRef();

  return ref || backupRef;
}
