import { Link } from 'react-router';

const Hero = () => {
  const recentTransactions = [
    { label: 'Salary', amount: '+2,000 $' },
    { label: 'Groceries', amount: '-85 $' },
    { label: 'Restaurant', amount: '-35 $' },
    { label: 'Transfer', amount: '-200 $' },
  ];

  return (
    <section className="pb-20 flex flex-col items-center justify-center border-b border-gray-200">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-5">
          Take control of your money.
        </h1>
        <p className="text-neutral-500 mb-8 tracking-wide text-center text-base font-medium">
          Track your spending, manage your accounts, and get a clearer view of
          your finances. <br /> Stay organized and make smarter decisions with
          your money.
        </p>
      </div>
      <div className="flex gap-5 justify-center items-center">
        <Link
          to="/register"
          className="cursor-pointer px-3 scale-105 rounded-lg py-2.5 text-sm font-bold text-white bg-neutral-900 hover:shadow-lg transition"
        >
          Get Started
        </Link>
        <button
          type="button"
          className="cursor-pointer px-3 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Continue as guest
        </button>
      </div>

      <div className="mt-15 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-1 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
        <div className="rounded-2xl px-5 py-4">
          <p className="text-center text-sm font-medium text-gray-500">
            Total Balance
          </p>
          <p className="mt-3 text-center text-3xl font-bold text-gray-900">
            1,850 $
          </p>

          <div className="mt-6 grid grid-cols-2 border-t border-gray-200 pt-4">
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-400">
                INCOME
              </p>
              <p className="mt-2 text-lg font-semibold text-teal-600">
                +2,400 $
              </p>
            </div>

            <div className="text-center border-l border-gray-200 pl-3">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-400">
                EXPENSES
              </p>
              <p className="mt-2 text-lg font-semibold text-red-600">-550 $</p>
            </div>
          </div>

          <div className="mt-5 border-t border-gray-200 pt-3">
            <div className="flex items-center justify-between py-2 text-sm text-gray-600">
              <span>Accounts</span>
            </div>
            <div className="flex items-center justify-between py-2 text-sm text-gray-600">
              <span>Bank</span>
              <span className="font-semibold text-gray-800">1,200 $</span>
            </div>
            <div className="flex items-center justify-between py-2 text-sm text-gray-600">
              <span>Savings</span>
              <span className="font-semibold text-gray-800">300 $</span>
            </div>
          </div>

          <div className="mt-5 border-t border-gray-200 pt-3">
            <p className="text-sm font-medium text-gray-600">
              Recent Transactions
            </p>
            <div className="mt-3 space-y-2">
              {recentTransactions.map((tx) => (
                <div
                  key={tx.label}
                  className="flex items-center justify-between text-sm text-gray-700"
                >
                  <span>{tx.label}</span>
                  <span
                    className={`font-semibold ${tx.amount.startsWith('+') ? 'text-teal-600' : 'text-red-600'}`}
                  >
                    {tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
