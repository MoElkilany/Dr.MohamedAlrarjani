import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

function CheckIcon() {
  return (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

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

export default function SuccessScreen() {
  const { state, reset } = useBooking();
  const { date, time, selectedService, userInfo } = state;

  const formatDate = () => {
    if (!date) return '';
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    return `${date.day} ${months[date.month]} ${date.year}`;
  };

  const formatTime = () => {
    if (!time) return '';
    const timeSlots = {
      '09:00': '09:00 - 10:00',
      '10:00': '10:00 - 11:00',
      '11:00': '11:00 - 12:00',
      '14:00': '14:00 - 15:00',
      '15:00': '15:00 - 16:00',
      '16:00': '16:00 - 17:00',
    };
    return timeSlots[time] || time;
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0FDFA] via-white to-[#F0FDFA]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0e8fa3]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0e8fa3]/5 rounded-full blur-3xl"></div>

      <div className="max-w-lg mx-auto relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-[#0e8fa3]/20 shadow-xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
            className="w-24 h-24 bg-[#0e8fa3]/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckIcon />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-[#134E4A] mb-4 text-center"
          >
            تم الحجز بنجاح!
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[#134E4A]/70 text-center mb-6"
          >
            شكراً لتواصلكم معنا. سنقوم بتأكيد الموعد عبر الهاتف
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#F0FDFA] rounded-2xl p-6 mb-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0e8fa3]/10 rounded-xl flex items-center justify-center">
                <CalendarIcon />
              </div>
              <div>
                <p className="text-sm text-[#134E4A]/60">تاريخ الموعد</p>
                <p className="font-medium text-[#134E4A]">{formatDate()} - {formatTime()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0e8fa3]/10 rounded-xl flex items-center justify-center">
                <span className="text-xl">{selectedService?.icon}</span>
              </div>
              <div>
                <p className="text-sm text-[#134E4A]/60">الخدمة</p>
                <p className="font-medium text-[#134E4A]">{selectedService?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0e8fa3]/10 rounded-xl flex items-center justify-center">
                <PhoneIcon />
              </div>
              <div>
                <p className="text-sm text-[#134E4A]/60"> للتواصل</p>
                <p className="font-medium text-[#134E4A]">{userInfo.phone}</p>
              </div>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={reset}
            className="w-full py-4 bg-[#0e8fa3] text-white font-semibold rounded-xl hover:bg-[#0d655d] transition-colors duration-200 cursor-pointer"
          >
            حجز جديد
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}