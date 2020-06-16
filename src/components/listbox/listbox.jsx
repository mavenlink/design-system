import React from 'react';
import PropTypes from 'prop-types';
import styles from './listbox.css';

export default function Listbox(props) {
  const children = props.selections.map((s, index) => {
    const key = `${s}-${index}`;

    return (<div className={styles.selection} key={key}>{s}</div>);
  });

  return (
    <div className={styles.container}>
      { children }
    </div>
  );
}

Listbox.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.string.isRequired),
};

Listbox.defaultProps = {
  selections: [],
};
