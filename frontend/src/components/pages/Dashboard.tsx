import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';

import Navigation from '../ui/Navigation';
import useMe from '../../features/auth/hooks/useMe';

const Dashboard = () => {
  const { user } = useMe();

  const displayEmail = user?.user.email.startsWith('guest-')
    ? 'Guest account'
    : user?.user.email;

  return (
    <main className="min-h-screen bg-stone-50 font-noto text-neutral-900">
      <Navigation authenticated={!!user} dashboard={true} />

      <div className="container lg:max-w-292.5 mx-auto px-5 py-8 sm:px-8 sm:py-10">
        <section
          id="overview"
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-gray-200 pb-8"
        >
          <div>
            <p className="mb-1 text-sm text-neutral-500">
              {format(new Date(), 'EEEE, MMMM d')}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Good morning, {displayEmail}
            </h1>
          </div>
        </section>

        <section className="mb-8 flex items-center justify-between border-b border-gray-200 pb-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/income"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              <Plus size={17} /> Income
            </a>
            <a
              href="/expense"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
            >
              <Plus size={17} /> Expense
            </a>
            <a
              href="/account"
              className="inline-flex items-center gap-2 justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              <Plus size={17} /> Add account
            </a>
            <a
              href="/category"
              className="inline-flex items-center gap-2 justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              <Plus size={17} /> Add category
            </a>
          </div>
          <div className="flex flex-wrap gap-3 rounded-2xl">
            <Link
              to="/manage-accounts"
              className="inline-flex items-center justify-center rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-medium text-neutral-900 transition hover:bg-stone-100"
            >
              Manage accounts
            </Link>
            <Link
              to="/manage-categories"
              className="inline-flex items-center justify-center rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-medium text-neutral-900 transition hover:bg-stone-100"
            >
              Manage categories
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
