import { setupWorker } from 'msw';
import listHandlers from '../../src/components/list-option/mock-handlers.js';
import textareaHandlers from '../../src/components/textarea/mock-handlers.js';
import autocompleterHandlers from '../../src/components/autocompleter/mock-handlers.js';

setupWorker(
  ...listHandlers,
  ...textareaHandlers(1000),
  ...autocompleterHandlers(1000),
).start({
  serviceWorker: {
    url: `${window.location.pathname}mockServiceWorker.js`,
  },
});
