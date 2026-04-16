export default function Hero() {
  return (
    <section className="bg-[#eef4f4] py-16 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        مستشارك العقاري
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        دليلك الأمثل للاستثمار العقاري. نوفر لك أفضل الاستشارات والعقارات.
      </p>
      <button className="bg-[#0e8fa3] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
        احجز استشارة مجانية
      </button>

      <div className="mt-16 flex justify-center gap-12 flex-wrap">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#0e8fa3]">+10</div>
          <div className="text-gray-500">سنة خبرة</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#0e8fa3]">+500</div>
          <div className="text-gray-500">عميل سعيد</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#0e8fa3]">+200</div>
          <div className="text-gray-500">صفقة ناجحة</div>
        </div>
      </div>
    </section>
  );
}