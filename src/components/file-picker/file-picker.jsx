import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import Icon from '../icon/icon';
import useError from '../../hooks/useError';
import styles from './file-picker.css';
import iconUpload from '../../svgs/icon-cloud-upload-negative.svg';
import iconFileDefault from '../../svgs/icon-file-default.svg';

// TODOs
//
// What file types will we support?
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers
//
// v2 supports drag n drop?
// https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Selecting_files_using_drag_and_drop
//
const FilePicker = (props) => {
  const {
    dropzoneClasses,
    errorMessage,
    labelClasses,
    fileClasses,
    fileListClasses,
    id,
    title,
    receiveFilesChanged,
    ...rest
  } = props;

  const [files, setFiles] = useState([]);
  const [getError, setError] = useError(errorMessage);
  const inputFile = useRef(null);

  const onFilesChanged = (e) => {
    const selectedFiles = e.currentTarget.files;
    // User may have clicked 'Cancel' on the native file dialog
    if (selectedFiles.length) {
      const currentFiles = [];
      Array.from(selectedFiles).map(file => currentFiles.push(file));
      setFiles(currentFiles);
      if (props.receiveFilesChanged) {
        props.receiveFilesChanged.call(this, currentFiles);
      }
      // Clear error message once we've added another file
      setError('');
    }
  };

  const onRemoveFile = (e, file) => {
    e.preventDefault();
    const currentFiles = files.filter(f => f.name !== file.name);
    setFiles(currentFiles);
    if (props.receiveFilesChanged) {
      props.receiveFilesChanged.call(this, currentFiles);
    }
  };

  const onLabelKeypress = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      e.currentTarget.click();
    }
  };

  const getFilesList = () => {
    if (files.length) {
      return files.map((file) => {
        return (
          <section className={styles['file-list-button']} key={file.name}>
            <Icon className={styles.icon} name={iconFileDefault.id} size="medium" stroke="grey-base" fill="none" title="Upload file icon" />
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
      <span className={styles.title}>{props.title}</span>{getError()}
      <section className={props.fileListClasses}>
        {getFilesList()}
      </section>
      <section className={props.dropzoneClasses}>
        <label onKeyDown={onLabelKeypress} htmlFor={props.id} className={props.labelClasses} tabIndex="0" role="button" aria-controls={props.id}>
          <Icon className={styles['upload-icon']} name={iconUpload.id} size="medium" fill="grey-dark" stroke="none" title="Upload file icon" />
          <span className={styles.upload}>Upload Files</span>
          <input onChange={e => onFilesChanged(e)} type="file" id={props.id} className={props.fileClasses} ref={inputFile} {...rest} />
        </label>
      </section>
    </React.Fragment>
  );
};

FilePicker.propTypes = {
  dropzoneClasses: PropTypes.string,
  errorMessage: PropTypes.string,
  fileClasses: PropTypes.string,
  fileListClasses: PropTypes.string,
  id: PropTypes.string.isRequired,
  labelClasses: PropTypes.string,
  title: PropTypes.string.isRequired,
  multiple: PropTypes.string,
  receiveFilesChanged: PropTypes.func,
};

FilePicker.defaultProps = {
  dropzoneClasses: styles.dropzone,
  errorMessage: undefined,
  fileClasses: styles.file,
  fileListClasses: styles['file-list'],
  id: undefined,
  labelClasses: styles.label,
  title: undefined,
  multiple: undefined,
  receiveFilesChanged: undefined,
};

export default FilePicker;
