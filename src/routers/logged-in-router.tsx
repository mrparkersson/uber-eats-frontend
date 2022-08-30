import { gql, useQuery } from '@apollo/client';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/header';
import NotFound from '../pages/404';
import CategoryContainer from '../pages/client/category';
import Restaurants from '../pages/client/restaurants';
import Search from '../pages/client/search';
import ConfirmEmail from '../pages/user/confirm-email';
import EditProfile from '../pages/user/edit-profile';
import { meQuery } from '../__generated__/meQuery';

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

const LoggedIn = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);

  if (!data || loading || error) {
    return (
      <div className=" h-screen flex justify-center items-center">
        <span className=" font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header userEmail={data.me.email} verified={data.me.verified} />
      <Routes>
        {data.me.role === 'Client' && (
          <>
            <Route path="/" element={<Restaurants />} />
            <Route
              path="/confirm"
              element={<ConfirmEmail thewholedata={data} />}
            />
            <Route
              path="/edit-profile"
              element={<EditProfile currentuser={data} />}
            />
            <Route path="/search" element={<Search />} />
            <Route path="/category/:slug" element={<CategoryContainer />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default LoggedIn;
