// Define a root api endpoint for jest tests
const API_ROOT = navigator.userAgent.includes('jsdom') ? 'http://mavenlink.api.com' : '';

export { API_ROOT }; // eslint-disable-line import/prefer-default-export
