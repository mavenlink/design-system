import React, {
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import styles from './listbox.css';

export default function Listbox(props) {
  useEffect(() => {
    props.refs.forEach((ref, index) => {
      ref.current.setActive(index === 0);
    });
  });

  return (
    <ul
      className={styles.container}
      role="listbox"
    >
      { props.children }
    </ul>
  );
}

Listbox.propTypes = {
  children: PropTypes.node,
  refs: PropTypes.arrayOf(PropTypes.shape({ current: PropTypes.any })).isRequired,
};

Listbox.defaultProps = {
  children: undefined,
};
