import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import FilePicker from './file-picker';
import styles from './file-picker.css';

describe('FilePicker', () => {
  describe('API', () => {
    it('title', function () {
      const expected = 'Attach Le Files';
      const { getByText } = render(<FilePicker id="123" title={ expected } />);
      expect(getByText(expected).textContent).toContain(expected);
    });

    it('multiple', function () {
      const testRenderer = renderer.create(
        <FilePicker multiple='multiple' id="123" title='yo' />
      );
      const testInstance = testRenderer.root;
      expect(testInstance.findByType('input').props.multiple).toBe('multiple');
    });

    describe('class prop defaults', () => {
      let testInstance, testRenderer;

      beforeEach(function () {
        testRenderer = renderer.create(
          <FilePicker id="123" title='yo' />
        );
        testInstance = testRenderer.root;
      });

      afterEach(function () {
        testRenderer = null;
        testInstance = null;
      });

      it('dropzoneClasses', function () {
        const section = testInstance.findByProps({
          className: styles.dropzone,
        });
        expect(section.type === 'section').toBe(true);
      });

      it('labelClasses', function () {
        const label = testInstance.findByProps({
          className: styles.label,
        });
        expect(label.type === 'label').toBe(true);
      });

      it('fileClasses', function () {
        const file = testInstance.findByProps({
          className: styles.file,
        });
        expect(file.type === 'input').toBe(true);
      });

      it('fileListClasses', function () {
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
      let testInstance, testRenderer;

      beforeEach(function () {
        testRenderer = renderer.create(
          <FilePicker
            dropzoneClasses={ expectedDropzoneClasses }
            labelClasses={ expectedLabelClasses }
            fileClasses={ expectedFileClasses }
            fileListClasses={ expectedFileListClasses }
            id="123"
            title='yo'
          />
        );
        testInstance = testRenderer.root;
      });

      afterEach(function () {
        testRenderer = null;
        testInstance = null;
      });

      it('dropzoneClasses', function () {
        const section = testInstance.findByProps({
          className: expectedDropzoneClasses,
        });
        expect(section.type === 'section').toBe(true);
      });

      it('labelClasses', function () {
        const label = testInstance.findByProps({
          className: expectedLabelClasses,
        });
        expect(label.type === 'label').toBe(true);
      });

      it('fileClasses', function () {
        const fileInput = testInstance.findByProps({
          className: expectedFileClasses,
        });
        expect(fileInput.type === 'input').toBe(true);
      });

      it('fileListClasses', function () {
        const fileListSection = testInstance.findByProps({
          className: expectedFileListClasses,
        });
        expect(fileListSection.type === 'section').toBe(true);
      });
    });
  });
});
