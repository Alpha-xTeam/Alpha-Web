// sentry.ts - إعداد Sentry للمشروع
import * as Sentry from '@sentry/react';

export const initSentry = () => {
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

  if (!sentryDsn) {
    console.warn('Sentry DSN not found. Skipping Sentry initialization.');
    return;
  }

  Sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.MODE || 'development',
    // Performance Monitoring
    tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
    // Don't send errors in development unless explicitly enabled
    beforeSend(event) {
      if (import.meta.env.MODE === 'development') {
        console.log('Sentry Event:', event);
        return null; // Don't send in development
      }
      return event;
    },
  });
};

export { Sentry };