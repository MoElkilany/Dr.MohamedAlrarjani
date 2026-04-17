import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const Services = lazy(() => import('./components/Services'));
const About = lazy(() => import('./components/About'));
const FAQ = lazy(() => import('./components/FAQ'));
const Reviews = lazy(() => import('./components/Reviews'));
const Booking = lazy(() => import('./components/MultiStepBooking'));
const Footer = lazy(() => import('./components/Footer'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const AdminLogin = lazy(() => import('./admin/pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./admin/pages/AdminDashboard'));
const AdminAvailability = lazy(() => import('./admin/pages/AdminAvailability'));
const AdminBookings = lazy(() => import('./admin/pages/AdminBookings'));
const AdminReviews = lazy(() => import('./admin/pages/AdminReviews'));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#0e8fa3]/20 border-t-[#0e8fa3] rounded-full animate-spin"></div>
    </div>
  );
}

function HomePage() {
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

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="availability" element={<AdminAvailability />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="reviews" element={<AdminReviews />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;