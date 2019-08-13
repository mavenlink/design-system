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
    dropzoneClasses,
    labelClasses,
    fileClasses,
    fileListClasses,
    id,
    title,
    ...rest
  } = props;

  const [files, setFiles] = useState([]);
  // const [uploading, setUploading] = useState(false);
  const inputFile = useRef(null);

  const onFilesChanged = (e) => {
    const selectedFiles = e.currentTarget.files;
    // User may have clicked 'Cancel' on the native file dialog
    if (selectedFiles.length) {
      const currentFiles = [];
      Array.from(selectedFiles).map(file => currentFiles.push(file));
      setFiles(currentFiles);
    }
  };

  const onRemoveFile = (e, file) => {
    e.preventDefault();
    const currentFiles = files.filter(f => f.name !== file.name);
    setFiles(currentFiles);
  };

  const getFilesList = () => {
    if (files.length) {
      return files.map((file) => {
        return (
          <section className={styles['file-list-button']} key={file.name}>
            <span className={styles.icon}>ICON</span>
            <span className={styles.filename}>{file.name}</span>
            <button onClick={e => onRemoveFile(e, file)} className={styles.remove}>&times;</button>
          </section>
        );
      });
    }
    return '';
  };

  return (
    <React.Fragment>
      <span className={styles.title}>{props.title}</span>
      <section className={props.fileListClasses}>
        {getFilesList()}
      </section>
      <section className={props.dropzoneClasses}>
        <label htmlFor={props.id} className={props.labelClasses}>Upload Files
          <input onChange={e => onFilesChanged(e)} type="file" id={props.id} className={props.fileClasses} ref={inputFile} {...rest} />
        </label>
      </section>
    </React.Fragment>
  );
};

FilePicker.propTypes = {
  dropzoneClasses: PropTypes.string,
  labelClasses: PropTypes.string,
  fileClasses: PropTypes.string,
  fileListClasses: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  multiple: PropTypes.string,
};

FilePicker.defaultProps = {
  dropzoneClasses: styles.dropzone,
  labelClasses: styles.label,
  fileClasses: styles.file,
  fileListClasses: styles['file-list'],
  id: undefined,
  title: undefined,
  multiple: undefined,
};

export default FilePicker;
