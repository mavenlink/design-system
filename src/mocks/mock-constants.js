// Define a root api endpoint for jest tests, use relative for styleguidist site
// eslint-disable-next-line import/prefer-default-export
export const API_ROOT = navigator.userAgent.includes('jsdom') ? 'http://localhost/api/v1' : '/api/v1';
