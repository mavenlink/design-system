import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import Icon from '../icon/icon';
import styles from './file-picker.css';
import iconUpload from '../../svgs/icon-cloud-upload-negative.svg';
import iconFileDefault from '../../svgs/icon-file-default.svg';

// TODOs
//
// What file types will we support?
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers
//
// How do we want to handle disabling as file(s) is uploading?
//
// Do we want to allow overriding of: onFilesChanged and onRemoveFile
// Or, do we want to have onBeforeFilesChanged, onAfterFilesChanged?
//
// v2 supports drag n drop?
// https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Selecting_files_using_drag_and_drop
//
const FilePicker = (props) => {
  const {
    dropzoneClasses,
    labelClasses,
    fileClasses,
    fileListClasses,
    id,
    title,
    onBeforeFileRemoved,
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
    if (props.onBeforeFileRemoved) {
      props.onBeforeFileRemoved.call(this, file);
    }
    const currentFiles = files.filter(f => f.name !== file.name);
    setFiles(currentFiles);
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
      <span className={styles.title}>{props.title}</span>
      <section className={props.fileListClasses}>
        {getFilesList()}
      </section>
      <section className={props.dropzoneClasses}>
        <label htmlFor={props.id} className={props.labelClasses}>
          <Icon name={iconUpload.id} size="medium" fill="grey-dark" stroke="none" title="Upload file icon" />
          <span className={styles.upload}>Upload Files</span>
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
  onBeforeFileRemoved: PropTypes.func,
};

FilePicker.defaultProps = {
  dropzoneClasses: styles.dropzone,
  labelClasses: styles.label,
  fileClasses: styles.file,
  fileListClasses: styles['file-list'],
  id: undefined,
  title: undefined,
  multiple: undefined,
  onBeforeFileRemoved: undefined,
};

export default FilePicker;
