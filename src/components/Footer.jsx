import { useState } from 'react';

const socialLinks = [
  { name: 'X', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126h5.896z', href: 'https://x.com/dr_mohamedrjani?s=11&t=jbcgMjt6iHDbvjWtfTOzww' },
  { name: 'Snapchat', icon: 'M23.881 9.275c-.303-.959-1.165-1.673-2.164-1.789a2.4 2.4 0 00-2.302.988c-1.083.891-2.413 1.215-3.752.869-1.339-.346-2.275-1.374-2.636-2.766-.361-1.391.073-2.86 1.158-3.936.974-.966 2.283-1.417 3.521-1.232 1.238.185 2.294.894 2.793 2.003.023.051.046.105.065.16.19-.262.382-.517.568-.781.912-1.29 1.974-2.457 3.159-3.5-2.209-2.698-5.433-4.318-9.052-4.318-3.62 0-6.843 1.62-9.053 4.318 1.186 1.043 2.247 2.21 3.158 3.5.186.264.378.519.569.781.019-.055.042-.109.064-.16.5-1.109 1.556-1.818 2.793-2.003 1.238-.185 2.548.266 3.521 1.232 1.085 1.076 1.52 2.545 1.158 3.936-.361 1.392-1.297 2.42-2.636 2.766-1.339.346-2.669.022-3.752-.869a2.4 2.4 0 00-2.302-.988c-.999.116-1.861.83-2.164 1.789-.261.826-.119 1.721.388 2.465.506.743 1.322 1.238 2.213 1.37.89.132 1.819-.071 2.525-.554.706-.482 1.204-1.172 1.353-1.906.149-.735-.03-1.493-.512-2.103L.922 11.27c-.482-.61-.611-1.404-.369-2.174.303-.959 1.165-1.673 2.164-1.789a2.4 2.4 0 002.302.988c1.083-.891 2.413-1.215 3.752-.869 1.339.346 2.275 1.374 2.636 2.766.361 1.391-.073 2.86-1.158 3.936-.974.966-2.283 1.417-3.521 1.232-1.238-.185-2.294-.894-2.793-2.003-.023-.051-.046-.105-.065-.16-.19.262-.382.517-.568.781-.912 1.29-1.974 2.457-3.159 3.5 2.209 2.698 5.433 4.318 9.052 4.318 3.62 0 6.843-1.62 9.053-4.318-1.186-1.043-2.247-2.21-3.158-3.5-.186-.264-.378-.519-.569-.781-.019.055-.042.109-.064.16-.5 1.109-1.556 1.818-2.793 2.003-1.238.185-2.548-.266-3.521-1.232-1.085-1.076-1.52-2.545-1.158-3.936.361-1.392 1.297-2.42 2.636-2.766 1.339-.346 2.669-.022 3.752.869a2.4 2.4 0 002.302.988c.999-.116 1.861-.83 2.164-1.789.261-.826.119-1.721-.388-2.465-.506-.743-1.322-1.238-2.213-1.37-.89-.132-1.819.071-2.525.554-.706.482-1.204 1.172-1.353 1.906-.149.735.03 1.493.512 2.103l2.375 3.092c.482.61.611 1.404.369 2.174z', href: 'https://www.snapchat.com/@www11w?invite_id=zsKsaOcG&share_id=UwZLFHCeQq-jKe0RJFd3oQ&sid=a42efcf4c3184b949bf63f4f6b4bf6ff' },
  { name: 'WhatsApp', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.162-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.493.099-.198.05-.371.025-.524-.05-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
];

const contactInfo = [
  { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: '0550000294', href: 'tel:0550000294' },
  { icon: 'M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z', label: 'uu1@outlook.sa', href: 'mailto:uu1@outlook.sa' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'الرياض، المملكة العربية السعودية', href: '#' },
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
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={info.icon} />
                      </svg>
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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
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
