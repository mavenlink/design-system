import { rest } from 'msw';

const handlers = [
  rest.get('http://mavenlink.api.com/hello', (request, response, context) => {
    return response(
      context.status(200),
      context.text('Hello from MSW!'),
    );
  }),
];

export default handlers;
