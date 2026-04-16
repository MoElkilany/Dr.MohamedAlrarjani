import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <footer className="bg-[#0e8fa3] text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">تواصل معنا</h2>
        
        <form className="max-w-md mx-auto space-y-4">
          <input
            placeholder="البريد الإلكتروني"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg text-gray-900"
          />
          <textarea
            placeholder="رسالتك"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-lg text-gray-900 h-32"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity w-full"
          >
            إرسال الرسالة
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/80 text-sm">
            © {new Date().getFullYear()} محمد العرجاني. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}