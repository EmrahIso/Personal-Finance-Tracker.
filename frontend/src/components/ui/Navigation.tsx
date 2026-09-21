import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

type NavigationProps = {
  authenticated?: boolean;
  dashboard?: boolean;
};

const Navigation = ({
  authenticated = false,
  dashboard = false,
}: NavigationProps) => {
  let navigationRightSide = null;

  if (!authenticated) {
    navigationRightSide = (
      <ul className="flex gap-4 items-center">
        <li>
          <Link
            to="/login"
            className="text-gray-700 text-sm tracking-wide underline-offset-3 hover:underline"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="text-gray-700 text-sm tracking-wide underline-offset-3 hover:underline"
          >
            Register
          </Link>
        </li>
      </ul>
    );
  }

  if (authenticated && !dashboard) {
    navigationRightSide = (
      <ul className="flex gap-4 items-center">
        <li>
          <Link
            to="/dashboard"
            className="text-gray-700 text-sm tracking-wide underline-offset-3 hover:underline"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <LogoutButton asLink={true} />
        </li>
      </ul>
    );
  }

  if (authenticated && dashboard) {
    navigationRightSide = (
      <ul className="flex gap-4 items-center">
        <h2>Hello</h2>
      </ul>
    );
  }

  return (
    <header className="bg-white py-1.5 border-b border-gray-200">
      <div className="container lg:max-w-292.5 mx-auto flex items-center justify-between py-2 ">
        <div>
          <Link
            to="/"
            className="font-bold text-2xl transition font-google-sans-flex text-neutral-900 hover:bg-neutral-100 rounded-xl px-3 pt-1.5 pb-1.75"
          >
            Monetra
          </Link>
        </div>
        <nav>{navigationRightSide}</nav>
      </div>
    </header>
  );
};

export default Navigation;
