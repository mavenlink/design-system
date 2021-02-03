import { setupServer } from 'msw/node';
import handlers from './handlers.js';

const jestServer = setupServer(...handlers);

export default jestServer;
