import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useGetAccounts from '../../../../features/account/hooks/useGetAccounts';
import useGetCategories from '../../../../features/category/hooks/useGetCategories';
import useIncomeTransaction from '../../../../features/transaction/hooks/useIncomeTransaction';

import { Plus } from 'lucide-react';

import { type Category } from '../../../../features/category/api/getCategories';

import {
  incomeSchema,
  type IncomeDataType,
} from '../../../../features/transaction/schemas/transaction';

import PageLoader from '../../../ui/PageLoader';

const Income = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IncomeDataType>({
    resolver: zodResolver(incomeSchema),
  });

  const { mutate, isPending } = useIncomeTransaction(setError);

  const {
    accounts,
    isLoading: isAccountsLoading,
    isError: isAccountsError,
  } = useGetAccounts();

  const {
    categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategories();

  const onSubmit = (data: IncomeDataType) => {
    mutate(data);
  };

  const isPageLoading = isCategoriesLoading || isAccountsLoading;
  const isPageError = isCategoriesError || isAccountsError;

  const incomeCategories: Category[] | undefined = categories?.filter(
    (category) => category.type === 'INCOME'
  );

  if (isPageLoading) {
    return <PageLoader />;
  }

  if (isPageError) {
    return (
      <main className="min-h-screen flex">
        <article className="bg-transparent flex-1 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-5">
            Unexpected Error
          </h2>
          <p className="text-neutral-500 mb-8 tracking-wide text-center text-base font-medium">
            Please reload page and try again.
          </p>
          <div className="flex items-center gap-3 my-3">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <div className="flex items-center justify-center">
            <Link
              to="/dashboard"
              className="underline underline-offset-3 text-sm text-neutral-600"
            >
              Back to Dashboard
            </Link>
          </div>
        </article>
      </main>
    );
  }

  const checkAccounts = (accounts?.length ?? 0) > 0;
  const checkCategories = (categories?.length ?? 0) > 0;

  if (!checkAccounts) {
    return (
      <main className="min-h-screen flex">
        <article className="bg-transparent flex-1 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-5">
            No accounts found!
          </h2>
          <p className="text-neutral-500 mb-8 tracking-wide text-center text-base font-medium">
            You need at least one account before you can record an income.{' '}
            <br />
            Please create them first and try again.
          </p>
          <div className="flex items-center gap-5">
            <div>
              <a
                href="/account"
                className="inline-flex items-center gap-2 justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
              >
                <Plus size={17} /> Add account
              </a>
            </div>
            <div className="flex items-center gap-3 my-3">
              <span className="text-sm text-gray-500">or</span>
            </div>

            <div className="flex items-center justify-center">
              <Link
                to="/dashboard"
                className="underline underline-offset-3 text-sm text-neutral-600"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </article>
      </main>
    );
  }

  if (!checkCategories) {
    return (
      <main className="min-h-screen flex">
        <article className="bg-transparent flex-1 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-5">
            No categories found!
          </h2>
          <p className="text-neutral-500 mb-8 tracking-wide text-center text-base font-medium">
            You need at least one category before you can record an income.{' '}
            <br />
            Please create them first and try again.
          </p>
          <div className="flex items-center gap-5">
            <div>
              <a
                href="/category"
                className="inline-flex items-center gap-2 justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
              >
                <Plus size={17} /> Add category
              </a>
            </div>
            <div className="flex items-center gap-3 my-3">
              <span className="text-sm text-gray-500">or</span>
            </div>

            <div className="flex items-center justify-center">
              <Link
                to="/dashboard"
                className="underline underline-offset-3 text-sm text-neutral-600"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </article>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex">
      <article className="bg-transparent flex-1 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-5">
          Add Income
        </h2>
        <p className="text-neutral-500 mb-8 tracking-wide text-center text-base font-medium">
          Record money coming in from your account and categorize it.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4 items-stretch"
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="accountId"
              className="tracking-wide flex items-center gap-1.5 text-sm text-gray-500"
            >
              Account <span className="text-[10px]">(required)</span>
            </label>
            <select
              id="accountId"
              defaultValue=""
              required
              aria-invalid={Boolean(errors.accountId)}
              className="border w-82.5 bg-white border-neutral-300 py-2 px-2.5 rounded-md aria-invalid:border-red-500"
              {...register('accountId')}
            >
              <option value="" disabled>
                Select account
              </option>
              {accounts?.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
            {errors.accountId && (
              <p role="alert" className="text-sm text-red-600">
                {errors.accountId.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="categoryId"
              className="tracking-wide flex items-center gap-1.5 text-sm text-gray-500"
            >
              Category <span className="text-[10px]">(required)</span>
            </label>
            <select
              id="categoryId"
              defaultValue=""
              required
              aria-invalid={Boolean(errors.categoryId)}
              className="border w-82.5 bg-white border-neutral-300 py-2 px-2.5 rounded-md aria-invalid:border-red-500"
              {...register('categoryId')}
            >
              <option value="" disabled>
                Select income category
              </option>
              {incomeCategories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p role="alert" className="text-sm text-red-600">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="amount"
              className="tracking-wide flex items-center gap-1.5 text-sm text-gray-500"
            >
              Amount $ <span className="text-[10px]">(required)</span>
            </label>
            <input
              id="amount"
              type="number"
              step={0.01}
              min={0}
              aria-invalid={Boolean(errors.amount)}
              className="border w-82.5 bg-white border-neutral-300 py-2 px-2.5 rounded-md aria-invalid:border-red-500"
              {...register('amount', {
                setValueAs: (value) =>
                  value === '' ? undefined : Number(value),
              })}
            />
            {errors.amount && (
              <p role="alert" className="text-sm text-red-600">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="cursor-pointer text-base font-medium w-full py-2 rounded-lg bg-neutral-900 text-white hover:shadow-lg transition"
            >
              {isPending ? 'Creating income...' : 'Create income'}
            </button>
          </div>

          <div className="flex items-center gap-3 my-3">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <div className="flex items-center justify-center">
            <Link
              to="/dashboard"
              className="underline underline-offset-3 text-sm text-neutral-600"
            >
              Back to Dashboard
            </Link>
          </div>
        </form>
      </article>
    </main>
  );
};

export default Income;
