import React from 'react';
import Styleguide from './styleguide.jsx';
import pageView from '../../content/utils/page-view.js';

export default class StyleguideContainer extends React.Component {
  componentDidMount() {
    pageView();
    window.addEventListener('hashchange', pageView, false);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', pageView, false);
  }

  render() {
    return <Styleguide {...this.props} />;
  }
}
