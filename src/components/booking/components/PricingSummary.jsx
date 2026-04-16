import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { MONTHS, TIME_SLOTS } from '../data/services';

export default function PricingSummary() {
  const { state, calculatePrice } = useBooking();
  const { date, time, selectedService, serviceData, userInfo } = state;

  const price = calculatePrice();

  const formatDate = () => {
    if (!date) return 'لم يتم الاختيار';
    return `${date.day} ${MONTHS[date.month]} ${date.year}`;
  };

  const formatTime = () => {
    if (!time) return 'لم يتم الاختيار';
    const slot = TIME_SLOTS.find(s => s.id === time);
    return slot?.label || 'لم يتم الاختيار';
  };

  const getConsultationPrice = () => {
    if (!selectedService?.hasSubOptions || !serviceData.consultationType) return null;
    const option = selectedService.subOptions.find(opt => opt.id === serviceData.consultationType);
    return option;
  };

  const consultationOption = getConsultationPrice();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#0e8fa3]/10"
    >
      <h3 className="text-lg font-semibold text-[#134E4A] mb-6">ملخص الحجز</h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-[#0e8fa3]/10">
          <span className="text-[#134E4A]/70">التاريخ</span>
          <span className="font-medium text-[#134E4A]">{formatDate()}</span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-[#0e8fa3]/10">
          <span className="text-[#134E4A]/70">الوقت</span>
          <span className="font-medium text-[#134E4A]">{formatTime()}</span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-[#0e8fa3]/10">
          <span className="text-[#134E4A]/70">الخدمة</span>
          <div className="flex items-center gap-2">
            <span className="text-lg">{selectedService?.icon}</span>
            <span className="font-medium text-[#134E4A]">{selectedService?.name}</span>
          </div>
        </div>

        {selectedService?.hasSubOptions && consultationOption && (
          <div className="flex justify-between items-center py-3 border-b border-[#0e8fa3]/10">
            <span className="text-[#134E4A]/70">نوع الاستشارة</span>
            <span className="font-medium text-[#134E4A]">{consultationOption.name}</span>
          </div>
        )}

        <div className="flex justify-between items-center py-3 border-b border-[#0e8fa3]/10">
          <span className="text-[#134E4A]/70">الاسم</span>
          <span className="font-medium text-[#134E4A]">{userInfo.fullName || '-'}</span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-[#0e8fa3]/10">
          <span className="text-[#134E4A]/70">رقم الهاتف</span>
          <span className="font-medium text-[#134E4A]">{userInfo.phone || '-'}</span>
        </div>

        {userInfo.email && (
          <div className="flex justify-between items-center py-3 border-b border-[#0e8fa3]/10">
            <span className="text-[#134E4A]/70">البريد الإلكتروني</span>
            <span className="font-medium text-[#134E4A]">{userInfo.email}</span>
          </div>
        )}

        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="mt-6 p-4 bg-[#0e8fa3]/10 rounded-xl"
        >
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-[#134E4A]">المجموع</span>
            <span className="text-2xl font-bold text-[#0e8fa3]">
              {price > 0 ? `${price} ريال` : 'مجاني'}
            </span>
          </div>
          {consultationOption && (
            <p className="text-sm text-[#134E4A]/60 mt-1 text-left">
              {consultationOption.duration}
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}