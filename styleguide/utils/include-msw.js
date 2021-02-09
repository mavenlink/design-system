import { setupWorker } from 'msw';
import handlers from '../../src/mocks/handlers.js';

(() => {
  setupWorker(...handlers).start();
})();
