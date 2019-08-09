import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import styles from './file-picker.css';
import labelPropType from '../input/label-prop-type';

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
  const  {
    className,
    id,
    label,
    ...rest
  } = props;

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const inputFile = useRef(null)

  const onLabelClick = (e) => {
    inputFile.current.click();
  };

  const onFileInput = (e) => {
    const currentFiles = [];
    Array.from(e.currentTarget.files).map(file => currentFiles.push(file));
    setFiles(currentFiles);
  }

  const onRemoveFile = (file) => {
    const currentFiles = files.filter(f => f.name !== file.name);
    setFiles(currentFiles);
  };

  return (
    <React.Fragment>
      <label onClick={onLabelClick} htmlFor={props.id} className={props.className}>{props.label}
        <input onInput={(e) => onFileInput(e)} type='file' id='le-file'  className={styles.file} ref={inputFile} {...rest} />
      </label>
      {files.length && files.map(file =>
        <div className={styles.preview} onClick={e => onRemoveFile(file)} key={file.name}>{file.name}</div>
      )}
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
