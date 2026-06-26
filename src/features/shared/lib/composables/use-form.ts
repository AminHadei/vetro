import { useAttrs } from 'vue';

import { randomInputId } from '../utils/string.util';

interface UseForm {
  attrId: string;
}

export function useForm(): UseForm {
  const attrs = useAttrs();
  const id = attrs['id'];
  const attrId = typeof id === 'string' ? id : randomInputId();

  return { attrId };
}
