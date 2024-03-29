import { rest } from 'msw';
import { API_ROOT } from '../../mocks/mock-constants.js';

export default function handlers(delay = 0) {
  return [
    rest.get(`${API_ROOT}/textarea_test`, (request, response, context) => {
      return response(
        context.status(200),
        context.json({
          value: 'This is a test message for textarea component\nand it has multiple lines of\ntest content',
        }),
        context.delay(delay),
      );
    }),
  ];
}
