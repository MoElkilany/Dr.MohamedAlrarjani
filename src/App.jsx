import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import FAQ from './components/FAQ';
import Reviews from './components/Reviews';
import Booking from './components/Booking';
import Footer from './components/Footer';

function App() {
  return (
    <div dir="rtl" lang="ar">
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
    </div>
  );
}

export default App;