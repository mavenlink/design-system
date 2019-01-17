import React from 'react';
import Styleguide from './styleguide';
import pageView from '../../content/utils/page-view';

export default class StyleguideContainer extends React.Component {
  componentDidMount() {
    pageView();
  }

  render() {
    return <Styleguide {...this.props} />;
  }
}
