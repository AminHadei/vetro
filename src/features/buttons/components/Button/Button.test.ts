import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vite-plus/test';

import { Button } from '@/features/buttons';

describe('Button', () => {
  it('renders a <button> by default', () => {
    const wrapper = mount(Button, { slots: { default: 'Click me' } });

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.text()).toBe('Click me');
    expect(wrapper.attributes('type')).toBe('button');
  });

  it('renders an <a> when href is provided', () => {
    const wrapper = mount(Button, {
      props: { href: 'https://example.com' },
      slots: { default: 'Link' },
    });

    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe('https://example.com');
  });

  it('applies the default variant and size classes', () => {
    const wrapper = mount(Button);

    expect(wrapper.classes()).toContain('bg-primary');
    expect(wrapper.classes()).toContain('border-2');
    expect(wrapper.classes()).toContain('px-4');
  });

  it('applies the requested variant', () => {
    const wrapper = mount(Button, { props: { variant: 'outline' } });

    expect(wrapper.classes()).toContain('bg-transparent');
    expect(wrapper.classes()).not.toContain('bg-primary');
  });

  it('applies the requested size', () => {
    const wrapper = mount(Button, { props: { size: 'lg' } });

    expect(wrapper.classes()).toContain('px-6');
    expect(wrapper.classes()).toContain('text-lg');
  });

  it('forwards native click listeners to the root element', async () => {
    const onClick = vi.fn<(event: MouseEvent) => void>();
    const wrapper = mount(Button, { attrs: { onClick } });

    await wrapper.trigger('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('marks the button as disabled', () => {
    const wrapper = mount(Button, { props: { disabled: true } });

    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.attributes('aria-disabled')).toBe('true');
  });

  it('blocks interaction for a disabled link', () => {
    const wrapper = mount(Button, { props: { href: 'https://example.com', disabled: true } });

    expect(wrapper.classes()).toContain('pointer-events-none');
    expect(wrapper.attributes('href')).toBeUndefined();
  });

  it('forwards extra attributes to the root element', () => {
    const wrapper = mount(Button, {
      attrs: { 'data-testid': 'cta', 'aria-label': 'Submit' },
    });

    expect(wrapper.attributes('data-testid')).toBe('cta');
    expect(wrapper.attributes('aria-label')).toBe('Submit');
  });
});
