import type { InjectionKey, Ref } from 'vue';

export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface AvatarContext {
  status: Ref<ImageLoadingStatus>;
  setStatus: (status: ImageLoadingStatus) => void;
}

export const avatarContextKey: InjectionKey<AvatarContext> = Symbol('VetroAvatar');
