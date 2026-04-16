import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { SERVICE_LIST } from '../data/services';

export default function ServiceSelector() {
  const { state, setService } = useBooking();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#0e8fa3]/10"
    >
      <h3 className="text-lg font-semibold text-[#134E4A] mb-4">اختر الخدمة</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SERVICE_LIST.map((service, index) => (
          <motion.button
            key={service.id}
            onClick={() => setService(service.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 rounded-xl text-right transition-all duration-200 cursor-pointer flex items-center gap-3 ${
              state.selectedService?.id === service.id
                ? 'bg-[#0e8fa3] text-white shadow-lg'
                : 'bg-[#F0FDFA] text-[#134E4A] hover:bg-[#0e8fa3]/10 border border-[#0e8fa3]/10'
            }`}
          >
            <span className="text-2xl">{service.icon}</span>
            <span className="font-medium">{service.name}</span>
          </motion.button>
        ))}
      </div>

      {state.selectedService && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-[#0e8fa3]/10 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{state.selectedService.icon}</span>
            <div>
              <p className="font-medium text-[#134E4A]">تم اختيار: {state.selectedService.name}</p>
              <p className="text-sm text-[#134E4A]/60">{state.selectedService.nameEn}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}