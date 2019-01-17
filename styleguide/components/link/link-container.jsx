import PropTypes from 'prop-types';
import React from 'react';
import Link from './link';
import pageView from '../../content/utils/page-view';

export default class LinkContainer extends React.Component {
  onClick() {
    pageView(this.props.href);
  }

  render() {
    return <Link onClick={this.onClick} {...this.props} />;
  }
}

LinkContainer.propTypes = {
  href: PropTypes.string.isRequired,
};
