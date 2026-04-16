import { useEffect, useRef, useState } from 'react';

const services = [
  {
    title: 'استشارة عقارية',
    description: 'استشارة حضورية أو أونلاين مع أفضل الخبراء العقاريين لمساعدتك في اتخاذ القرار الأمثل',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-19.5-18v18m0-18v18m0-18v18m0-18v18m0-18v18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 007.92 12.446A9 9 0 1112 2.992z" />
      </svg>
    ),
    features: ['تقييم شامل للموقع', 'تحليل السوق العقاري', 'توصيات مخصصة'],
    color: 'from-emerald-500 to-teal-600'
  },
  {
    title: 'تقييم عقار',
    description: 'تقييم دقيق ومهني لعقارك بأحدث الطرق والبيانات السوقية لضمان أعلى قيمة',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    features: ['تقرير مفصل', 'مقارنة بالسوق', 'توثيق رسمي'],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'تسويق عقار',
    description: 'بيع سريع واحترافي مع أفضل العروض من خلال شبكة واسعة من المشترين والمستثمرين',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    features: ['تسويق رقمي متقدم', 'التواصل مع المشترين', 'إتمام الصفقة بأمان'],
    color: 'from-orange-500 to-amber-600'
  },
  {
    title: 'إدارة عقارات',
    description: 'إدارة شاملة لعقارك بما في ذلك الصيانة والإيجارات وتحصيل المستحقات',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    features: ['صيانة دورية', 'إدارة المستأجرين', 'تقارير شهرية'],
    color: 'from-purple-500 to-violet-600'
  }
];

const additionalServices = [
  {
    title: 'طلب تصوير عقار',
    description: 'يمكننا أيضاً تصوير عقارك صور احترافية تساعدك في البيع / الإيجار',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
    color: 'from-rose-500 to-pink-600',
    cta: 'اطلب الآن'
  },
  {
    title: 'طلب تطوير البنية التحتية',
    description: 'لدينا أيضاً موسوعة من أفضل مطورين العقارات يمكنك طلب مطورك العقاري الآن',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008V19.125z" />
      </svg>
    ),
    color: 'from-cyan-500 to-blue-600',
    cta: 'اطلب الآن'
  },
  {
    title: 'طلب مقاول لبناء عقار',
    description: 'نتشرف بإحضار مقاول لبناء عقارك على أكمل وجه وأفضل سعر',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'from-amber-500 to-yellow-600',
    cta: 'اطلب الآن'
  }
];

export default function Services() {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCards([0, 1, 2, 3]);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0e8fa3]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0e8fa3]/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#0e8fa3]/10 text-[#0e8fa3] rounded-full text-sm font-medium mb-4">
            خدماتنا المتخصصة
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            حلول عقارية شاملة
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            نوفر لك مجموعة متكاملة من الخدمات العقارية الاحترافية التي تلبي جميع احتياجاتك
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-white rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#0e8fa3]/20 hover:-translate-y-2 relative overflow-hidden transform transition-all duration-700 ${visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-[#0e8fa3] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                      <svg className={`w-4 h-4 text-[#0e8fa3] flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-gradient-to-r from-[#0e8fa3] to-[#0a7580] text-white py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-[#0e8fa3]/30 transition-all duration-300 group-hover:scale-105">
                  احجز الآن
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#0e8fa3]/10 text-[#0e8fa3] rounded-full text-sm font-medium mb-4">
              خدمات إضافية
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              خدمات متخصصة أخرى
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              اكتشف المزيد من الخدمات الاحترافية التي نوفرها لتلبية جميع احتياجاتك العقارية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className={`group bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#0e8fa3]/20 hover:-translate-y-2 relative overflow-hidden transform transition-all duration-700 ${visibleCards.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${(index + 4) * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-[#0e8fa3] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  <button className="w-full bg-gradient-to-r from-[#0e8fa3] to-[#0a7580] text-white py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-[#0e8fa3]/30 transition-all duration-300 group-hover:scale-105">
                    {service.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}