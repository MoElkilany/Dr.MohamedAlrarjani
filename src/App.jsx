import { lazy, Suspense } from 'react';

const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const Services = lazy(() => import('./components/Services'));
const About = lazy(() => import('./components/About'));
const FAQ = lazy(() => import('./components/FAQ'));
const Reviews = lazy(() => import('./components/Reviews'));
const Booking = lazy(() => import('./components/Booking'));
const Footer = lazy(() => import('./components/Footer'));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#0e8fa3]/20 border-t-[#0e8fa3] rounded-full animate-spin"></div>
    </div>
  );
}

function App() {
  return (
    <div dir="rtl" lang="ar">
      <Suspense fallback={<LoadingFallback />}>
        <Navbar />
        <main>
          <Hero />
          <Services />
          <About />
          <FAQ />
          <Reviews />
          <Booking />
        </main>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
