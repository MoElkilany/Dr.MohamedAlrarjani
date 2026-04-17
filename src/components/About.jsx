import { useEffect, useRef, useState } from 'react';
import aboutImg from '../assets/personal image.svg';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-[#0e8fa3]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-[#0e8fa3]/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#0e8fa3]/10 text-[#0e8fa3] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-[#0e8fa3] rounded-full animate-pulse"></span>
            من نحن
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            تعرف على{" "}
            <span className="text-[#0e8fa3]">دكتور محمد العرجاني</span>
          </h2>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            مستشار عقاري بخبرة واسعة في التسويق والاستثمار العقاري، يقدم حلول احترافية مبنية على تحليل دقيق للسوق العقاري
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className={`lg:col-span-5 order-2 lg:order-1 transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                <img 
                  src={aboutImg} 
                  alt="محمد العرجاني - مستشار عقاري" 
                  className="w-full h-auto max-h-[500px] object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm">خبرة واسعة</div>
                    <div className="text-xs text-gray-500">في السوق العقاري</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#0e8fa3]/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0e8fa3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">موثوق</div>
                    <div className="text-sm text-gray-500">وشفاف</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-7 order-1 lg:order-2 transform transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                شغفنا مساعدتك في تحقيق حلم إمتلاك منزلك
              </h3>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                أقدم استشارات عقارية متخصصة تجمع بين الخبرة العميقة في السوق العقاري والتفاني في خدمة العملاء. كل عميل يستحق اهتمامًا شخصيًا وحلولًا مخصصة تناسب احتياجاته.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ),
                    title: 'خبرة واسعة',
                    desc: 'خبرة واسعة في السوق العقاري'
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ),
                    title: 'استشارات مخصصة',
                    desc: 'استشارات مخصصة لكل عميل'
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: 'شفافية',
                    desc: 'شفافية في جميع المعاملات'
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ),
                    title: 'متابعة مستمرة',
                    desc: 'متابعة مستمرة حتى إتمام الصفقة'
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-5 hover:bg-[#0e8fa3]/5 transition-colors duration-300">
                    <div className="w-12 h-12 bg-[#0e8fa3]/10 rounded-xl flex items-center justify-center text-[#0e8fa3] mb-3">
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4">
<a href="#booking" className="bg-[#0e8fa3] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#0a7580] transition-all duration-300 shadow-lg shadow-[#0e8fa3]/20 hover:shadow-xl flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  تواصل معنا
                </a>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}
