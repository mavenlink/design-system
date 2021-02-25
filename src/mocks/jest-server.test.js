import { rest } from 'msw';
import mockConstants from './mock-constants.js';
import jestServer from './jest-server.js';

const { API_ROOT } = mockConstants;

describe('src/mocks/jest-server', () => {
  beforeEach(() => {
    jestServer.use(rest.get(`${API_ROOT}/hello`, (request, response, context) => {
      return response(
        context.status(200),
        context.text('Hello from MSW!'),
      );
    }));
  });

  it('"serves" on http://localhost', async () => {
    const body = await (await fetch('http://localhost/hello')).text();

    expect(body).toEqual('Hello from MSW!');
  });

  it('errors on unhandled requests', async () => {
    let expectedError;

    try {
      await (await fetch('http://localhost/null')).text();
    } catch (error) {
      expectedError = error;
    }

    expect(expectedError.message).toContain('Error: captured a request without a matching request handler');
  });
});
