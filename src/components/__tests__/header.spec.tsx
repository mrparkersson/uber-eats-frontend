import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Header from '../header';
import { BrowserRouter as Router } from 'react-router-dom';
import { ME_QUERY } from '../../routers/logged-in-router';

describe('<Header/>', () => {
  const headerProps = {
    userEmail: 'p@gmail.com',
    verified: true,
  };

  const mocks = [
    {
      request: {
        query: ME_QUERY,
      },
      result: {
        data: {
          me: {
            id: 1,
            email: '',
            role: '',
            verified: false,
          },
        },
      },
    },
  ];

  it('should render Header component', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Router>
          <Header {...headerProps} />
        </Router>
      </MockedProvider>
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
});
