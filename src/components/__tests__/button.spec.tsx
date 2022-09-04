import { render } from '@testing-library/react';
import React from 'react';
import Button from '../button';

describe('<Buton/>', () => {
  it('should render ok with props', () => {
    const { getByText } = render(
      <Button canClick={true} loading={false} actionText={'testing'} />
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    getByText('testing');
  });

  it('should display loading', () => {
    const { getByText, container } = render(
      <Button canClick={false} loading={true} actionText={'testing'} />
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    getByText('Loading...');
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass('pointer-events-none');
  });
});
