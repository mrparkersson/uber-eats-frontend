import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotFound from '../../pages/404';

describe('<NotFound/>', () => {
  it('renders NotFound component', async () => {
    render(
      <Router>
        <HelmetProvider>
          <NotFound />
        </HelmetProvider>
      </Router>
    );

    await waitFor(() => {
      expect(document.title).toBe('Not Found | Uber Clone');
    });
  });
});
