import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Pathline from 'rsg-components/Pathline'; // eslint-disable-line import/extensions
import styles from './react-component.css';

export default function ReactComponent({
  name,
  heading,
  pathLine,
  description,
  docs,
  examples,
  tabButtons,
  tabBody,
}) {
  const [examplesToShow, setExamplesToShow] = useState({ ...examples });
  const [toggleCode, setToggleCode] = useState(false);

  const onToggleCodeClick = () => {
    setToggleCode(!toggleCode);
    setExamplesToShow({
      ...examplesToShow,
      props: {
        ...examplesToShow.props,
        settings: {
          showcode: false,
        },
        exampleMode: toggleCode ? 'expand' : 'hide',
      },
    });
  };

  return (
    <div className={styles.root} id={`${name}-container`}>
      <header className={styles.header}>
        {heading}
        {pathLine && <Pathline>{pathLine}</Pathline>}
      </header>
      {(description || docs) && (
        <div className={styles.docs}>
          {description}
          {docs}
        </div>
      )}
      <button onClick={onToggleCodeClick}>Toggle Code</button>
      <div className={styles.examples}>
        {examplesToShow}
      </div>
      {tabButtons && (
        <div className={styles.tabs}>
          <div className={styles.tabButtons}>{tabButtons}</div>
          {tabBody}
        </div>
      )}
    </div>
  );
}

ReactComponent.propTypes = {
  description: PropTypes.node.isRequired,
  docs: PropTypes.node.isRequired,
  examples: PropTypes.node.isRequired,
  heading: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  pathLine: PropTypes.string.isRequired,
  tabBody: PropTypes.node.isRequired,
  tabButtons: PropTypes.node.isRequired,
};
