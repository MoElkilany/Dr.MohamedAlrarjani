import { useState, useRef, useEffect } from 'react';

const faqItems = [
  {
    question: 'هل تقدمون استشارات عقارية؟',
    answer: 'نقدم جميع أنواع الاستشارات العقارية المتخصصة، سواء حضورياً في مكتبنا أو عن بُعد عبر الفيديو كونفرنس. يشمل ذلك تحليل السوق، تقييم الفرص الاستثمارية، وإرشادات الشراء والبيع.',
  },
  {
    question: 'هل يوجد تقييم عقار؟',
    answer: 'نعم، نوفر تقييم دقيق واحترافي لجميع أنواع العقارات باستخدام أحدث الأدوات والتقنيات المتطورة، مع تقرير مفصل يشمل القيمة السوقية والتوصيات.',
  },
  {
    question: 'ما هي مدة التسويق العقاري؟',
    answer: 'تختلف المدة حسب نوع العقار وحالة السوق، لكننا نلتزم بتسويق عقارك بأفضل طريقة وإتمام الصفقة في أسرع وقت ممكن مع ضمان أعلى قيمة.',
  },
  {
    question: 'ما الخدمات العقارية التي تقدمونها؟',
    answer: 'نقدم خدمات متكاملة تشمل: الاستشارات العقارية، تقييم العقارات، التسويق العقاري، الوساطة العقارية، وإدارة العقارات.',
  },
  {
    question: 'كيف يمكنني التواصل معكم؟',
    answer: 'يمكنكم التواصل معنا عبر الهاتف أو البريد الإلكتروني أو زيارة مكتبنا مباشرة. نحن متاحون لتلبية جميع احتياجاتكم العقارية.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef({});

  useEffect(() => {
    Object.keys(contentRefs.current).forEach(key => {
      const index = parseInt(key);
      if (contentRefs.current[index]) {
        contentRefs.current[index].style.maxHeight = index === openIndex 
          ? contentRefs.current[index].scrollHeight + 'px' 
          : '0px';
      }
    });
  }, [openIndex]);

  const handleToggle = (index) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-[#e0f7fa]/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-20 left-10 w-72 h-72 text-[#0e8fa3]/5 animate-pulse" viewBox="0 0 200 200" fill="currentColor">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-spin" style={{ animationDuration: '20s' }} />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        </svg>
        <svg className="absolute bottom-20 right-10 w-96 h-96 text-amber-400/5" viewBox="0 0 200 200" fill="currentColor">
          <polygon points="100,10 40,198 190,78" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0e8fa3] to-[#0d7a8a] text-white text-sm font-semibold rounded-full mb-6 shadow-lg shadow-[#0e8fa3]/25">
            <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4s-1.79 4-4 4c-1.742 0-3.223-.835-3.772-2M12 19c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
            </svg>
            الأسئلة الشائعة
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            كل ما تريد معرفته
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            إجابات على أهم الأسئلة شيّكة حول خدماتنا العقارية
          </p>
        </div>

        <div className="space-y-5">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div
                key={index}
                className={`relative rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isOpen 
                    ? 'bg-white/90 backdrop-blur-xl shadow-2xl shadow-[#0e8fa3]/10 ring-1 ring-[#0e8fa3]/20 scale-[1.02]' 
                    : 'bg-white/60 backdrop-blur-sm hover:bg-white/80 border border-gray-100/50'
                }`}
              >
                <button
                  className="w-full p-6 text-right flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0e8fa3]/30 rounded-2xl group"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${index}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                      isOpen 
                        ? 'bg-gradient-to-br from-[#0e8fa3] to-[#0d7a8a] text-white shadow-lg shadow-[#0e8fa3]/30' 
                        : 'bg-gray-100 text-gray-400 group-hover:bg-[#0e8fa3]/10 group-hover:text-[#0e8fa3]'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <span className={`font-bold text-lg transition-colors duration-300 ${
                      isOpen ? 'text-[#0e8fa3]' : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                      {item.question}
                    </span>
                  </div>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isOpen 
                      ? 'bg-[#0e8fa3] text-white rotate-90' 
                      : 'bg-gray-100 text-gray-400 group-hover:bg-[#0e8fa3]/10 group-hover:text-[#0e8fa3]'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
                
                <div
                  ref={el => contentRefs.current[index] = el}
                  className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ maxHeight: 0 }}
                >
                  <div className="px-6 pb-6">
                    <div className="h-px bg-gradient-to-r from-[#0e8fa3]/20 via-[#0e8fa3]/10 to-transparent mb-4" />
                    <div className="flex gap-4">
                      <div className="w-10 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-[#0e8fa3] mx-1 mt-3" />
                      </div>
                      <p className="text-gray-600 leading-8 text-base flex-1">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 p-8 bg-gradient-to-br from-white to-[#0e8fa3]/5 rounded-3xl shadow-xl border border-gray-100/50 backdrop-blur-sm">
            <span className="text-gray-600 font-medium">لديك سؤال آخر؟</span>
            <a 
              href="#booking" 
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#0e8fa3] to-[#0d7a8a] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#0e8fa3]/30 hover:scale-105 transition-all duration-300"
            >
              <span>تواصل معنا الآن</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
