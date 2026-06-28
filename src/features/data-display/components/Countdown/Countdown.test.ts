import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vite-plus/test';

import { Countdown } from '@/features/data-display';

describe('Countdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders countdown container', () => {
    const wrapper = mount(Countdown, {
      props: { startDate: '2026-01-01T00:01:00Z' },
    });
    expect(wrapper.find('[data-slot="countdown"]').exists()).toBe(true);
  });
});
