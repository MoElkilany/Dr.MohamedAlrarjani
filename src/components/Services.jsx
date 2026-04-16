const services = [
  {
    title: 'استشارة عقارية',
    description: 'استشارة حضورية أو أونلاين مع أفضل الخبراء',
    icon: '🏠',
  },
  {
    title: 'تقييم عقار',
    description: 'تقييم دقيق ومهني لعقارك بأحدث الطرق',
    icon: '📊',
  },
  {
    title: 'تسويق عقار',
    description: 'بيع سريع واحترافي مع أفضل العروض',
    icon: '💼',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center text-[#0e8fa3] mb-12">خدماتنا</h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center border border-gray-100"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="font-bold text-xl text-gray-800 mb-3">{service.title}</h3>
            <p className="text-gray-600 mb-6">{service.description}</p>
            <button className="bg-[#0e8fa3] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
              اطلب الآن
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}