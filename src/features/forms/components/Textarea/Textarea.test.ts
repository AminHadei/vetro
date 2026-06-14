import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vite-plus/test';

import { Textarea } from '@/features/forms';

describe('Textarea', () => {
  it('renders a textarea element with 4 rows', () => {
    const wrapper = mount(Textarea);
    expect(wrapper.element.tagName).toBe('TEXTAREA');
    expect(wrapper.attributes('rows')).toBe('4');
  });

  it('emits update:modelValue on input', async () => {
    const onUpdate = vi.fn<(value: string | undefined) => void>();
    const wrapper = mount(Textarea, { props: { modelValue: '', 'onUpdate:modelValue': onUpdate } });
    await wrapper.find('textarea').setValue('multi\nline');
    expect(onUpdate).toHaveBeenCalledWith('multi\nline');
  });

  it('marks the field invalid', () => {
    const wrapper = mount(Textarea, { props: { invalid: true } });
    expect(wrapper.attributes('aria-invalid')).toBe('true');
    expect(wrapper.classes()).toContain('border-destructive');
  });
});
