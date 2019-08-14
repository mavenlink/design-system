import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import FilePicker from './file-picker';
import styles from './file-picker.css';

describe('FilePicker', () => {
  describe('functional tests', () => {
    const uploadFile = (filename) => {
      const {getByLabelText, getByText, queryByText} =
        render(<FilePicker id="123" title="Upload Files" />);
      const input = getByLabelText(/upload files/i);
      const file = new File(['(⌐□_□)'], filename, {
        type: 'image/png',
      });
      fireEvent.change(input, {target: {files: [file]}});
      return {getByText, queryByText};
    };

    it('shows file name and remove × after user uploads', () => {
      const {getByText} = uploadFile('brucelee.png')
      expect(getByText(/brucelee\.png/)).toBeInstanceOf(HTMLElement);
      expect(getByText(/×/)).toBeInstanceOf(HTMLElement);
    });

    it('removes file after clicking ×', () => {
      const {queryByText, getByText} = uploadFile('jackiechan.png')
      expect(getByText(/jackiechan\.png/)).toBeInstanceOf(HTMLElement);
      const removeButton = getByText(/×/);
      expect(removeButton).toBeInstanceOf(HTMLElement);
      removeButton.click();
      expect(queryByText(/jackiechan\.png/)).toBe(null);
    });
  });

  describe('API', () => {
    it('title', () => {
      const expected = 'Attach Le Files';
      const { getByText } = render(<FilePicker id="123" title={expected} />);
      expect(getByText(expected).textContent).toContain(expected);
    });

    it('multiple', () => {
      const testRenderer = renderer.create(
        <FilePicker multiple="multiple" id="123" title="yo" />,
      );
      const testInstance = testRenderer.root;
      expect(testInstance.findByType('input').props.multiple).toBe('multiple');
    });

    describe('class prop defaults', () => {
      let testInstance;
      let testRenderer;

      beforeEach(() => {
        testRenderer = renderer.create(
          <FilePicker id="123" title="yo" />,
        );
        testInstance = testRenderer.root;
      });

      afterEach(() => {
        testRenderer = null;
        testInstance = null;
      });

      it('dropzoneClasses', () => {
        const section = testInstance.findByProps({
          className: styles.dropzone,
        });
        expect(section.type === 'section').toBe(true);
      });

      it('labelClasses', () => {
        const label = testInstance.findByProps({
          className: styles.label,
        });
        expect(label.type === 'label').toBe(true);
      });

      it('fileClasses', () => {
        const file = testInstance.findByProps({
          className: styles.file,
        });
        expect(file.type === 'input').toBe(true);
      });

      it('fileListClasses', () => {
        const fileList = testInstance.findByProps({
          className: styles['file-list'],
        });
        expect(fileList.type === 'section').toBe(true);
      });
    });

    describe('class prop provided', () => {
      const expectedDropzoneClasses = 'le-dropzone';
      const expectedLabelClasses = 'le-label';
      const expectedFileClasses = 'le-file';
      const expectedFileListClasses = 'le-filelist';
      let testInstance;
      let testRenderer;

      beforeEach(() => {
        testRenderer = renderer.create(
          <FilePicker
            dropzoneClasses={expectedDropzoneClasses}
            labelClasses={expectedLabelClasses}
            fileClasses={expectedFileClasses}
            fileListClasses={expectedFileListClasses}
            id="123"
            title="yo"
          />,
        );
        testInstance = testRenderer.root;
      });

      afterEach(() => {
        testRenderer = null;
        testInstance = null;
      });

      it('dropzoneClasses', () => {
        const section = testInstance.findByProps({
          className: expectedDropzoneClasses,
        });
        expect(section.type === 'section').toBe(true);
      });

      it('labelClasses', () => {
        const label = testInstance.findByProps({
          className: expectedLabelClasses,
        });
        expect(label.type === 'label').toBe(true);
      });

      it('fileClasses', () => {
        const fileInput = testInstance.findByProps({
          className: expectedFileClasses,
        });
        expect(fileInput.type === 'input').toBe(true);
      });

      it('fileListClasses', () => {
        const fileListSection = testInstance.findByProps({
          className: expectedFileListClasses,
        });
        expect(fileListSection.type === 'section').toBe(true);
      });
    });
  });
});
