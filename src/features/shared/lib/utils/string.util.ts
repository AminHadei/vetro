export const randomUuid = (): string => crypto.randomUUID();

export const randomInputId = (): string => `input-${randomUuid().split('-')[0]}`;
