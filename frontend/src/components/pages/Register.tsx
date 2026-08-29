import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <main className="min-h-screen flex">
      <article className="bg-transparent flex-1 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-5">
          Register at Monetra
        </h2>
        <p className="text-neutral-500 mb-8 tracking-wide text-center text-base font-medium">
          Track your spending, manage your accounts, <br /> and make smarter
          decisions with your money.
        </p>
        <form action="#" className="flex flex-col gap-4 items-stretch">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="tracking-wide text-sm flex items-center gap-1.5 text-gray-500"
            >
              Email <span className="text-[10px]">(required)</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              minLength={5}
              maxLength={254}
              required
              className="border w-82.5 bg-white border-neutral-300 py-2 px-2.5 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="tracking-wide text-sm flex items-center gap-1.5 text-gray-500"
            >
              Password <span className="text-[10px]">(required)</span>
            </label>
            <input
              type="password"
              name="password"
              minLength={8}
              maxLength={20}
              id="password"
              className="border w-82.5 bg-white border-neutral-300 py-2 px-2.5 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <label
              htmlFor="confirmPassword"
              className="tracking-wide text-sm flex items-center gap-1.5 text-gray-500"
            >
              Confirm password <span className="text-[10px]">(required)</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              minLength={8}
              maxLength={20}
              className="border w-82.5 inline-block bg-white border-neutral-300 py-2 px-2.5 rounded-md "
            />
          </div>
          <div>
            <button
              type="submit"
              className="cursor-pointer text-base font-medium w-full py-2 rounded-lg bg-neutral-900 text-white hover:shadow-lg transition"
            >
              Create my Account
            </button>
          </div>
          <div className="flex justify-center">
            <Link
              to="/login"
              className="text-center text-neutral-600 inline-block underline underline-offset-2 text-sm"
            >
              Already have an account? Log in
            </Link>
          </div>
          <div className="flex items-center gap-3 my-3">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <div>
            <button
              type="button"
              className="w-full cursor-pointer rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Continue as Guest
            </button>
          </div>
          <div className="flex items-center justify-center mt-4.5">
            <Link
              to="/"
              className="underline underline-offset-3 text-sm text-neutral-600 "
            >
              Back Home
            </Link>
          </div>
        </form>
      </article>
    </main>
  );
};

export default Register;
