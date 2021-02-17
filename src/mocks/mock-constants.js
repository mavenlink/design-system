// Define a root api endpoint for jest tests, use relative for styleguidist site
const API_ROOT = navigator.userAgent.includes('jsdom') ? 'http://localhost' : '';

export default { API_ROOT };
