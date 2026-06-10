import type { Plugin } from 'vite';

const UTILITY_CHARS = /^[\w[\]:/%.\\&>*+~,]+(?:\s+[\w[\]:/%.\\&>*+~,]+)*$/u;

const SKIP_LITERAL =
  /^(?:https?:|@\/|\.\/|#|data:|\/|vetro-|Vetro[A-Z]|on[A-Z]|aria-|slot=|<|\{|\}|true|false|none|single|multiple|horizontal|vertical|top|bottom|left|right|center|start|end|sm|md|lg|xl|2xl|3xl|4xl|5xl|xs|retro|dark|light|button|submit|reset|checkbox|radio|switch|slider|dialog|drawer|menu|tab|toast|copied|open|closed|selected|invalid|pressed|active|inactive|default|outline|ghost|link|destructive|secondary|primary|accent|muted|card|popover|input|ring|background|foreground|solid|dashed|dotted|double|hidden|visible|collapse|static|sticky|fixed|relative|absolute|block|inline|flex|grid|table|contents|list-item|truncate|italic|bold|normal|medium|semibold|black|white|mono|sans|head|noto|figtree|archivo|grotesk|space|mono|check|clipboard|chevron|loader|spinner|bounce|ease|linear|step|jump|pulse|spin|ping|fade|slide|zoom|flip)$/iu;

const TAILWIND_TOKEN =
  /\b(?:flex|grid|inline-flex|inline-block|border(?:-\w+)?|bg-(?:\w+)|text-(?:\w+)|(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(?:\w+)|gap-(?:\w+)|hover:[\w-]+|focus(?:-visible)?:[\w-]+|rounded(?:-\w+)?|shadow(?:-\w+)?|font-(?:\w+)|items-(?:\w+)|justify-(?:\w+)|w-(?:\w+)|h-(?:\w+)|size-(?:\w+)|cursor-(?:\w+)|transition(?:-\w+)?|opacity-(?:\w+)|pointer-events-(?:\w+)|translate(?:-\w+)?|rotate(?:-\w+)?|z-(?:\w+)|fixed|absolute|relative|sticky|static|block|hidden|truncate|underline(?:-\w+)?|ring(?:-\w+)?|outline(?:-\w+)?|min-(?:\w+)|max-(?:\w+)|leading-(?:\w+)|tracking-(?:\w+)|whitespace-(?:\w+)|overflow(?:-\w+)?|inset(?:-\w+)?|top-(?:\w+)|bottom-(?:\w+)|left-(?:\w+)|right-(?:\w+)|group(?:-\w+)?|data-(?:\w+)|disabled:[\w-]+|i-[\w-]+|sr-only|aspect-(?:\w+)|shrink(?:-\w+)?|grow(?:-\w+)?|basis-(?:\w+)|col-(?:\w+)|row-(?:\w+)|space-(?:\w+)|decoration-(?:\w+)|placeholder:[\w-]+|peer(?:-\w+)?|align-(?:\w+)|self-(?:\w+)|place-(?:\w+)|order-(?:\w+)|float-(?:\w+)|clear-(?:\w+)|list-(?:\w+)|columns-(?:\w+)|break-(?:\w+)|from-(?:\w+)|to-(?:\w+)|via-(?:\w+)|animate-(?:\w+)|duration-(?:\w+)|ease-(?:\w+)|delay-(?:\w+)|content-(?:\w+)|accent-(?:\w+)|caret-(?:\w+)|scroll-(?:\w+)|snap-(?:\w+)|touch-(?:\w+)|select-(?:\w+)|resize(?:-\w+)?|marker-(?:\w+)|indent-(?:\w+)|hyphens-(?:\w+)|wrap(?:-\w+)?|nowrap|pre(?:-\w+)?|tabular-(?:\w+)|normal-(?:\w+)|ordinal(?:-\w+)?|slashed-(?:\w+)|stack-(?:\w+)|diagonal-(?:\w+)|fractions(?:-\w+)?|not-(?:\w+)|line-through|uppercase|lowercase|capitalize|normal-case|overline|no-underline|visible|invisible|collapse|container|isolate|mix-(?:\w+)|blur(?:-\w+)?|brightness-(?:\w+)|contrast-(?:\w+)|grayscale|hue-rotate(?:-\w+)?|invert|saturate-(?:\w+)|sepia|drop-shadow(?:-\w+)?|filter|backdrop-(?:\w+)|will-change|contain-(?:\w+)|overscroll-(?:\w+)|object-(?:\w+)|fill-(?:\w+)|stroke-(?:\w+)|antialiased|italic|line-clamp-(?:\w+)|caption-(?:\w+)|table-(?:\w+)|border-collapse|overscroll-contain|scroll-my-(?:\w+)|min-h-(?:\w+)|min-w-(?:\w+)|max-h-(?:\w+)|max-w-(?:\w+)|h-fit|w-fit|w-full|h-full|size-full|basis-full|align-middle|select-none|cursor-default|cursor-pointer|font-head|font-sans|font-mono|font-medium|font-semibold|font-bold|font-normal|text-center|text-left|text-right|text-ellipsis|border-b|border-t|border-l|border-r|border-b-2|border-t-2|border-l-2|border-r-2|border-2|border-transparent|rounded-b|rounded-t|rounded-full|rounded-sm|rounded-xs|bg-transparent|bg-accent|bg-background|bg-card|bg-input|bg-popover|bg-primary|bg-secondary|bg-muted|bg-foreground|text-foreground|text-muted-foreground|text-primary|text-primary-foreground|text-secondary-foreground|text-accent-foreground|text-destructive|text-card-foreground|text-popover-foreground|text-background|border-border|border-input|border-destructive|border-secondary|border-foreground|shadow-destructive|shadow-xs|shadow-md|shadow-lg|outline-none|outline-2|outline-border|outline-foreground|outline-muted|outline-primary|underline-offset-2|decoration-primary|translate-x-0|translate-x-5|-translate-x-1\/2|-translate-y-1\/2|-ml-4|-mt-4|-mx-1|-bottom-12|-left-12|-right-12|-top-12|-left-1|-top-1|left-1\/2|top-1\/2|w-3\/4|max-h-\[[^\]]+\]|min-w-\[[^\]]+\]|h-60|h-80|w-52|w-72|w-11|me-2|mr-2|ml-2|ml-auto|ms-auto|mt-auto|my-1|my-2|mb-1|mb-2|mt-2|pl-2|pl-4|pr-8|pt-2|pt-4|pb-4|p-0|p-1|p-2|p-3|p-4|px-2|px-3|px-4|px-5|px-6|py-1|py-2|py-3|py-6|gap-1|gap-2|gap-3|gap-4|flex-1|flex-col|flex-row|flex-wrap|grow-0|items-center|items-stretch|justify-between|justify-center|justify-end|justify-start|leading-none|leading-normal|leading-snug|duration-200|ease|transform|transition|transition-all|transition-colors|transition-transform|animate-bounce|invert|dark|with-radius|\[&[^\]]+\])\b/u;

