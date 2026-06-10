import type { Component } from 'vue';

export interface ConfigType {
  /** Prefix applied to every registered custom element, e.g. `vetro-button`. */
  webComponentPrefix: string;
  /**
   * Component used to render image elements inside Vetro UI (e.g. `Avatar`).
   * Defaults to the native `'img'` tag. Hosts that want optimized images can
   * override at boot — e.g. `config.set('imageComponent', NuxtImg)`.
   */
  imageComponent: string | Component;
}

export const config = {
  config: {
    webComponentPrefix: 'vetro-',
    imageComponent: 'img',
  } as ConfigType,

  get<K extends keyof ConfigType>(keyName: K): ConfigType[K] {
    return this.config[keyName] as ConfigType[K];
  },

  set<K extends keyof ConfigType>(key: K, value: ConfigType[K]): void {
    this.config[key] = value;
  },
};
