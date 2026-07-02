import type { Meta, StoryObj } from '@storybook/vue3-vite';

import {
  loadWebcBundle,
  renderMissingBundleBanner,
  type LoadResult,
} from '@/features/shared/lib/utils/webc-story-helpers';

const TAG = 'vetro-button';
const BUNDLE_URL = './webc-bundles/button.js';

interface WebcArgs {
  variant: 'default' | 'secondary' | 'outline' | 'link' | 'ghost';
  label: string;
  disabled: boolean;
}

const renderWebc = (args: WebcArgs): HTMLElement => {
  const wrapper = document.createElement('div');
  wrapper.style.padding = '1rem';
  wrapper.innerHTML = `
    <${TAG}
      variant="${args.variant}"
      ${args.disabled ? 'disabled' : ''}
    >${args.label}</${TAG}>
  `;
  return wrapper;
};

async function loadButtonWebcBundle(): Promise<LoadResult> {
  const result = await loadWebcBundle(TAG, BUNDLE_URL);
  return result;
}

const meta: Meta<WebcArgs> = {
  title: 'Web Components/Button (webc)',
  tags: ['webc'],
  loaders: [loadButtonWebcBundle],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'link', 'ghost'],
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    label: 'Click me',
    disabled: false,
  },
  render: (args, context): object => ({
    setup: (): { args: WebcArgs } => ({ args }),
    template: '<div ref="root"></div>',
    mounted(): void {
      const { bundleError } = context.loaded as LoadResult;
      const root = (this as unknown as { $refs: { root: HTMLElement } }).$refs.root;
      root.replaceChildren(
        bundleError === null ? renderWebc(args) : renderMissingBundleBanner(bundleError),
      );
    },
  }),
};

export default meta;
type Story = StoryObj<WebcArgs>;

export const Default: Story = {};

export const Outline: Story = {
  args: { variant: 'outline', label: 'Outline' },
};
