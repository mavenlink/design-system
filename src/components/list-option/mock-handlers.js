import { rest } from 'msw';
import { API_ROOT } from '../../mocks/mock-constants.js';

const handlers = [
  rest.get(`${API_ROOT}/list`, (request, response, context) => {
    return response(
      context.status(200),
      context.json(['item-1', 'item-2', 'item-3', 'item-4']),
    );
  }),
];

export default handlers;
