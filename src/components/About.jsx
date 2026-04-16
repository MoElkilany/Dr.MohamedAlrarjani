export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-[#eef4f4]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#0e8fa3] mb-6">من هو محمد العرجاني؟</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            مستشار عقاري بخبرة واسعة في التسويق والاستثمار العقاري، يقدم حلول احترافية مبنية على تحليل دقيق للسوق العقاري.
          </p>
          <ul className="space-y-4">
            {[
              'خبرة واسعة في السوق العقاري',
              'استشارات مخصصة لكل عميل',
              'شفافية في جميع المعاملات',
              'متابعة مستمرة حتى إتمام الصفقة',
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-700">
                <span className="text-[#0e8fa3] text-xl">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center">
          <span className="text-gray-400 text-lg">صورة الملف الشخصي</span>
        </div>
      </div>
    </section>
  );
}