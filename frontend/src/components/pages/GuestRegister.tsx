import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useRegister from '../../features/auth/hooks/useRegister';
import { registerSchema } from '../../features/auth/schemas/auth';
import { type RegisterData } from '../../types/auth';

const GUEST_CREDENTIALS = {
  email: 'guest@monetra.com',
  password: 'GuestPassword123!',
  confirmPassword: 'GuestPassword123!',
};

const GuestRegister = () => {
  const navigate = useNavigate();
  const { mutate, error: submitError, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: GUEST_CREDENTIALS.email,
      password: GUEST_CREDENTIALS.password,
      confirmPassword: GUEST_CREDENTIALS.confirmPassword,
    },
  });

  const onSubmit = (data: RegisterData) => {
    mutate(data);
  };

  return (
    <main className="min-h-screen flex">
      <article className="bg-transparent flex-1 flex flex-col items-center justify-center">
        <div className="inline-flex items-center justify-center mb-6 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full">
          <span className="text-xs font-medium text-blue-700">
            🎉 GUEST MODE
          </span>
        </div>
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-2">
          Try Monetra for Free
        </h2>
        <p className="text-neutral-500 mb-3 tracking-wide text-center text-base font-medium">
          This is a temporary guest account. You'll receive some demo money to
          explore
          <br />
          and test all the features of our personal finance tracker.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-md text-sm text-blue-800">
          <p className="font-medium mb-1">✓ Demo account with sample funds</p>
          <p className="font-medium mb-1">✓ Full access to all features</p>
          <p className="font-medium">✓ No login required</p>
        </div>

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
              readOnly
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
              readOnly
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
              readOnly
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
          {submitError && (
            <p role="alert" className="text-sm text-red-600">
              {submitError.message}
            </p>
          )}
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="cursor-pointer text-base font-medium w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transition disabled:opacity-50"
            >
              {isPending ? 'Creating guest account...' : 'Start Testing Now'}
            </button>
          </div>
          <div className="flex items-center gap-3 my-3">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <div>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full cursor-pointer rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Create Your Own Account
            </button>
          </div>
          <div className="flex items-center justify-center mt-4.5">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="underline underline-offset-3 text-sm text-neutral-600"
            >
              Back Home
            </button>
          </div>
        </form>
      </article>
    </main>
  );
};

export default GuestRegister;
