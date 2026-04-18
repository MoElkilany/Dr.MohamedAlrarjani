import { useState } from 'react';
import { FaXTwitter, FaTiktok, FaSnapchat, FaWhatsapp, FaEnvelope, FaPhone, FaLocationDot } from 'react-icons/fa6';

const socialLinks = [
  { name: 'X', icon: <FaXTwitter className="w-5 h-5" />, href: 'https://x.com/dr_mohamedrjani?s=11&t=jbcgMjt6iHDbvjWtfTOzww' },
  { name: 'TikTok', icon: <FaTiktok className="w-5 h-5" />, href: 'https://www.tiktok.com/@mm1ww?_r=1&_t=ZS-95afgZxjbVN' },
  { name: 'Snapchat', icon: <FaSnapchat className="w-5 h-5" />, href: 'https://www.snapchat.com/@www11w?invite_id=zsKsaOcG&share_id=UwZLFHCeQq-jKe0RJFd3oQ&sid=a42efcf4c3184b949bf63f4f6b4bf6ff' },
  { name: 'WhatsApp', icon: <FaWhatsapp className="w-5 h-5" />, href: 'https://wa.me/966550000294' },
];

const contactInfo = [
  { icon: <FaPhone className="w-5 h-5" />, label: '0550000294', href: 'tel:0550000294' },
  { icon: <FaEnvelope className="w-5 h-5" />, label: 'uu1@outlook.sa', href: 'mailto:uu1@outlook.sa' },
  { icon: <FaLocationDot className="w-5 h-5" />, label: 'الرياض، المملكة العربية السعودية', href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <footer className="bg-gradient-to-br from-[#0e8fa3] to-[#0a7580] text-white py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">تواصل معنا</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            نحن هنا للإجابة على استفساراتك ومساعدتك في جميع احتياجاتك العقارية
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-6">معلومات التواصل</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 text-white/90 hover:text-white transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      {info.icon}
                    </div>
                    <span>{info.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-6">تابعنا على</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">شكراً لتواصلكم!</h3>
                <p className="text-white/80">سنقوم بالرد عليكم في أقرب وقت ممكن</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-semibold mb-6">أرسل لنا رسالة</h3>
                
                <div>
                  <input
                    type="text"
                    placeholder="الاسم"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                
                <div>
                  <textarea
                    placeholder="رسالتك"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white text-[#0e8fa3] font-semibold rounded-xl hover:bg-white/90 transition-colors cursor-pointer"
                >
                  إرسال الرسالة
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} محمد العرجاني. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
