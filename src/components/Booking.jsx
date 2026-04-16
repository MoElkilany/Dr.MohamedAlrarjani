import { useState } from 'react';

const services = [
  'استشارة عقارية',
  'تقييم عقار',
  'تسويق عقار',
  'وساطة عقارية',
  'زيارة عقارية',
];

const timeSlots = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
];

const weekDays = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
const months = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

function CalendarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function Booking() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', notes: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const todayDate = today.getDate();
  const currentMonthNum = today.getMonth();
  const currentYearNum = today.getFullYear();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isDateDisabled = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayObj = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayObj;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F0FDFA] via-white to-[#F0FDFA]"></div>
        <div className="max-w-lg mx-auto relative z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-[#0e8fa3]/20 shadow-xl">
            <div className="w-20 h-20 bg-[#0e8fa3]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#0e8fa3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#134E4A] mb-4">تم الحجز بنجاح!</h3>
            <p className="text-[#134E4A]/70 mb-2">شكراً لتواصلكم معنا</p>
            <p className="text-[#134E4A]/70 text-sm">سنقوم بتأكيد الموعد عبر الهاتف</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 px-6 py-2 border border-[#0e8fa3] text-[#0e8fa3] rounded-xl hover:bg-[#0e8fa3]/5 transition-colors cursor-pointer"
            >
              حجز جديد
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0FDFA] via-white to-[#F0FDFA]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0e8fa3]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0e8fa3]/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#0e8fa3]/10 text-[#0e8fa3] text-sm font-medium rounded-full mb-4">
            احجز موعدك
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#134E4A] mb-4">
            احجز استشارتك الآن
          </h2>
          <p className="text-lg text-[#134E4A]/70 max-w-2xl mx-auto">
            اختر التاريخ والوقت المناسب لك وحجز موعدك في دقائق
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6 order-1 lg:order-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#0e8fa3]/10">
              <div className="flex items-center gap-2 mb-4 text-[#134E4A]">
                <CalendarIcon />
                <span className="font-medium">اختر الخدمة</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedService(service)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                      selectedService === service
                        ? 'bg-[#0e8fa3] text-white shadow-lg'
                        : 'bg-[#F0FDFA] text-[#134E4A] hover:bg-[#0e8fa3]/10 border border-[#0e8fa3]/10'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#0e8fa3]/10">
              <div className="flex items-center gap-2 mb-4 text-[#134E4A]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">اختر الوقت</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                      selectedTime === time
                        ? 'bg-[#0e8fa3] text-white shadow-lg'
                        : 'bg-[#F0FDFA] text-[#134E4A] hover:bg-[#0e8fa3]/10 border border-[#0e8fa3]/10'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#0e8fa3]/10 order-2 lg:order-2">
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="p-2 hover:bg-[#0e8fa3]/10 rounded-xl transition-colors cursor-pointer">
                <ChevronRightIcon />
              </button>
              <h3 className="text-lg font-semibold text-[#134E4A]">
                {months[currentMonth]} {currentYear}
              </h3>
              <button onClick={nextMonth} className="p-2 hover:bg-[#0e8fa3]/10 rounded-xl transition-colors cursor-pointer">
                <ChevronLeftIcon />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {weekDays.map((day, index) => (
                <div key={index} className="text-center text-sm font-medium text-[#134E4A]/60 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {[...Array(firstDay)].map((_, index) => (
                <div key={`empty-${index}`} />
              ))}
              {[...Array(daysInMonth)].map((_, index) => {
                const day = index + 1;
                const isDisabled = isDateDisabled(day);
                const isToday = currentYear === currentYearNum && currentMonth === currentMonthNum && day === todayDate;
                const isSelected = selectedDate === day;

                return (
                  <button
                    key={day}
                    onClick={() => !isDisabled && setSelectedDate(day)}
                    disabled={isDisabled}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isDisabled
                        ? 'text-[#134E4A]/30 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#0e8fa3] text-white shadow-lg'
                        : isToday
                        ? 'bg-[#0e8fa3]/10 text-[#0e8fa3] border border-[#0e8fa3]/30'
                        : 'text-[#134E4A] hover:bg-[#0e8fa3]/10'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-[#0e8fa3]/10 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-[#134E4A] mb-6">معلومات التواصل</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#134E4A]/70 mb-2">الاسم</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#0e8fa3]/20 bg-white text-[#134E4A] focus:outline-none focus:ring-2 focus:ring-[#0e8fa3]/50"
                placeholder="أدخل اسمك"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#134E4A]/70 mb-2">رقم الهاتف</label>
              <div className="relative">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#134E4A]/50">
                  <PhoneIcon />
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[#0e8fa3]/20 bg-white text-[#134E4A] focus:outline-none focus:ring-2 focus:ring-[#0e8fa3]/50"
                  placeholder="05xxxxxxxx"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#134E4A]/70 mb-2">ملاحظات (اختياري)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-[#0e8fa3]/20 bg-white text-[#134E4A] focus:outline-none focus:ring-2 focus:ring-[#0e8fa3]/50 resize-none"
              placeholder="أي ملاحظات إضافية..."
            />
          </div>

          <div className="bg-[#F0FDFA] rounded-xl p-4 mb-6 text-center">
            <p className="text-[#134E4A]/70">
              {selectedDate ? `تاريخ الحجز: ${months[currentMonth]} ${selectedDate}، ${currentYear}` : 'لم يتم اختيار التاريخ'}
              {selectedTime && ` - ${selectedTime}`}
            </p>
          </div>

          <button
            type="submit"
            disabled={!selectedDate || !selectedTime || !selectedService || !formData.name || !formData.phone}
            className="w-full py-4 bg-[#0e8fa3] text-white font-semibold rounded-xl hover:bg-[#0d655d] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            تأكيد الحجز
          </button>
        </form>
      </div>
    </section>
  );
}
