import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import usePostAccount from '../../../../features/account/hooks/usePostAccount';

import {
  accountSchema,
  type AccountDataOutput,
  type AccountDataInput,
} from '../../../../features/account/schemas/account';

import { zodResolver } from '@hookform/resolvers/zod';

const AddAccount = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AccountDataInput, undefined, AccountDataOutput>({
    resolver: zodResolver(accountSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { mutate, isPending } = usePostAccount(setError);

  const onSubmit = (data: AccountDataOutput) => {
    mutate(data);
  };

  return (
    <main className="min-h-screen flex">
      <article className="bg-transparent flex-1 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-5">
          Create Account
        </h2>
        <p className="text-neutral-500 mb-8 tracking-wide text-center text-base font-medium">
          An account represents a place where you keep your money,
          <br /> such as a bank account, cash, or savings account.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4 items-stretch"
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="accountName"
              className="tracking-wide flex items-center gap-1.5 text-sm text-gray-500"
            >
              Name <span className="text-[10px]">(required)</span>
            </label>
            <input
              type="text"
              id="accountName"
              placeholder="e.g. Savings, Bank Account"
              aria-invalid={Boolean(errors.accountName)}
              className="border w-82.5 bg-white border-neutral-300 py-2 px-2.5 rounded-md aria-[invalid=true]:border-red-500"
              {...register('accountName')}
            />
            {errors.accountName && (
              <p
                id="accountName-error"
                role="alert"
                className="text-sm text-red-600"
              >
                {errors.accountName.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <label
              htmlFor="initialBalance"
              className="tracking-wide flex items-center gap-1.5 text-sm text-gray-500"
            >
              Initial Balance $ <span className="text-[10px]">(required)</span>
            </label>
            <input
              type="number"
              id="initialBalance"
              step={0.01}
              min={0}
              placeholder="Current available amount in this account."
              aria-invalid={Boolean(errors.initialBalance)}
              className="border w-82.5 bg-white border-neutral-300 py-2 px-2.5 rounded-md aria-[invalid=true]:border-red-500"
              {...register('initialBalance')}
            />
            {errors.initialBalance && (
              <p
                id="initialBalance-error"
                role="alert"
                className="text-sm text-red-600"
              >
                {errors.initialBalance.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="cursor-pointer text-base font-medium w-full py-2 rounded-lg bg-neutral-900 text-white hover:shadow-lg transition"
            >
              {isPending ? 'Creating account...' : 'Create account'}
            </button>
          </div>
          <div className="flex items-center gap-3 my-3">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <div className="flex items-center justify-center ">
            <Link
              to="/dashboard"
              className="underline underline-offset-3 text-sm text-neutral-600 "
            >
              Back to Dashboard
            </Link>
          </div>
        </form>
      </article>
    </main>
  );
};

export default AddAccount;
