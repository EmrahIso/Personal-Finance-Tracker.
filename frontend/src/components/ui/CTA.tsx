import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="mt-16 pb-16 w-full ">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Your finances. Your decisions.
        </h2>
        <div className="mt-6">
          <Link
            to="/register"
            className="inline-flex cursor-pointer items-center rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:shadow-lg transition"
          >
            Create your account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
