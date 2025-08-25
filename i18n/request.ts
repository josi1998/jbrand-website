import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';
import type { GetRequestConfigParams } from 'next-intl/server';

export default getRequestConfig(async ({ locale }: GetRequestConfigParams) => {
  // Ensure locale is valid, fallback to default if not
  const validLocale = locale && locales.includes(locale) ? locale : defaultLocale;
  
  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default,
    timeZone: 'UTC'
  };
}); 