import React, { createRef } from 'react';
import {
  render as _render,
  screen,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import Select from './select.jsx';
import ListOption from '../list-option/list-option.jsx';

const render = (ui, options = { labelledBy: 'labelled-by' }) => (
  _render(ui, {
    ...options,
    wrapper: props => (
      <>
        <label htmlFor="test-id" id="test-label-id">Test label</label>
        {props.children}
      </>
    ),
  })
);
describe('src/components/control/select', () => {
  const requiredProps = {
    id: 'test-id',
    labelledBy: 'test-label-id',
    listOptionRefs: [],
    name: 'field-id',
    wrapperRef: null,
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Select {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
    expect(document.activeElement).toBe(document.body);
    user.click(screen.getByLabelText('Test label'));
    expect(document.body).toMatchSnapshot();
  });

  it('displays (loading) empty objects', () => {
    const { rerender } = render(<Select {...requiredProps} value={{ id: 8 }} displayValueEvaluator={o => o.label} />);
    expect(screen.getByLabelText('Test label')).toHaveValue('');
    rerender(<Select {...requiredProps} value={{ id: 8, label: 'foo' }} displayValueEvaluator={o => o.label} />);
    expect(screen.getByLabelText('Test label')).toHaveValue('foo');
  });

  it('resets the searchValue when value is set to undefined (regression test)', () => {
    const { rerender } = render(<Select {...requiredProps} value={{ id: 8, label: 'foo' }} displayValueEvaluator={o => o.label} />);
    expect(screen.getByLabelText('Test label')).toHaveValue('foo');
    rerender(<Select {...requiredProps} value={undefined} displayValueEvaluator={o => o.label} />);
    expect(screen.getByLabelText('Test label')).toHaveValue('');
    rerender(<Select {...requiredProps} value={{ id: 8, label: 'foo' }} displayValueEvaluator={o => o.label} />);
    expect(screen.getByLabelText('Test label')).toHaveValue('foo');
  });

  it('calls props.onChange after clear (regression test)', async () => {
    const onChangeSpy = jest.fn();
    const listOptions = [{ id: 0, label: 'foo' }];
    const listOptionRefs = listOptions.map(() => React.createRef());
    const listOptionElements = ({ onSelect }) => listOptions.map((option, index) => {
      return (<ListOption key={option.id} onSelect={onSelect} ref={listOptionRefs[index]} value={option}>
        {option.label}
      </ListOption>);
    });
    render(<Select {...requiredProps} listOptionRefs={listOptionRefs} displayValueEvaluator={o => o.label} onChange={onChangeSpy}>
      { listOptionElements }
    </Select>);
    user.click(screen.getByTitle('Open choices listbox'));
    user.click(await screen.findByText('foo'));
    user.click(screen.getByTitle('Remove selected choice'));
    expect(onChangeSpy).toHaveBeenCalledWith(expect.objectContaining({ target: { dirty: true, name: 'field-id', value: undefined } }));
  });

  describe('onFocus API', () => {
    it('focuses on the Select', async () => {
      const onFocus = jest.fn(event => event.persist());
      const listOptions = [{ id: 0, label: 'foo' }];
      const listOptionRefs = listOptions.map(() => React.createRef());
      const listOptionElements = ({ onSelect }) => listOptions.map((option, index) => {
        return (<ListOption key={option.id} onSelect={onSelect} ref={listOptionRefs[index]} value={option}>
          {option.label}
        </ListOption>);
      });
      render(<Select {...requiredProps} listOptionRefs={listOptionRefs} displayValueEvaluator={o => o.label} onFocus={onFocus}>
        { listOptionElements }
      </Select>);

      const focusTarget = screen.getByRole('combobox');

      user.click(screen.getByRole('combobox'));
      user.click(await screen.findByText('foo'));

      expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({
        type: 'focus',
        target: focusTarget,
      }));
    });
  });

  describe('onBlur API', () => {
    it('focuses on the Select', async () => {
      const onBlur = jest.fn(event => event.persist());
      const listOptions = [{ id: 0, label: 'foo' }];
      const listOptionRefs = listOptions.map(() => React.createRef());
      const listOptionElements = ({ onSelect }) => listOptions.map((option, index) => {
        return (<ListOption key={option.id} onSelect={onSelect} ref={listOptionRefs[index]} value={option}>
          {option.label}
        </ListOption>);
      });
      render(<Select {...requiredProps} listOptionRefs={listOptionRefs} displayValueEvaluator={o => o.label} onBlur={onBlur}>
        { listOptionElements }
      </Select>);

      user.click(screen.getByRole('combobox'));
      user.click(await screen.findByText('foo'));
      user.tab(); // Tabs to SVG `X` Button
      user.tab(); // Tabs to SVG `V` Button
      user.tab(); // Tabs to Body

      expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
        type: 'blur',
      }));
    });
  });

  describe('classNames API', () => {
    it('sets container', () => {
      render(<Select
        {...requiredProps}
        classNames={{
          container: 'unique-container',
        }}
      />);
      expect(document.body).toMatchSnapshot();
    });

    it('sets valid input', () => {
      render(<Select
        {...requiredProps}
        classNames={{
          input: 'unique-input',
        }}
      />);
      expect(document.body).toMatchSnapshot();
    });

    it('sets invalid input', () => {
      render(<Select
        {...requiredProps}
        classNames={{
          invalidInput: 'unique-invalid-input',
        }}
        validationMessage="This is an error state."
      />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
    });

    it('sets all class names', () => {
      render(<Select
        {...requiredProps}
        classNames={{
          container: 'unique-container',
          input: 'unique-input',
          invalidInput: 'unique-invalid-input',
        }}
      />);
      expect(document.body).toMatchSnapshot();
    });
  });
});
