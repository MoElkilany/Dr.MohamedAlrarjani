import { useState } from 'react';

const reviews = [
  {
    name: 'أحمد محمد',
    rating: 5,
    text: 'تجربة ممتازة! خدمة احترافية والتواصل ممتاز. أنصح الجميع بالتعامل معكم.',
    role: 'مستثمر عقاري',
  },
  {
    name: 'سارة علي',
    rating: 5,
    text: 'شكراً على المساعدة في شراء الشقة. كانت العملية سلسة ومبسطة.',
    role: 'مالكة شقة',
  },
  {
    name: 'محمد خالد',
    rating: 5,
    text: 'أفضل مكتب عقاري تعاملت معه. محترفون ويقدمون نصائح قيمة.',
    role: 'رجل أعمال',
  },
  {
    name: 'فاطمة الزهراني',
    rating: 5,
    text: 'خدمة تقييم عقارات متميزة. التقرير شامل ومفصل جداً.',
    role: 'مالكة فيلا',
  },
];

const stats = [
  { number: '+500', label: 'عميل سعيد' },
  { number: '+200', label: 'صفقة ناجحة' },
  { number: '15+', label: 'سنوات خبرة' },
  { number: '4.9', label: 'التقييم' },
];

function StarIcon({ filled = true, onClick, onMouseEnter, onMouseLeave }) {
  return (
    <svg 
      className={`w-7 h-7 transition-all duration-200 cursor-pointer ${filled ? 'text-yellow-400 fill-current drop-shadow-sm' : 'text-gray-300 fill-current hover:text-yellow-300'}`}
      viewBox="0 0 20 20"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg className="w-12 h-12 text-[#0e8fa3]/10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function Reviews() {
  const [allReviews, setAllReviews] = useState(reviews);
  const [showForm, setShowForm] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    text: '',
    role: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newReview = {
        name: formData.name,
        rating: formData.rating,
        text: formData.text,
        role: formData.role || 'عميل',
      };
      
      setAllReviews([newReview, ...allReviews]);
      setIsSubmitting(false);
      setSubmitted(true);
      
      setTimeout(() => {
        setShowForm(false);
        setSubmitted(false);
        setFormData({ name: '', rating: 5, text: '', role: '' });
      }, 2000);
    }, 1000);
  };

  const renderStarSelector = (currentRating, onSelect) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          filled={star <= (hoverRating || currentRating)}
          onClick={() => onSelect(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ))}
    </div>
  );

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0FDFA] via-white to-[#F0FDFA]"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#0e8fa3]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#0e8fa3]/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#0e8fa3]/10 text-[#0e8fa3] text-sm font-medium rounded-full mb-4">
            آراء عملائنا
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            ماذا يقول عملاؤنا
          </h2>
          <p className="text-lg text-gray-800/70 max-w-2xl mx-auto">
            نفخر بثقة عملائنا ونحرص على تقديم أفضل خدمة عقارية
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#0e8fa3] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-800/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {allReviews.map((review, index) => (
            <div
              key={index}
              className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-[#0e8fa3]/10 hover:border-[#0e8fa3]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#0e8fa3]/10"
            >
              <div className="absolute top-4 right-4">
                <QuoteIcon />
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              
              <p className="text-gray-800/80 leading-relaxed mb-6 relative z-10">
                {review.text}
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0e8fa3] to-[#0e8fa3] flex items-center justify-center text-white font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{review.name}</div>
                  <div className="text-sm text-gray-800/60">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-gray-800/70">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0e8fa3] to-[#0e8fa3] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="mr-2">انضم لأكثر من 500 عميل سعيد</span>
          </div>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-8 left-8 z-40 w-16 h-16 bg-gradient-to-br from-[#0e8fa3] to-[#0e8fa3] rounded-full shadow-lg shadow-[#0e8fa3]/30 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 group"
        >
          <PlusIcon />
          <span className="absolute left-full ml-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            أضف تقييمك
          </span>
        </button>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            ></div>
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 animate-in fade-in zoom-in duration-300">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <CloseIcon />
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">شكراً لك!</h3>
                  <p className="text-gray-600">تم إضافة تقييمك بنجاح</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">أضف تقييمك</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0e8fa3] focus:ring-2 focus:ring-[#0e8fa3]/20 outline-none transition-all"
                        placeholder="أدخل اسمك"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">التقييم</label>
                      {renderStarSelector(formData.rating, (rating) => setFormData({ ...formData, rating }))}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الوظيفة (اختياري)</label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0e8fa3] focus:ring-2 focus:ring-[#0e8fa3]/20 outline-none transition-all"
                        placeholder="مثل: مستثمر عقاري"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">التعليق</label>
                      <textarea
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0e8fa3] focus:ring-2 focus:ring-[#0e8fa3]/20 outline-none transition-all resize-none h-28"
                        placeholder="شاركنا تجربتك..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-[#0e8fa3] to-[#0e8fa3] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#0e8fa3]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'جاري الإرسال...' : 'إرسال التقييم'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
