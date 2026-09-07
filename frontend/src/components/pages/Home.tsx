import { Link } from 'react-router-dom';

import Navigation from '../ui/Navigation';
import Hero from '../ui/Hero';
import Features from '../ui/Features';
import CTA from '../ui/CTA';
import Footer from '../ui/Footer';
import LogoutButton from '../ui/LogoutButton';

import useMe from '../../features/auth/hooks/useMe';

const Home = () => {
  const { user } = useMe();

  if (user) {
    return (
      <div>
        <Navigation authenticated />
        <main className="container mx-auto mt-12 px-1 py-2 lg:max-w-270">
          <section className="pb-6">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
                Welcome back!
              </h1>
              <p className="mt-3 text-base font-medium text-neutral-600 sm:text-lg">
                Manage your finances and keep track of your money.
              </p>
              <div className="flex gap-5 justify-center items-center mt-5">
                <Link
                  to="/dashboard"
                  className="cursor-pointer px-3 scale-105 rounded-lg py-2.5 text-sm font-bold text-white bg-neutral-900 hover:shadow-lg transition"
                >
                  Dashboard
                </Link>
                <LogoutButton asLink={false} />
              </div>
            </div>
            <Hero authenticated />
          </section>
        </main>
        <Footer authenticated />
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <main className="container lg:max-w-270 mx-auto mt-12 px-1 py-2">
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
