import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/login';
import SignUp from '../pages/signup';

const LoggedOut = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};
export default LoggedOut;
