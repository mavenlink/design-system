import React from 'react';
import Styleguide from './styleguide.jsx';
import pageView from '../../content/utils/page-view.js';

export default class StyleguideContainer extends React.Component {
  componentDidMount() {
    pageView();
  }

  render() {
    return <Styleguide {...this.props} />;
  }
}
