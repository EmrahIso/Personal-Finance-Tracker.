import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900">Monetra</h3>
            <p className="mt-2 text-sm text-gray-600">
              Take control of your money.
            </p>
          </div>

          <nav>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                {' '}
                <Link
                  to="/register"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <nav>
              <ul>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Linkedin
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="my-8 border-t border-gray-200" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-600">© {currentYear} Monetra</p>
          <p className="text-sm text-gray-600">
            Built by{' '}
            <a
              href="https://github.com/emrahisovic"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-900 hover:underline"
            >
              Emrah Isovic
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
