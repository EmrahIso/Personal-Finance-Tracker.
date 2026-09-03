import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  ChevronDown,
  MoreHorizontal,
  Plus,
  Search,
  WalletCards,
} from 'lucide-react';

import useMe from '../../features/auth/hooks/useMe';

const transactions = [
  {
    name: 'Supermarket',
    category: 'Groceries',
    date: 'Today, 10:42',
    amount: '-€42.80',
    icon: '🛒',
    tone: 'bg-orange-50',
  },
  {
    name: 'Salary',
    category: 'Income',
    date: 'Yesterday',
    amount: '+€2,400.00',
    icon: '💼',
    tone: 'bg-emerald-50',
  },
  {
    name: 'Netflix',
    category: 'Entertainment',
    date: 'Jun 24',
    amount: '-€9.99',
    icon: 'N',
    tone: 'bg-red-50',
  },
  {
    name: 'Shell',
    category: 'Transport',
    date: 'Jun 23',
    amount: '-€55.20',
    icon: '⛽',
    tone: 'bg-amber-50',
  },
];

const Dashboard = () => {
  const { user } = useMe();

  return (
    <main className="min-h-screen bg-stone-50 font-noto text-neutral-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-10">
            <span className="font-google-sans-flex text-2xl font-bold tracking-tight">
              Monetra
            </span>
            <nav className="hidden items-center gap-7 text-sm font-medium text-neutral-500 md:flex">
              <a className="text-neutral-900" href="#overview">
                Overview
              </a>
              <a className="hover:text-neutral-900" href="#transactions">
                Transactions
              </a>
              <a className="hover:text-neutral-900" href="#budgets">
                Budgets
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button
              aria-label="Search"
              className="hidden rounded-lg p-2 text-neutral-500 hover:bg-stone-100 sm:block"
            >
              <Search size={19} />
            </button>
            <button
              aria-label="Notifications"
              className="rounded-lg p-2 text-neutral-500 hover:bg-stone-100"
            >
              <Bell size={19} />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
              EM
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <section
          id="overview"
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-1 text-sm text-neutral-500">Wednesday, June 26</p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Good morning, {user?.email}
            </h1>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700">
            <Plus size={17} /> Add transaction
          </button>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl bg-neutral-900 p-6 text-white shadow-sm md:col-span-1">
            <div className="mb-8 flex items-center justify-between text-neutral-300">
              <span className="text-sm">Total balance</span>
              <WalletCards size={20} />
            </div>
            <p className="text-3xl font-semibold tracking-tight">€8,942.50</p>
            <p className="mt-3 flex items-center gap-1 text-sm text-emerald-300">
              <ArrowUpRight size={16} /> 12.5%{' '}
              <span className="text-neutral-400">from last month</span>
            </p>
          </article>
          <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-8 flex items-center justify-between text-neutral-500">
              <span className="text-sm">Income</span>
              <span className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
                <ArrowDownRight size={18} />
              </span>
            </div>
            <p className="text-3xl font-semibold tracking-tight">€3,680.00</p>
            <p className="mt-3 text-sm text-neutral-500">This month</p>
          </article>
          <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-8 flex items-center justify-between text-neutral-500">
              <span className="text-sm">Expenses</span>
              <span className="rounded-lg bg-rose-50 p-2 text-rose-600">
                <ArrowUpRight size={18} />
              </span>
            </div>
            <p className="text-3xl font-semibold tracking-tight">€1,245.65</p>
            <p className="mt-3 text-sm text-neutral-500">This month</p>
          </article>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-5">
          <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:col-span-3">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Spending overview</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Your expenses this month
                </p>
              </div>
              <button className="flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900">
                This month <ChevronDown size={15} />
              </button>
            </div>
            <div className="flex h-52 items-end gap-3 border-b border-stone-100 pb-1 sm:gap-5">
              {[42, 66, 48, 82, 55, 36, 68, 91, 59, 73, 64, 88].map(
                (height, index) => (
                  <div
                    key={index}
                    className="group flex flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div
                      style={{ height: `${height}%` }}
                      className={`w-full rounded-t-md transition group-hover:opacity-70 ${index === 7 ? 'bg-teal-600' : 'bg-stone-200'}`}
                    />
                    <span className="text-[10px] text-neutral-400">
                      {index % 2 === 0 ? index + 1 : ''}
                    </span>
                  </div>
                )
              )}
            </div>
          </article>

          <article
            id="budgets"
            className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:col-span-2"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Monthly budget</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  €1,245 of €1,800 spent
                </p>
              </div>
              <MoreHorizontal size={20} className="text-neutral-400" />
            </div>
            <div className="mb-6 h-2 overflow-hidden rounded-full bg-stone-100">
              <div className="h-full w-[69%] rounded-full bg-teal-600" />
            </div>
            <div className="space-y-4">
              {[
                ['Groceries', '€382 / €500', '76%'],
                ['Transport', '€164 / €250', '66%'],
                ['Entertainment', '€108 / €200', '54%'],
              ].map(([name, value, width]) => (
                <div key={name}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="font-medium">{name}</span>
                    <span className="text-neutral-500">{value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full bg-neutral-800"
                      style={{ width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section
          id="transactions"
          className="mt-6 rounded-2xl border border-stone-200 bg-white shadow-sm"
        >
          <div className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-lg font-semibold">Recent transactions</h2>
              <p className="mt-1 text-sm text-neutral-500">
                Your latest activity
              </p>
            </div>
            <button className="text-sm font-medium text-teal-700 hover:text-teal-900">
              View all
            </button>
          </div>
          <div className="divide-y divide-stone-100">
            {transactions.map((transaction) => (
              <div
                key={transaction.name}
                className="flex items-center gap-4 px-6 py-4"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${transaction.tone}`}
                >
                  {transaction.name === 'Netflix' ? (
                    <span className="font-bold text-red-600">N</span>
                  ) : (
                    transaction.icon
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-sm text-neutral-500">
                    {transaction.category} · {transaction.date}
                  </p>
                </div>
                <span
                  className={`font-medium ${transaction.amount.startsWith('+') ? 'text-emerald-700' : 'text-neutral-900'}`}
                >
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
