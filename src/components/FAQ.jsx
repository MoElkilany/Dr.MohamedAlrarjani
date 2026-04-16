import { useState } from 'react';

const faqItems = [
  {
    question: 'هل تقدمون استشارات عقارية؟',
    answer: 'نعم، نقدم جميع أنواع الاستشارات العقارية حضورياً وعن بُعد.',
  },
  {
    question: 'هل يوجد تقييم عقار؟',
    answer: 'نعم، نوفر تقييم دقيق واحترافي لجميع أنواع العقارات.',
  },
  {
    question: 'ما هي مدة التسويق العقاري؟',
    answer: 'تختلف المدة حسب نوع العقار والسوق، لكننا نسعى لإتمام الصفقة في أسرع وقت.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center text-[#0e8fa3] mb-12">الأسئلة الشائعة</h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden border border-gray-200"
          >
            <button
              className="w-full p-5 text-right flex justify-between items-center hover:bg-gray-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-medium text-gray-800">{item.question}</span>
              <span className="text-[#0e8fa3] text-2xl font-bold">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-600">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}