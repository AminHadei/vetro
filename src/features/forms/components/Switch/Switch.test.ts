import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vite-plus/test';

import { Switch } from '@/features/forms';

describe('Switch', () => {
  it('renders with role="switch"', () => {
    const wrapper = mount(Switch, { props: { modelValue: false } });
    expect(wrapper.attributes('role')).toBe('switch');
    expect(wrapper.attributes('aria-checked')).toBe('false');
  });

  it('toggles on click', async () => {
    const onUpdate = vi.fn<(value: boolean) => void>();
    const wrapper = mount(Switch, {
      props: { modelValue: false, 'onUpdate:modelValue': onUpdate },
    });
    await wrapper.trigger('click');
    expect(onUpdate).toHaveBeenCalledWith(true);
  });

  it('does not toggle when disabled', async () => {
    const onUpdate = vi.fn<(value: boolean) => void>();
    const wrapper = mount(Switch, {
      props: { modelValue: false, disabled: true, 'onUpdate:modelValue': onUpdate },
    });
    await wrapper.trigger('click');
    expect(onUpdate).not.toHaveBeenCalled();
  });
});
