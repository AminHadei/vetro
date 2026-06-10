/**
 * Neo-brutalist design tokens, ported from RetroUI.
 *
 * Exposed as raw CSS so the variables travel with the generated UnoCSS bundle
 * (`virtual:uno.css` → `core.css` → web-component shadow roots). Theme colours
 * are referenced from `uno.config.ts` via `var(--token)`, which lets host apps
 * switch palettes (`.dark`, `.theme-*`) purely through CSS classes.
 */
export const themePreflight = `
:root {
  --radius: 0px;
  --background: #f5ece7;
  --foreground: #000000;
  --card: #ffffff;
  --card-foreground: #000000;
  --popover: #ffffff;
  --popover-foreground: #000000;
  --primary: #ffdb33;
  --primary-hover: #ffcc00;
  --primary-foreground: #000000;
  --secondary: #000000;
  --secondary-hover: #1a1a1a;
  --secondary-foreground: #ffffff;
  --muted: #d5d5d5;
  --muted-foreground: #5a5a5a;
  --accent: #fae583;
  --accent-foreground: #000000;
  --destructive: #e63946;
  --destructive-foreground: #ffffff;
  --border: #000000;
  --input: #ffffff;
  --ring: #000000;
  --chart-1: #c4a1ff;
  --chart-2: #01ffcc;
  --chart-3: #e7f192;
  --chart-4: #000000;
  --chart-5: #ff30cd;
}

.dark {
  --background: #1a1a1a;
  --foreground: #f5f5f5;
  --card: #242424;
  --card-foreground: #f5f5f5;
  --popover: #242424;
  --popover-foreground: #f5f5f5;
  --primary: #ffdb33;
  --primary-hover: #ffcc00;
  --primary-foreground: #000000;
  --secondary: #3a3a3a;
  --secondary-hover: #4a4a4a;
  --secondary-foreground: #f5f5f5;
  --muted: #3f3f46;
  --muted-foreground: #a0a0a0;
  --accent: #fae583;
  --accent-foreground: #000000;
  --destructive: #e63946;
  --destructive-foreground: #ffffff;
  --border: #5c5c5c;
  --input: #2a2a2a;
  --ring: #ffdb33;
  --chart-1: #ffdb33;
  --chart-2: #000000;
  --chart-3: #aeaeae;
  --chart-4: #fae583;
  --chart-5: #e63946;
}

.with-radius {
  --radius: 0.5rem;
}

.theme-purple {
  --background: #f5f5f5;
  --foreground: #1a1a1a;
  --card: #ffffff;
  --card-foreground: #1a1a1a;
  --popover: #ffffff;
  --popover-foreground: #1a1a1a;
  --primary: #5f4fe6;
  --primary-hover: #4938c2;
  --primary-foreground: #ffffff;
  --secondary: #3a3a3a;
  --secondary-foreground: #f5f5f5;
  --muted: #cfccea;
  --muted-foreground: #5b5686;
  --accent: #fed13b;
  --accent-foreground: #000000;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #3a3a3a;
  --ring: #5f4fe6;
}

.dark .theme-purple {
  --background: #0f0f12;
  --foreground: #f5f5f5;
  --card: #1a1a1d;
  --card-foreground: #eaeaea;
  --popover: #1a1a1d;
  --popover-foreground: #eaeaea;
  --primary: #7b6df5;
  --primary-hover: #5f4fe6;
  --primary-foreground: #ffffff;
  --secondary: #2a2a2e;
  --secondary-foreground: #eaeaea;
  --muted: #3d395a;
  --muted-foreground: #a49fce;
  --accent: #fed13b;
  --accent-foreground: #000000;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #2e2e32;
}

.theme-lime {
  --background: #ffffff;
  --foreground: #000000;
  --card: #ffffff;
  --card-foreground: #000000;
  --popover: #ffffff;
  --popover-foreground: #000000;
  --input: #ffffff;
  --border: #000000;
  --ring: #aafc3d;
  --primary: #aafc3d;
  --primary-hover: #97f819;
  --primary-foreground: #000000;
  --secondary: #000000;
  --secondary-foreground: #ffffff;
  --muted: #f3f3f3;
  --muted-foreground: #444444;
  --accent: #ff4fd8;
  --accent-foreground: #000000;
  --destructive: #ff0033;
  --destructive-foreground: #ffffff;
}

.dark .theme-lime {
  --background: #0f0f0f;
  --foreground: #f5f5f5;
  --card: #1a1a1a;
  --card-foreground: #ffffff;
  --popover: #1a1a1a;
  --popover-foreground: #ffffff;
  --input: #2a2a2a;
  --border: #333333;
  --ring: #aafc3d;
  --primary: #aafc3d;
  --primary-hover: #97f819;
  --primary-foreground: #000000;
  --secondary: #ffffff;
  --secondary-foreground: #000000;
  --muted: #2a2a2a;
  --muted-foreground: #aaaaaa;
  --accent: #ff4fd8;
  --accent-foreground: #000000;
  --destructive: #ff0033;
  --destructive-foreground: #ffffff;
}

.theme-red {
  --background: #fcffe7;
  --foreground: #000000;
  --muted: #efd0d5;
  --muted-foreground: #a42439;
  --card: #ffffff;
  --card-foreground: #000000;
  --popover: #ffffff;
  --popover-foreground: #000000;
  --border: #000000;
  --input: #ffffff;
  --primary: #ea435f;
  --primary-hover: #d00000;
  --primary-foreground: #ffffff;
  --secondary: #ffda5c;
  --secondary-foreground: #000000;
  --accent: #ceebfc;
  --accent-foreground: #000000;
  --destructive: #d00000;
  --destructive-foreground: #ffffff;
  --ring: #000000;
}

.dark .theme-red {
  --background: #0f0f0f;
  --foreground: #f5f5f5;
  --muted: #3a1f24;
  --muted-foreground: #f2a7b2;
  --card: #1a1a1a;
  --card-foreground: #ffffff;
  --popover: #1a1a1a;
  --popover-foreground: #ffffff;
  --border: #2a2a2a;
  --input: #2a2a2a;
  --primary: #ea435f;
  --primary-hover: #d00000;
  --primary-foreground: #ffffff;
  --secondary: #ffda5c;
  --secondary-foreground: #000000;
  --accent: #2a3b45;
  --accent-foreground: #ceebfc;
  --destructive: #d00000;
  --destructive-foreground: #ffffff;
  --ring: #ea435f;
}

.theme-lavender {
  --background: #f9f5f2;
  --foreground: #000000;
  --muted: #ede3ff;
  --muted-foreground: #5b3b98;
  --card: #ffffff;
  --card-foreground: #000000;
  --popover: #ffffff;
  --popover-foreground: #000000;
  --border: #000000;
  --input: #ffffff;
  --primary: #c4a1ff;
  --primary-hover: #9678ff;
  --primary-foreground: #000000;
  --secondary: #e7f193;
  --secondary-foreground: #000000;
  --accent: #fe91e9;
  --accent-foreground: #000000;
  --destructive: #fe3b3b;
  --destructive-foreground: #ffffff;
  --ring: #000000;
}

.dark .theme-lavender {
  --background: #121014;
  --foreground: #f5f5f5;
  --muted: #2d2440;
  --muted-foreground: #c7b6f3;
  --card: #1a1820;
  --card-foreground: #ffffff;
  --popover: #1a1820;
  --popover-foreground: #ffffff;
  --border: #2a2a2e;
  --input: #2a2a2e;
  --primary: #c4a1ff;
  --primary-hover: #9678ff;
  --primary-foreground: #000000;
  --secondary: #e7f193;
  --secondary-foreground: #000000;
  --accent: #fe91e9;
  --accent-foreground: #000000;
  --destructive: #fe3b3b;
  --destructive-foreground: #ffffff;
  --ring: #c4a1ff;
}

.theme-orange {
  --background: #ffffff;
  --foreground: #000000;
  --muted: #ffe1c7;
  --muted-foreground: #8c3d00;
  --card: #ffffff;
  --card-foreground: #000000;
  --popover: #ffffff;
  --popover-foreground: #000000;
  --border: #000000;
  --input: #ffffff;
  --primary: #f07200;
  --primary-hover: #ff8011;
  --primary-foreground: #fdead9;
  --secondary: #ef8c27;
  --secondary-foreground: #000000;
  --accent: #ff6b6b;
  --accent-foreground: #000000;
  --destructive: #fe3b3b;
  --destructive-foreground: #ffffff;
  --ring: #000000;
}

.dark .theme-orange {
  --background: #12100e;
  --foreground: #f5f5f5;
  --muted: #3a2617;
  --muted-foreground: #ffb679;
  --card: #1a1a1a;
  --card-foreground: #ffffff;
  --popover: #1a1a1a;
  --popover-foreground: #ffffff;
  --border: #2a2a2a;
  --input: #2a2a2a;
  --primary: #f07200;
  --primary-hover: #ff8011;
  --primary-foreground: #fdead9;
  --secondary: #ef8c27;
  --secondary-foreground: #000000;
  --accent: #ff6b6b;
  --accent-foreground: #000000;
  --destructive: #fe3b3b;
  --destructive-foreground: #ffffff;
  --ring: #f07200;
}

.theme-green {
  --background: #ffffff;
  --foreground: #000000;
  --muted: #cbe9d8;
  --muted-foreground: #1f7751;
  --card: #f9f5f2;
  --card-foreground: #000000;
  --popover: #ffffff;
  --popover-foreground: #000000;
  --border: #000000;
  --input: #ffffff;
  --primary: #599d77;
  --primary-hover: #39654c;
  --primary-foreground: #ffffff;
  --secondary: #a3d9b1;
  --secondary-foreground: #000000;
  --accent: #ffe75a;
  --accent-foreground: #000000;
  --destructive: #f05d5d;
  --destructive-foreground: #ffffff;
  --ring: #000000;
}

.dark .theme-green {
  --background: #0f1210;
  --foreground: #f5f5f5;
  --muted: #1f3a2d;
  --muted-foreground: #9cd9b8;
  --card: #181c19;
  --card-foreground: #ffffff;
  --popover: #181c19;
  --popover-foreground: #ffffff;
  --border: #2a2e2b;
  --input: #2a2e2b;
  --primary: #599d77;
  --primary-hover: #39654c;
  --primary-foreground: #ffffff;
  --secondary: #3a6f52;
  --secondary-foreground: #ffffff;
  --accent: #ffe75a;
  --accent-foreground: #000000;
  --destructive: #f05d5d;
  --destructive-foreground: #ffffff;
  --ring: #599d77;
}
`;
