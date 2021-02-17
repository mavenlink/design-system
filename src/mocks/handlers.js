import { rest } from 'msw';
import mockConstants from './mock-constants.js';
// Import all handlers here!
import listHandlers from '../components/list-option/mock-handlers.js';
import customFieldSingleHandlers from '../components/custom-field-input-single-choice/mock-handlers.js';

const { API_ROOT } = mockConstants;

const handlers = [
  rest.get(`${API_ROOT}/hello`, (request, response, context) => {
    return response(
      context.status(200),
      context.text('Hello from MSW!'),
    );
  }),
  ...listHandlers,
  ...customFieldSingleHandlers,
];

export default handlers;
