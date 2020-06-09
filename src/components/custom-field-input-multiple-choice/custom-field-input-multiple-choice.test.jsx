import React from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  screen,
} from '@testing-library/react';
import CustomFieldInputMultipleChoice from './custom-field-input-multiple-choice.jsx';

describe('<CustomFieldInputMultipleChoice>', () => {
  const requiredProps = {
    id: 'test-id',
  };

  it('has defaults', () => {
    expect(renderer.create(<CustomFieldInputMultipleChoice {...requiredProps} />).toJSON()).toMatchSnapshot();
  });

  describe('id API', () => {
    it('generates unique tag ids', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        id="123"
        value={[{
          id: '1',
          label: 'Choice 1',
        }, {
          id: '2',
          label: 'Choice 2',
        }]}
      />));

      expect(screen.getByText('Choice 1').parentElement).toHaveAttribute('id', '123-1');
      expect(screen.getByText('Choice 2').parentElement).toHaveAttribute('id', '123-2');
    });
  });

  describe('value API', () => {
    it('generates tags', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        value={[{
          id: '1',
          label: 'Choice 1',
        }, {
          id: '2',
          label: 'Choice 2',
        }]}
      />));

      expect(screen.getByText('Choice 1')).toBeDefined();
      expect(screen.getByText('Choice 2')).toBeDefined();
    });
  });
});
