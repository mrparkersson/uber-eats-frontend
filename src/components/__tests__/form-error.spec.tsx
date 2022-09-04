import { render } from '@testing-library/react';
import React from 'react';
import { FormError } from '../form-error';

describe('<FormError/>', () => {
  it('renders ok with props', () => {
    const { getByText } = render(<FormError errorMessage="test" />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    getByText('test');
  });
});
