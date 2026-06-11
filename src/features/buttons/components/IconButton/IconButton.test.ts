import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vite-plus/test';

import { IconButton } from '@/features/buttons';

describe('IconButton', () => {
  it('renders a button with its slotted icon', () => {
    const wrapper = mount(IconButton, { slots: { default: '<span class="icon" />' } });
    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.find('.icon').exists()).toBe(true);
  });

  it('applies variant and size classes', () => {
    const wrapper = mount(IconButton, { props: { variant: 'outline', size: 'lg' } });
    expect(wrapper.classes()).toContain('bg-transparent');
    expect(wrapper.classes()).toContain('p-4');
  });

  it('does not emit click when disabled', async () => {
    const onClick = vi.fn<(event: MouseEvent) => void>();
    const wrapper = mount(IconButton, { props: { disabled: true, onClick } });
    await wrapper.trigger('click');
    expect(onClick).not.toHaveBeenCalled();
  });
});
