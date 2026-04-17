import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    setLoaded(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'الرئيسية' },
    { href: '#services', label: 'الخدمات' },
    { href: '#about', label: 'من نحن' },
    { href: '#faq', label: 'الأسئلة الشائعة' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-white shadow-sm py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#0e8fa3]/20 bg-white flex items-center justify-center p-1">
              <img 
                src="/src/assets/personal image.svg" 
                alt="د. محمد العرجاني" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-bold text-xl text-gray-800">د. محمد العرجاني</span>
              <div className="text-xs text-[#0e8fa3] -mt-1">مستشار ومحلل عقاري</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-[#0e8fa3] transition-colors duration-200 font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0e8fa3] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="#booking" className="bg-gradient-to-r from-[#0e8fa3] to-[#0a7580] text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-[#0e8fa3]/30 transition-all duration-300 hover:scale-105 inline-block">
              احجز الآن
            </a>
          </div>

          <button
            className="md:hidden p-2 text-gray-600 hover:text-[#0e8fa3] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
            <div className="space-y-3 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-gray-600 hover:text-[#0e8fa3] transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#booking" onClick={() => setIsMenuOpen(false)} className="w-full bg-gradient-to-r from-[#0e8fa3] to-[#0a7580] text-white py-3 rounded-xl font-medium mt-4 inline-block text-center">
                احجز الآن
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}