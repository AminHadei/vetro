import { createVariants, prefixUnoClasses } from '@/features/shared/lib/utils/variants.util';

import { TOGGLE_VARIANT_OUTLINE_MUTED } from './toggle.constants';
import type { ToggleVariant } from './toggle.types';

export const toggleVariants = createVariants({
  base: ':uno: inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      default: ':uno: bg-transparent hover:bg-muted/70 hover:text-muted-foreground',
      outlined:
        ':uno: border-2 border-input bg-transparent hover:bg-accent hover:text-accent-foreground/80',
      solid:
        ':uno: border-2 border-input bg-transparent hover:border-secondary hover:bg-secondary hover:text-secondary-foreground',
      [TOGGLE_VARIANT_OUTLINE_MUTED]:
        ':uno: border-2 border-input bg-transparent hover:bg-muted/70 hover:text-muted-foreground',
    },
    size: {
      default: ':uno: h-10 min-w-10 px-3',
      sm: ':uno: h-9 min-w-9 px-2.5',
      lg: ':uno: h-11 min-w-11 px-5',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export const togglePressedClasses: Record<ToggleVariant, string> = {
  default: prefixUnoClasses('bg-muted text-muted-foreground'),
  outlined: prefixUnoClasses('bg-accent text-accent-foreground'),
  solid: prefixUnoClasses('border-secondary bg-secondary text-secondary-foreground'),
  [TOGGLE_VARIANT_OUTLINE_MUTED]: prefixUnoClasses('bg-muted text-muted-foreground'),
};
