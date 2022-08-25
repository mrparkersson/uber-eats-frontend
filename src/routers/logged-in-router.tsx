import React from 'react';
import { isLoggedInVar } from '..';

const LoggedIn = () => {
  return (
    <div>
      <h1>Logged In</h1>
      <button onClick={() => isLoggedInVar(false)}>Logout</button>
    </div>
  );
};

export default LoggedIn;
