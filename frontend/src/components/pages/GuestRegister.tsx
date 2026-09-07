import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import useGuest from '../../features/auth/hooks/useGuest';

const GuestRegister = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const { mutate, isPending } = useGuest();

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
      <article className="flex flex-col items-center justify-center w-full max-w-md px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full">
            <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">
              Guest mode
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Monetra</h2>
          <p className="text-neutral-600 text-lg font-medium">
            Your Personal Finance Companion
          </p>
        </div>

        <div className="w-full flex flex-col space-y-3">
          <form action="#" noValidate onSubmit={handleSubmit(() => mutate())}>
            <button
              type="submit"
              disabled={isPending}
              className="cursor-pointer text-base font-medium w-full py-2 rounded-lg bg-neutral-900 text-white hover:shadow-lg transition"
            >
              {isPending ? 'Creating guest account...' : 'Continue as Guest'}
            </button>
          </form>
          <div className="flex items-center gap-3 my-3">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="w-full cursor-pointer mt-4 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Create your own account
          </button>
          <Link
            type="button"
            to="/"
            className="underline text-center underline-offset-3 mt-2 text-sm text-neutral-600 cursor-pointer "
          >
            Back Home
          </Link>
        </div>
      </article>
    </main>
  );
};

export default GuestRegister;
