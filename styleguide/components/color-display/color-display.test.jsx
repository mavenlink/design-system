import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ColorDisplay from "./color-display";

describe('styleguide/components/color-display/color-display', () => {
  const renderComponent = (props = {}) => render(<ColorDisplay {...props} />);

  afterEach(cleanup);

  it('displays a color', () => {
    const { getByText } = renderComponent({ color: 'brand', type: 'base' });
    expect(getByText('New Brand Base')).toBeDefined();
  });
});
