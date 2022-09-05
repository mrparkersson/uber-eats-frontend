/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import React from 'react';
import RestaurantContainer from '../restaurant-container';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Restaurant/>', () => {
  it('should render OK with props', () => {
    const restaurantProps = {
      id: '1',
      name: 'name',
      coverImage: 'x',
      categoryName: 'categoryName',
    };
    const { getByText, container } = render(
      <Router>
        <RestaurantContainer {...restaurantProps} />
      </Router>
    );
    getByText(restaurantProps.name);
    getByText(restaurantProps.categoryName);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveAttribute(
      'href',
      `/restaurant/${restaurantProps.id}`
    );
  });
});
