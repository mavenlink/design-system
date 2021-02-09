import { rest } from 'msw';
import { API_ROOT } from './mock-constants.js';
// Import all handlers here!

const handlers = [
  rest.get(`${API_ROOT}/hello`, (request, response, context) => {
    return response(
      context.status(200),
      context.text('Hello from MSW!'),
    );
  }),
];

export default handlers;
