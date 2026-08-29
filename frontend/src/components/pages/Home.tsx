import Navigation from '../ui/Navigation';

import Hero from '../ui/Hero';
import Features from '../ui/Features';
import CTA from '../ui/CTA';
import Footer from '../ui/Footer';

const Home = () => {
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
