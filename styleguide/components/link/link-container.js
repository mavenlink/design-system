import { withHandlers } from 'recompose';
import Link from './link';
import pageView from '../../utils/page-view';

export default withHandlers({
  onClick: ({ href }) => () => {
    pageView(href);
  },
})(Link);
