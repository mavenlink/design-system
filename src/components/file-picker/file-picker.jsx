import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import Icon from '../icon/icon';
import useError from '../../hooks/useError';
import styles from './file-picker.css';
import iconUpload from '../../svgs/icon-cloud-upload-negative.svg';
import iconFileDefault from '../../svgs/icon-file-default.svg';

const FilePicker = (props) => {
  const {
    dropzoneClasses,
    labelClasses,
    fileClasses,
    fileListClasses,
    id,
    title,
    receiveFilesChanged,
    validator,
    ...rest
  } = props;

  const [files, setFiles] = useState([]);
  const [getError, setError, validate] = useError(validator);
  const [highlight, setHighlight] = useState(false);
  const inputFile = useRef(null);

  const setFilesChanged = (selectedFiles) => {
    // Accounts for case where User's clicked 'Cancel' on native file dialog
    if (selectedFiles.length) {
      const currentFiles = [];
      Array.from(selectedFiles).map(file => currentFiles.push(file));
      const errMsg = validate(currentFiles);
      if (errMsg.length) {
        setError(errMsg);
      } else {
        setError('');
        setFiles(currentFiles);
        if (props.receiveFilesChanged) {
          props.receiveFilesChanged.call(this, currentFiles);
        }
      }
    }
  };

  const onFilesChanged = (e) => {
    const selectedFiles = e.currentTarget.files;
    setFilesChanged(selectedFiles);
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

  // This prevents the dropEffect going from "copy" to "none"
  // (in chrome, cursor turns from a green plus to an arrow)
  // https://github.com/react-dropzone/react-dropzone/blob/master/src/index.js#L533
  const fixDropEffect = (e) => {
    e.stopPropagation();
    if (e.dataTransfer) {
      try {
        e.dataTransfer.dropEffect = 'copy';
      } catch {} /* eslint-disable-line no-empty */
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    fixDropEffect(e);
  };

  const onDragLeave = () => {
    setHighlight(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = e.dataTransfer.files;
    setFilesChanged(droppedFiles);
    setHighlight(false);
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

  const getDropzoneClasses = () => {
    const highlightClasses = highlight ? ` ${styles['highlight-dropzone']}` : '';
    return `${props.dropzoneClasses}${highlightClasses}`;
  };

  return (
    <React.Fragment>
      <span className={styles.title}>{props.title}</span>{getError()}
      <section className={props.fileListClasses}>
        {getFilesList()}
      </section>
      <section
        className={getDropzoneClasses()}
        draggable
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
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
  fileClasses: PropTypes.string,
  fileListClasses: PropTypes.string,
  id: PropTypes.string.isRequired,
  labelClasses: PropTypes.string,
  title: PropTypes.string.isRequired,
  multiple: PropTypes.string,
  receiveFilesChanged: PropTypes.func,
  validator: PropTypes.func,
};

FilePicker.defaultProps = {
  dropzoneClasses: styles.dropzone,
  fileClasses: styles.file,
  fileListClasses: styles['file-list'],
  id: undefined,
  labelClasses: styles.label,
  title: undefined,
  multiple: undefined,
  receiveFilesChanged: undefined,
  validator: undefined,
};

export default FilePicker;
