import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookingProvider, useBooking } from './context/BookingContext';
import Stepper from './components/Stepper';
import DateTimePicker from './components/DateTimePicker';
import ServiceSelector from './components/ServiceSelector';
import DynamicFormRenderer from './components/DynamicFormRenderer';
import UserInfoForm from './components/UserInfoForm';
import PricingSummary from './components/PricingSummary';
import SuccessScreen from './components/SuccessScreen';

function BookingNavigation() {
  const { state, nextStep, prevStep, canProceed, setSubmitted } = useBooking();
  const { currentStep } = state;
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    if (!canProceed()) return;
    
    if (currentStep === 4) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
      nextStep();
    } else if (currentStep === 5) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
      setSubmitted(true);
    } else {
      nextStep();
    }
  };

  const canGoNext = canProceed();

  return (
    <div className="flex justify-between items-center mt-8">
      <button
        onClick={prevStep}
        disabled={currentStep === 1}
        className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
          currentStep === 1
            ? 'text-[#134E4A]/30 cursor-not-allowed'
            : 'text-[#134E4A] hover:bg-[#0e8fa3]/10'
        }`}
      >
        السابق
      </button>

      <button
        onClick={handleNext}
        disabled={!canGoNext || isLoading}
        className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
          canGoNext && !isLoading
            ? 'bg-[#0e8fa3] text-white hover:bg-[#0d655d] shadow-lg'
            : 'bg-[#0e8fa3]/50 text-white/50 cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            جاري الإرسال...
          </span>
        ) : currentStep === 5 ? (
          'تأكيد الحجز'
        ) : (
          'التالي'
        )}
      </button>
    </div>
  );
}

function BookingContent() {
  const { state } = useBooking();
  const { currentStep, isSubmitted } = state;

  if (isSubmitted) {
    return <SuccessScreen />;
  }

  const stepVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Stepper />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={stepVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && <DateTimePicker />}
          {currentStep === 2 && <ServiceSelector />}
          {currentStep === 3 && <DynamicFormRenderer />}
          {currentStep === 4 && <UserInfoForm />}
          {currentStep === 5 && <PricingSummary />}
        </motion.div>
      </AnimatePresence>

      <BookingNavigation />
    </div>
  );
}

export default function MultiStepBooking() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleBooking = () => {
    setIsVisible(!isVisible);
  };

  return (
    <BookingProvider>
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

          <button
            onClick={toggleBooking}
            className="mb-8 px-6 py-3 bg-[#0e8fa3] text-white font-medium rounded-xl hover:bg-[#0d655d] transition-colors cursor-pointer mx-auto block w-fit"
          >
            {isVisible ? 'إغلاق الحجز' : 'ابدأ الحجز'}
          </button>

          {isVisible && <BookingContent />}
        </div>
      </section>
    </BookingProvider>
  );
}