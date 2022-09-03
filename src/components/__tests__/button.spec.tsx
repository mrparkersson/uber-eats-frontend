import { render } from '@testing-library/react';
import React from 'react';
import Button from '../button';

describe('<Buton/>', () => {
  it('should render ok with props', () => {
    render(<Button canClick={true} loading={false} actionText={'testing'} />);
  });
});
