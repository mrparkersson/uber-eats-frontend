import { Link } from 'react-router-dom';
import uberEatsLogo from '../images/logo.svg';

interface HeaderComponentProps {
  userEmail: string;
  verified: boolean;
}

const Header: React.FC<HeaderComponentProps> = ({ userEmail, verified }) => {
  return (
    <>
      {!verified && (
        <div className=" bg-red-400 text-center text-xs p-3">
          <span>Please verify your email</span>
        </div>
      )}
      <header className=" py-4">
        <div className=" w-full p-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between ">
          <Link to="/">
            <img
              src={uberEatsLogo}
              alt="logo for uber eats"
              className=" w-24 mb-10"
            />
          </Link>

          <span className="text-xs">
            <Link to="/edit-profile">{userEmail}</Link>
          </span>
        </div>
      </header>
    </>
  );
};

export default Header;
