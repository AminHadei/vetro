import { setupWorker } from 'msw/browser';

/**
 * Browser MSW worker for Storybook and local dev. Register handlers in `node.ts` parity.
 */
const handlers: Parameters<typeof setupWorker>[number][] = [];

export const worker = setupWorker(...handlers);
