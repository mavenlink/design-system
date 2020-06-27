import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styles from './listbox.css';

export default function Listbox(props) {
  const [active, setActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (active) {
      props.refs.forEach((ref, index) => {
        if (ref.current) ref.current.setActive(index === activeIndex);
      });
    }
  });

  const refIndexOf = target => props.refs.findIndex(ref => ref.current && ref.current.contains(target));
  const optionsWasSelected = (toggledRefIndex) => {
    props.onChange(props.refs[toggledRefIndex].current.value);
  };

  function onFocus(event) {
    setActive(true);

    // Do not use `onClick` to manage `activeIndex`
    // For some reason, it will focus the first item before focusing the clicked item
    const nextActiveIndex = refIndexOf(event.target);

    if (nextActiveIndex !== -1) setActiveIndex(nextActiveIndex);
  }

  function onClick(event) {
    const selectedRefIndex = refIndexOf(event.target);
    if (selectedRefIndex !== -1) {
      optionsWasSelected(selectedRefIndex);
    }
  }

  function onKeyDown(keyEvent) {
    switch (keyEvent.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        if (activeIndex > 0) {
          keyEvent.preventDefault();
          setActiveIndex(activeIndex - 1);
        }
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        if (activeIndex < props.refs.length - 1) {
          keyEvent.preventDefault();
          setActiveIndex(activeIndex + 1);
        }
        break;
      case 'End':
        keyEvent.preventDefault();
        setActiveIndex(props.refs.length - 1);
        break;
      case 'Enter': {
        keyEvent.preventDefault();
        optionsWasSelected(activeIndex);
        break;
      }
      case 'Home':
        keyEvent.preventDefault();
        setActiveIndex(0);
        break;
      default:
    }
  }

  return (
    <ul
      aria-labelledby={props.labelledBy}
      className={props.className}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      role="listbox"
    >
      { props.children }
    </ul>
  );
}

const ListOptionRefType = PropTypes.shape({
  current: PropTypes.shape({
    contains: PropTypes.func,
    setActive: PropTypes.func,
    toggleSelected: PropTypes.func,
    value: PropTypes.any,
  }),
});

Listbox.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  labelledBy: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  refs: PropTypes.arrayOf(ListOptionRefType).isRequired,
};

Listbox.defaultProps = {
  className: styles.container,
  children: undefined,
  onChange: () => {},
};
