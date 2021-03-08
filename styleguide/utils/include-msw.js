import { setupWorker } from 'msw';
import listHandlers from '../../src/components/list-option/mock-handlers.js';
import customFieldSingleHandlers from '../../src/components/custom-field-input-single-choice/mock-handlers.js';

setupWorker(...listHandlers, ...customFieldSingleHandlers).start({
  serviceWorker: {
    url: `${window.location.pathname}mockServiceWorker.js`,
  },
});
