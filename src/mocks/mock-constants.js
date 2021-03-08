// Define a root api endpoint for jest tests, use relative for styleguidist site
const API_ROOT = navigator.userAgent.includes('jsdom') ? 'http://localhost/api/v1' : '/api/v1';

export default { API_ROOT };
