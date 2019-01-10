import { lifecycle } from 'recompose';
import Styleguide from './styleguide';
import pageView from '../../utils/page-view';

export default lifecycle({
  componentDidMount: () => {
    pageView();
  },
})(Styleguide);
