import { type Ref, getCurrentInstance, onMounted, ref } from 'vue';

/** Teleport target that stays inside a web component shadow root when applicable. */
export const useTeleportTarget = (defaultTarget: string = 'body'): Ref<string | ShadowRoot> => {
  const teleportTarget = ref<string | ShadowRoot>(defaultTarget);

  onMounted(() => {
    const instance = getCurrentInstance();
    if (instance === null) {
      return;
    }

    try {
      const el = instance.vnode.el as Node | null;
      if (el !== null) {
        const rootNode = el.getRootNode();
        if (rootNode instanceof ShadowRoot) {
          teleportTarget.value = rootNode;
        }
      }
    } catch {
      // fall back to defaultTarget
    }
  });

  return teleportTarget;
};
