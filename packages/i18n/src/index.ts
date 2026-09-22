import commonEn from './locales/en/common.json';

export const defaultNS = 'common';

export const sharedResources = {
  en: {
    common: commonEn,
  },
} as const;

export { commonEn };
