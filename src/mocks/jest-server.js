import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node';

const jestServer = setupServer();

jestServer.setup = (handlers) => {
  beforeAll(() => {
    jestServer.listen({
      onUnhandledRequest(req) {
        // Any non-mocked requests will throw on bad certs
        // eslint-disable-next-line no-console
        console.error(`Unhandled network request in tests. You must mock: ${req.method} ${req.url.toString()}`);
      },
    });
  });

  beforeEach(() => {
    jestServer.use(...handlers);
  });

  afterEach(() => {
    cleanup(); // Our components need to unmount as fast as possible to avoid any state changes due to async network requests.
    jestServer.resetHandlers();
  });

  afterAll(() => {
    jestServer.close();
  });
};

export default jestServer;
