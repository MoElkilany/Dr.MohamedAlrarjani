import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { STEPS } from '../data/services';

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function Stepper() {
  const { state } = useBooking();
  const { currentStep } = state;

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#0e8fa3]/20 -translate-y-1/2 rounded-full" />
        <motion.div
          className="absolute top-1/2 left-0 h-1 bg-[#0e8fa3] -translate-y-1/2 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />

        {STEPS.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted || isCurrent ? '#0e8fa3' : '#fff',
                  borderColor: isCompleted || isCurrent ? '#0e8fa3' : '#0e8fa3/30',
                }}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  isCompleted || isCurrent ? 'text-white' : 'text-[#134E4A]/60'
                }`}
              >
                {isCompleted ? <CheckIcon /> : step.id}
              </motion.div>
              <motion.span
                initial={false}
                animate={{
                  color: isCurrent ? '#134E4A' : '#134E4A/60',
                  fontWeight: isCurrent ? 600 : 400,
                }}
                className="absolute top-12 text-xs whitespace-nowrap"
              >
                {step.title}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}