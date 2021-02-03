import { setupServer } from 'msw/node'; // eslint-disable-line import/extensions
import handlers from './handlers.js';

const jestServer = setupServer(...handlers);

export default jestServer;