const hasUtilityShape = (value: string): boolean => {
  const trimmed = value.trim();
  if (trimmed === '' || trimmed.includes(':uno:')) {
    return false;
  }
  if (!UTILITY_CHARS.test(trimmed)) {
    return false;
  }
  if (SKIP_LITERAL.test(trimmed)) {
    return false;
  }
  return TAILWIND_TOKEN.test(trimmed);
};

export const prefixClassValue = (value: string): string => {
  const trimmed = value.trim();
  if (!hasUtilityShape(trimmed)) {
    return trimmed;
  }
  return `:uno: ${trimmed}`;
};

const prefixQuotedUtilityLiterals = (code: string): string =>
  code.replaceAll(/(['"`])((?:\\.|(?!\1)[\s\S])*?)\1/gu, (match, quote: string, content: string) => {
    if (quote === '`' && content.includes('${')) {
      return match;
    }
    const prefixed = prefixClassValue(content);
    return prefixed === content ? match : `${quote}${prefixed}${quote}`;
  });

/** Prepends `:uno:` to utility strings so production CSS compiles to hashed selectors. */
export const prefixUnoClassAttributes = (): Plugin => ({
  name: 'vetro:prefix-uno-class-attributes',
  enforce: 'pre',
  transform(code, id): string | undefined {
    if (!id.includes('/src/features/') || (!id.endsWith('.vue') && !id.endsWith('.ts'))) {
      return undefined;
    }
    if (id.includes('.test.') || id.includes('.stories.') || id.includes('.webc.')) {
      return undefined;
    }

    let next = code;
    if (id.endsWith('.vue')) {
      next = next.replaceAll(
        /(^|[\s>])class="([^"]*)"/g,
        (_match: string, lead: string, cls: string) => `${lead}class="${prefixClassValue(cls)}"`,
      );
      next = next.replaceAll(
        /(^|[\s>])class='([^']*)'/g,
        (_match: string, lead: string, cls: string) => `${lead}class='${prefixClassValue(cls)}'`,
      );
    }

    next = prefixQuotedUtilityLiterals(next);

    return next === code ? undefined : next;
  },
});
