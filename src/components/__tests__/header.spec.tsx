import { render } from '@testing-library/react';
import React from 'react';
import Header from '../header';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Header/>', () => {
  const headerProps = {
    userEmail: 'p@gmail.com',
    verified: true,
  };

  it('should render Header component', () => {
    const { getByText } = render(
      <Router>
        <Header {...headerProps} />
      </Router>
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    getByText(headerProps.userEmail);
  });
});
