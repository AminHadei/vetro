import styles from 'virtual:core-styles';
import { defineCustomElement, type Component, type ComponentOptions } from 'vue';

import { config } from '@/config';

import { adoptSharedWebComponentStyles } from './web-component-style.util';

import resetTailwind from '@unocss/reset/tailwind.css?raw';

const sharedStyles = [
  {
    id: 'tailwind-reset',
    cssText: resetTailwind.replaceAll(':root', ':host'),
  },
  {
    id: 'core-style',
    cssText: styles.replaceAll(':root', ':host'),
  },
];

/**
 * Registers a Vue component as a custom element with the shared Vetro styles
 * (Tailwind reset + generated `core.css`) adopted into its shadow root.
 */
export const defineVetroElement = (tagSuffix: string, component: Component): void => {
  const ElementBase = defineCustomElement(component as ComponentOptions);

  class VetroElement extends ElementBase {
    public override connectedCallback(): void {
      super.connectedCallback();
      adoptSharedWebComponentStyles((this as unknown as HTMLElement).shadowRoot, sharedStyles);
    }
  }

  customElements.define(`${config.get('webComponentPrefix')}${tagSuffix}`, VetroElement);
};
