import { Link, useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-16 pb-16 w-full ">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Your finances. Your decisions.
        </h2>
        <div className="mt-6 flex gap-3 justify-center">
          <Link
            to="/register"
            className="inline-flex cursor-pointer items-center rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:shadow-lg transition"
          >
            Create your account
          </Link>
          <button
            type="button"
            onClick={() => navigate('/guest-register')}
            className="cursor-pointer px-3 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Continue as guest
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
