import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { TIME_SLOTS } from '../data/services';

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

const WEEKDAYS = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
const MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

export default function DateTimePicker() {
  const { state, setDate, setTime } = useBooking();
  const today = new Date();
  
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const currentMonthNum = today.getMonth();
  const currentYearNum = today.getFullYear();
  const todayDate = today.getDate();

  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  }, [firstDay, daysInMonth]);

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

  const isDateSelected = (day) => {
    if (!state.date) return false;
    return (
      state.date.year === currentYear &&
      state.date.month === currentMonth &&
      state.date.day === day
    );
  };

  const handleDateSelect = (day) => {
    if (!isDateDisabled(day)) {
      setDate({ year: currentYear, month: currentMonth, day });
    }
  };

  const formatSelectedDate = () => {
    if (!state.date) return null;
    return `${state.date.day} ${MONTHS[state.date.month]} ${state.date.year}`;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#0e8fa3]/10"
      >
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-[#0e8fa3]/10 rounded-xl transition-colors cursor-pointer"
          >
            <ChevronLeftIcon />
          </button>
          <h3 className="text-lg font-semibold text-[#134E4A]">
            {MONTHS[currentMonth]} {currentYear}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-[#0e8fa3]/10 rounded-xl transition-colors cursor-pointer"
          >
            <ChevronRightIcon />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {WEEKDAYS.map((day, index) => (
            <div key={index} className="text-center text-sm font-medium text-[#134E4A]/60 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} />;
            }

            const disabled = isDateDisabled(day);
            const isToday = currentYear === currentYearNum && currentMonth === currentMonthNum && day === todayDate;
            const selected = isDateSelected(day);

            return (
              <motion.button
                key={day}
                onClick={() => handleDateSelect(day)}
                disabled={disabled}
                whileHover={!disabled ? { scale: 1.05 } : {}}
                whileTap={!disabled ? { scale: 0.95 } : {}}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  disabled
                    ? 'text-[#134E4A]/30 cursor-not-allowed'
                    : selected
                    ? 'bg-[#0e8fa3] text-white shadow-lg'
                    : isToday
                    ? 'bg-[#0e8fa3]/10 text-[#0e8fa3] border border-[#0e8fa3]/30'
                    : 'text-[#134E4A] hover:bg-[#0e8fa3]/10'
                }`}
              >
                {day}
              </motion.button>
            );
          })}
        </div>

        {state.date && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-3 bg-[#0e8fa3]/10 rounded-xl text-center"
          >
            <span className="text-sm font-medium text-[#0e8fa3]">
             _selected: {formatSelectedDate()}
            </span>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#0e8fa3]/10"
      >
        <h3 className="text-lg font-semibold text-[#134E4A] mb-4">اختر الوقت</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {TIME_SLOTS.map((slot) => (
            <motion.button
              key={slot.id}
              onClick={() => setTime(slot.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                state.time === slot.id
                  ? 'bg-[#0e8fa3] text-white shadow-lg'
                  : 'bg-[#F0FDFA] text-[#134E4A] hover:bg-[#0e8fa3]/10 border border-[#0e8fa3]/10'
              }`}
            >
              {slot.label}
            </motion.button>
          ))}
        </div>

        {state.time && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-3 bg-[#0e8fa3]/10 rounded-xl text-center"
          >
            <span className="text-sm font-medium text-[#0e8fa3]">
              الوقت المختار: {TIME_SLOTS.find(s => s.id === state.time)?.label}
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}