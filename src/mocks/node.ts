import { setupServer } from 'msw/node';

/**
 * Aggregates MSW handlers for Vitest. Add feature handlers when mocking API calls:
 *
 * ```ts
 * import { myFeatureMockHandlers } from '@/features/my-feature/lib/__mock__';
 * const handlers = [...myFeatureMockHandlers];
 * ```
 */
const handlers: Parameters<typeof setupServer>[number][] = [];

export const server = setupServer(...handlers);
