const reviews = [
  {
    name: 'أحمد محمد',
    rating: 5,
    text: 'تجربة ممتازة! خدمة احترافية والتواصل ممتاز. أنصح الجميع بالتعامل معكم.',
  },
  {
    name: 'سارة علي',
    rating: 5,
    text: 'شكراً على المساعدة في شراء الشقة. كانت العملية سلسة ومبسطة.',
  },
];

export default function Reviews() {
  return (
    <section className="py-20 px-6 bg-[#eef4f4]">
      <h2 className="text-3xl font-bold text-center text-[#0e8fa3] mb-12">آراء العملاء</h2>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-yellow-400 mb-3">{'⭐'.repeat(review.rating)}</div>
            <p className="text-gray-600 mb-4">{review.text}</p>
            <div className="font-medium text-gray-800">{review.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}