import { Link } from 'react-router-dom';

import { Plus } from 'lucide-react';

import useGetAccounts from '../../features/account/hooks/useGetAccounts';

import PageLoader from '../ui/PageLoader';

const ManageAccounts = () => {
  const { accounts, isLoading, isError } = useGetAccounts();

  const TOTAL = (accounts ?? []).reduce((sum, account) => {
    return sum + Number(account.balance);
  }, 0);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-stone-50 p-6 font-noto text-neutral-900 sm:p-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-stone-200 bg-white p-8 shadow-sm shadow-stone-200/60">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Accounts
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Manage accounts
          </h1>
          <p className="mt-3 text-base text-neutral-600">
            Add, edit, or review your financial accounts and balances.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
            <div className="divide-y divide-stone-200">
              <p className="text-xl px-4 py-1.5 text-red-600">
                Failed to load accounts.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 p-6 font-noto text-neutral-900 sm:p-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-stone-200 bg-white p-8 shadow-sm shadow-stone-200/60">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
          Accounts
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Manage accounts
        </h1>
        <p className="mt-3 text-base text-neutral-600">
          Add, edit, or review your financial accounts and balances.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
          <div className="hidden grid-cols-[1.5fr_1fr_auto] items-center gap-4 border-b border-stone-200 bg-stone-100 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:grid">
            <span>Account</span>
            <span>Balance</span>
            <span className="text-right">Actions</span>
          </div>

          <div className="divide-y divide-stone-200">
            {accounts?.map((account) => (
              <div
                key={account.id}
                className="grid gap-3 px-4 py-4 sm:grid-cols-[1.8fr_1fr_auto] sm:items-center sm:gap-4 sm:px-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-sm font-semibold text-white">
                    {account.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">
                      {account.name}
                    </p>
                    <p className="text-xs text-neutral-500">Personal account</p>
                  </div>
                </div>

                <div className="text-base font-semibold text-neutral-800 sm:text-left">
                  {formatCurrency(account.balance)}
                </div>

                <div className="flex items-center gap-2 sm:justify-end">
                  <button
                    type="button"
                    className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:bg-stone-100"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:border-red-300 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 rounded-xl border border-dashed border-stone-200 bg-stone-50 p-4">
          <div>
            <p className="text-sm font-medium text-neutral-700">
              Total balance
            </p>
            <p className="mt-1 text-xl font-semibold text-neutral-900">
              {formatCurrency(TOTAL)}
            </p>
          </div>

          <a
            href="/account"
            className="inline-flex items-center gap-2 justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            <Plus size={17} />
            Add account
          </a>
        </div>

        <div className="mt-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ManageAccounts;
