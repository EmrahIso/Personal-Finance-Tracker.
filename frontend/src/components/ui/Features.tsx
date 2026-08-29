import {
  CreditCardCheck,
  ChartNoAxesCombined,
  ArrowRightLeft,
} from 'lucide-react';

const features = [
  {
    icon: <CreditCardCheck />,
    title: 'Accounts',
    description: 'Manage your money across accounts.',
  },
  {
    icon: <ArrowRightLeft />,
    title: 'Transactions',
    description: 'Track income and expenses easily.',
  },
  {
    icon: <ChartNoAxesCombined />,
    title: 'Insights',
    description: 'Understand where your money goes.',
  },
];

const Features = () => {
  return (
    <section className="border-b border-gray-200 pt-16 pb-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-5">
            Everything in one place
          </h2>
          <p className="text-neutral-500 mb-8 tracking-wide text-center text-base font-medium">
            Simple tools to help you track, manage, and understand your
            finances.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={`${feature.title}-card`}
              className="flex hover:scale-105 hover:rotate-1 transition-transform  min-h-40 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-xs"
            >
              <div className="mb-6 flex h-13 w-13 items-center justify-center rounded-xl bg-gray-100 text-3xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2.5 leading-4.5 text-neutral-500 mb-1 tracking-wide text-center text-sm font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
