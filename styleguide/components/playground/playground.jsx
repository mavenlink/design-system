import PropTypes from 'prop-types';
import React from 'react';
import styles from './playground.css';

export default function Playground({
  name,
  preview,
  previewProps,
  tabBody,
  toolbar,
}) {
  return (
    <div className={styles.container}>
      <div {...previewProps} className={styles.preview} data-preview={name}>
        {preview}
      </div>
      <div className={styles.controls}>
        <div className={styles.toolbar}>{toolbar}</div>
      </div>
      <div className={styles.code}>{tabBody}</div>
    </div>
  );
}

Playground.propTypes = {
  name: PropTypes.string.isRequired,
  preview: PropTypes.node.isRequired,
  previewProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  tabBody: PropTypes.node.isRequired,
  toolbar: PropTypes.node.isRequired,
};
