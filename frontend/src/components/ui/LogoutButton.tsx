import { useState, useEffect } from 'react';
import useLogout from '../../features/auth/hooks/useLogout';

type LogoutButtonProps = {
  asLink: boolean;
};

const LogoutButton = ({ asLink = false }: LogoutButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useLogout();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const handleLogout = () => {
    mutate();
    setIsOpen(false);
  };

  return (
    <>
      {asLink ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="text-gray-700 text-sm tracking-wide cursor-pointer underline-offset-3 hover:underline"
        >
          Logout
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="cursor-pointer px-3 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Logout
        </button>
      )}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-2xl text-center font-semibold text-gray-900 mb-4">
              Confirm Logout
            </h2>
            <p className="mb-6 text-base font-medium text-neutral-600 sm:text-lg">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer px-3 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isPending}
                className="cursor-pointer px-3 rounded-lg border bg-red-500 border-gray-100 py-2.5 text-sm font-medium text-neutral-200 transition hover:bg-red-600"
              >
                {isPending ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
