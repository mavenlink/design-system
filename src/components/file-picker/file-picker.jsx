import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import styles from './file-picker.css';

// TODOs
//
// What file types will we support?
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers
//
// How do we want to handle disabling as file(s) is uploading?
//
// v2 supports drag n drop?
//
const FilePicker = (props) => {
  const {
    className,
    id,
    label,
    ...rest
  } = props;

  const [files, setFiles] = useState([]);
  // const [uploading, setUploading] = useState(false);
  const inputFile = useRef(null);

  const onFilesChanged = (e) => {
    const currentFiles = [];
    Array.from(e.currentTarget.files).map(file => currentFiles.push(file));
    setFiles(currentFiles);
  };

  const onRemoveFile = (e, file) => {
    e.preventDefault();
    const currentFiles = files.filter(f => f.name !== file.name);
    setFiles(currentFiles);
  };

  return (
    <React.Fragment>
      <label htmlFor={props.id} className={props.className}>{props.label}
        <input onInput={e => onFilesChanged(e)} type="file" id={props.id} className={styles.file} ref={inputFile} {...rest} />
      </label>
      {files.length && files.map(file => (
        <button className={styles.preview} onClick={e => onRemoveFile(e, file)} key={file.name}>{file.name}</button>
      ))}
    </React.Fragment>
  );
};

FilePicker.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  multiple: PropTypes.string,
};

FilePicker.defaultProps = {
  className: styles.label,
  id: undefined,
  label: undefined,
  multiple: undefined,
};

export default FilePicker;
