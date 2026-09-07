import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useRegister from '../../features/auth/hooks/useRegister';
import { registerSchema } from '../../features/auth/schemas/auth';
import { type RegisterData } from '../../types/auth';

const Register = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: RegisterData) => {
    mutate(data);
  };

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4 items-stretch"
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="tracking-wide text-sm flex items-center gap-1.5 text-gray-500"
            >
              Email <span className="text-[10px]">(required)</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="border w-82.5 bg-white border-neutral-300 py-2 px-2.5 rounded-md aria-[invalid=true]:border-red-500"
              {...register('email')}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
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
              id="password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className="border w-82.5 bg-white border-neutral-300 py-2 px-2.5 rounded-md aria-[invalid=true]:border-red-500"
              {...register('password')}
            />
            {errors.password && (
              <p
                id="password-error"
                role="alert"
                className="text-sm text-red-600"
              >
                {errors.password.message}
              </p>
            )}
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
              id="confirmPassword"
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword ? 'confirm-password-error' : undefined
              }
              className="border w-82.5 inline-block bg-white border-neutral-300 py-2 px-2.5 rounded-md aria-[invalid=true]:border-red-500"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p
                id="confirm-password-error"
                role="alert"
                className="text-sm text-red-600"
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="cursor-pointer text-base font-medium w-full py-2 rounded-lg bg-neutral-900 text-white hover:shadow-lg transition"
            >
              {isPending ? 'Creating account...' : 'Create my Account'}
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
              onClick={() => navigate('/guest')}
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
