import { useState } from 'react';

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <section className="py-20 px-6 text-center">
      <h2 className="text-3xl font-bold text-[#0e8fa3] mb-6">احجز موعد</h2>
      <p className="text-gray-600 mb-8">احجز استشارتك العقارية الآن</p>

      <form className="max-w-md mx-auto">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-right"
          dir="ltr"
        />
        <button
          type="submit"
          className="bg-[#0e8fa3] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity w-full"
        >
          تأكيد الحجز
        </button>
      </form>
    </section>
  );
}