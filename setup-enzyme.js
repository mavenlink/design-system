import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

console.error = (message) => { // eslint-disable-line
  throw new Error(message);
};
