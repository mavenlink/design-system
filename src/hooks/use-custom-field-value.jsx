import { useImperativeHandle } from 'react';

export default function useCustomFieldValue(id, ref, getValue) {
  useImperativeHandle(ref, () => ({
    id,
    get value() {
      return getValue();
    },
  }));
}
