import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#hero', label: 'الرئيسية' },
    { href: '#services', label: 'الخدمات' },
    { href: '#about', label: 'من نحن' },
    { href: '#faq', label: 'الأسئلة الشائعة' },
  ];

  return (
    <nav className="bg-white py-4 px-6 shadow sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="font-bold text-xl text-gray-800">
          محمد العرجاني
        </div>

        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-[#0e8fa3] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="bg-[#0e8fa3] text-white px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          احجز الآن
        </button>

        <button
          className="md:hidden p-2 text-gray-600"
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
        <div className="md:hidden mt-4 space-y-2 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}