import { setupWorker } from 'msw';
import listHandlers from '../../src/components/list-option/mock-handlers.js';
import customFieldSingleHandlers from '../../src/components/custom-field-input-single-choice/mock-handlers.js';
import textareaHandlers from '../../src/components/textarea/mock-handlers.js';

setupWorker(...listHandlers, ...customFieldSingleHandlers(5000), ...textareaHandlers(1000)).start({
  serviceWorker: {
    url: `${window.location.pathname}mockServiceWorker.js`,
  },
});
