import { useReactiveVar } from '@apollo/client';

import { isLoggedInVar } from '.';
import LoggedIn from './routers/logged-in-router';
import LoggedOut from './routers/logged-out-router';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return isLoggedIn ? <LoggedIn /> : <LoggedOut />;
}

export default App;
