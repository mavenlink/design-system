import React, { createRef } from 'react';
import {
  render,
} from '@testing-library/react';
import MultiAutocompleter from './multi-autocompleter.jsx';

describe('<MultiAutocompleter>', () => {
  const requiredProps = {
    apiEndpoint: '/models',
    id: 'test-id',
    label: 'test label',
    name: 'field-id',
  };

  it('has defaults', () => {
    const ref = createRef();

    render(<MultiAutocompleter {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });
});
