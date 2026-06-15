/** RetroUI variant id; split so UnoCSS does not static-scan the key. */
// eslint-disable-next-line typescript-eslint/no-unnecessary-template-expression -- intentional split literal
export const TOGGLE_VARIANT_OUTLINE_MUTED = ['outline', 'muted'].join('-') as `${'outline'}-${'muted'}`;
