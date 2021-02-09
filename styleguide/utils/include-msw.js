import { rest, setupWorker } from 'msw';

(() => {
  console.log('Hello from worker setup!');

  setupWorker(
    rest.get('/hello', (request, response, context) => {
      return response(
        context.status(200),
        context.text('Hello from MSW!'),
      );
    }),
  ).start();
})();
