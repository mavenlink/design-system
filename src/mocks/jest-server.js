import { setupServer } from 'msw/node'; // eslint-disable-line import/extensions

const jestServer = setupServer();

export default jestServer;
