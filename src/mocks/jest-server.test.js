import { rest } from 'msw';
import { API_ROOT } from './mock-constants.js';
import jestServer from './jest-server.js';

describe('src/mocks/jest-server', () => {
  jestServer.setup([rest.get(`${API_ROOT}/hello`, (request, response, context) => {
    return response(
      context.status(200),
      context.text('Hello from MSW!'),
    );
  })]);

  it('"serves" on http://localhost', async () => {
    const body = await (await fetch('http://localhost/api/v1/hello')).text();

    expect(body).toEqual('Hello from MSW!');
  });
});
