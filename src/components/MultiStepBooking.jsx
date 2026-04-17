import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAvailability } from '../hooks/useAvailability';
import { bookingService, serviceService } from '../services/endpoints';

const WEEK_DAYS = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
const MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const STORAGE_KEY = 'booking_form_progress';

const STEPS = [
  { id: 1, title: 'التاريخ والوقت', icon: '📅' },
  { id: 2, title: 'نوع الخدمة', icon: '💼' },
  { id: 3, title: 'معلوماتك', icon: '👤' },
  { id: 4, title: 'الموقع', icon: '📍' },
  { id: 5, title: 'المراجعة', icon: '✅' },
  { id: 6, title: 'التأكيد', icon: '🎉' },
];

// =============================================================================
// Icons
// =============================================================================

function CalendarIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function ChevronLeftIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function MapPinIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function PhoneIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MailIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function UserIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function LocationIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function LoaderIcon({ className }) {
  return (
    <svg className={`${className} animate-spin`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

// =============================================================================
// Helper Functions
// =============================================================================

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function formatPrice(price) {
  return `${price} ريال`;
}

function validateEmail(email) {
  if (!email) return true; // Optional field
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^05\d{8}$/.test(cleaned) || /^5\d{8}$/.test(cleaned) || /^\+9665\d{8}$/.test(cleaned) || /^9665\d{8}$/.test(cleaned);
}

// =============================================================================
// Components
// =============================================================================

// Step 1: Date & Time Selection
function DateTimeStep({ formData, setFormData, errors, availableTimes, loadingTimes }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

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

  const selectDate = (day) => {
    if (!isDateDisabled(day)) {
      setFormData(prev => ({
        ...prev,
        date: { day, month: currentMonth, year: currentYear }
      }));
    }
  };

  const isDateSelected = (day) => {
    return formData.date?.day === day && 
           formData.date?.month === currentMonth && 
           formData.date?.year === currentYear;
  };

  const isToday = (day) => {
    return currentYear === today.getFullYear() && 
           currentMonth === today.getMonth() && 
           day === today.getDate();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar */}
      <div className="bg-white rounded-2xl p-5 border border-[#0e8fa3]/10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={prevMonth} 
            className="p-2 hover:bg-[#0e8fa3]/10 rounded-xl transition-colors cursor-pointer"
          >
            <ChevronRightIcon className="w-5 h-5 text-[#134E4A]" />
          </button>
          <h3 className="text-lg font-semibold text-[#134E4A]">
            {MONTHS[currentMonth]} {currentYear}
          </h3>
          <button 
            onClick={nextMonth} 
            className="p-2 hover:bg-[#0e8fa3]/10 rounded-xl transition-colors cursor-pointer"
          >
            <ChevronLeftIcon className="w-5 h-5 text-[#134E4A]" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEK_DAYS.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-[#134E4A]/50 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {[...Array(firstDay)].map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {[...Array(daysInMonth)].map((_, index) => {
            const day = index + 1;
            const disabled = isDateDisabled(day);
            const selected = isDateSelected(day);
            const todayMark = isToday(day);

            return (
              <button
                key={day}
                onClick={() => selectDate(day)}
                disabled={disabled}
                className={`
                  p-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                  ${disabled 
                    ? 'text-[#134E4A]/30 cursor-not-allowed bg-transparent' 
                    : selected 
                      ? 'bg-[#0e8fa3] text-white shadow-md' 
                      : todayMark 
                        ? 'bg-[#0e8fa3]/10 text-[#0e8fa3] border border-[#0e8fa3]/30'
                        : 'text-[#134E4A] hover:bg-[#0e8fa3]/10 bg-white'
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      <div className="bg-white rounded-2xl p-5 border border-[#0e8fa3]/10 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <CalendarIcon className="w-5 h-5 text-[#0e8fa3]" />
          <span className="font-medium text-[#134E4A]">اختر الوقت</span>
        </div>
        {loadingTimes && formData.date && (
          <p className="text-center text-[#0e8fa3] text-sm py-2">جاري تحميل الأوقات المتاحة...</p>
        )}
        {formData.date && availableTimes.length === 0 && !loadingTimes ? (
          <p className="text-center text-[#134E4A]/60 text-sm py-4">لا توجد أوقات متاحة لهذا التاريخ</p>
        ) : !formData.date ? (
          <p className="text-center text-[#134E4A]/60 text-sm py-4">اختر التاريخ أولاً لعرض الأوقات المتاحة</p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setFormData(prev => ({ ...prev, time }))}
                className={`
                  p-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                  ${formData.time === time
                    ? 'bg-[#0e8fa3] text-white shadow-md'
                    : 'bg-[#F0FDFA] text-[#134E4A] hover:bg-[#0e8fa3]/10 border border-[#0e8fa3]/10'
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        )}
      </div>

      {errors.dateTime && (
        <p className="text-red-500 text-sm text-center lg:col-span-2">{errors.dateTime}</p>
      )}
    </div>
  );
}

// Step 2: Service Type Selection
function ServiceStep({ formData, setFormData, services }) {
  if (services.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 border-4 border-[#0e8fa3]/20 border-t-[#0e8fa3] rounded-full animate-spin mx-auto"></div>
        <p className="text-[#134E4A]/60 mt-4">جاري تحميل الخدمات...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-[#134E4A]/70 text-center mb-4">اختر نوع الاستشارة المناسب لك</p>

      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => setFormData(prev => ({ ...prev, serviceType: service }))}
          className={`
            w-full p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-right
            ${formData.serviceType?.id === service.id
              ? 'border-[#0e8fa3] bg-[#0e8fa3]/5 shadow-md'
              : 'border-[#0e8fa3]/10 bg-white hover:border-[#0e8fa3]/30'
            }
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-3xl">{service.icon || '📋'}</span>
              <div>
                <h4 className="font-semibold text-[#134E4A] text-lg">{service.name_ar}</h4>
                <p className="text-sm text-[#134E4A]/60">{service.duration || '-'}</p>
              </div>
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold text-[#0e8fa3]">{formatPrice(service.price)}</span>
            </div>
          </div>
        </button>
      ))}

      {formData.serviceType && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#F0FDFA] rounded-xl p-4 text-center"
        >
          <p className="text-[#134E4A]">
            ✓ تم اختيار: <span className="font-semibold">{formData.serviceType.label}</span>
            {' '}- <span className="font-bold">{formatPrice(formData.serviceType.price)}</span>
          </p>
        </motion.div>
      )}
    </div>
  );
}

// Step 3: User Information
function UserInfoStep({ formData, setFormData, errors }) {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-[#134E4A] mb-2">الاسم الكامل *</label>
        <div className="relative">
          <UserIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#134E4A]/40" />
          <input
            type="text"
            value={formData.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className={`
              w-full px-4 py-3 pr-12 rounded-xl border bg-white text-[#134E4A] focus:outline-none focus:ring-2 transition-colors
              ${errors.fullName ? 'border-red-500 focus:ring-red-500/50' : 'border-[#0e8fa3]/20 focus:border-[#0e8fa3]/50 focus:ring-[#0e8fa3]/20'}
            `}
            placeholder="أدخل اسمك الكامل"
          />
        </div>
        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-[#134E4A] mb-2">رقم الهاتف *</label>
        <div className="relative">
          <PhoneIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#134E4A]/40" />
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`
              w-full px-4 py-3 pr-12 rounded-xl border bg-white text-[#134E4A] focus:outline-none focus:ring-2 transition-colors
              ${errors.phone ? 'border-red-500 focus:ring-red-500/50' : 'border-[#0e8fa3]/20 focus:border-[#0e8fa3]/50 focus:ring-[#0e8fa3]/20'}
            `}
            placeholder="05xxxxxxxx"
            dir="ltr"
          />
        </div>
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* Email (Optional) */}
      <div>
        <label className="block text-sm font-medium text-[#134E4A] mb-2">البريد الإلكتروني (اختياري)</label>
        <div className="relative">
          <MailIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#134E4A]/40" />
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`
              w-full px-4 py-3 pr-12 rounded-xl border bg-white text-[#134E4A] focus:outline-none focus:ring-2 transition-colors
              ${errors.email ? 'border-red-500 focus:ring-red-500/50' : 'border-[#0e8fa3]/20 focus:border-[#0e8fa3]/50 focus:ring-[#0e8fa3]/20'}
            `}
            placeholder="example@email.com"
            dir="ltr"
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Location (Optional) */}
      <div>
        <label className="block text-sm font-medium text-[#134E4A] mb-2">الموقع (اختياري)</label>
        <div className="relative">
          <LocationIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#134E4A]/40" />
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-4 py-3 pr-12 rounded-xl border border-[#0e8fa3]/20 bg-white text-[#134E4A] focus:outline-none focus:ring-2 focus:border-[#0e8fa3]/50 focus:ring-[#0e8fa3]/20"
            placeholder="أدخل موقعك أو استخدم الخريطة"
          />
        </div>
      </div>
    </div>
  );
}

// Step 4: Location Picker
function LocationStep({ formData, setFormData }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  const openGoogleMaps = () => {
    // In production, this would open Google Maps picker
    // For demo, we'll simulate location selection
    const mockLocation = {
      lat: 24.7136 + (Math.random() - 0.5) * 0.1,
      lng: 46.6753 + (Math.random() - 0.5) * 0.1,
      address: 'الرياض، المملكة العربية السعودية'
    };
    setFormData(prev => ({
      ...prev,
      locationCoords: mockLocation,
      location: mockLocation.address
    }));
  };

  return (
    <div className="space-y-5">
      <p className="text-[#134E4A]/70 text-center">
        يمكنك اختيار موقعك على الخريطة لتسهيل الوصول
      </p>

      {!formData.locationCoords ? (
        <button
          onClick={openGoogleMaps}
          className="w-full p-8 rounded-2xl border-2 border-dashed border-[#0e8fa3]/30 hover:border-[#0e8fa3] transition-colors cursor-pointer bg-[#F0FDFA]/50"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-[#0e8fa3]/10 rounded-full flex items-center justify-center">
              <MapPinIcon className="w-8 h-8 text-[#0e8fa3]" />
            </div>
            <span className="font-medium text-[#134E4A]">اختر الموقع من الخريطة</span>
            <span className="text-sm text-[#134E4A]/60">اضغط لفتح خريطة Google</span>
          </div>
        </button>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-5 border border-[#0e8fa3]/20 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0e8fa3]/10 rounded-full flex items-center justify-center">
                <CheckIcon className="w-5 h-5 text-[#0e8fa3]" />
              </div>
              <div>
                <p className="font-medium text-[#134E4A]">تم اختيار الموقع</p>
                <p className="text-sm text-[#134E4A]/60">{formData.location}</p>
              </div>
            </div>
            <button
              onClick={() => setFormData(prev => ({ ...prev, locationCoords: null, location: '' }))}
              className="text-red-500 text-sm hover:underline cursor-pointer"
            >
              إزالة
            </button>
          </div>
          <div className="bg-[#F0FDFA] rounded-xl p-3 text-sm text-[#134E4A]/70">
            <p>خط العرض: {formData.locationCoords.lat.toFixed(4)}</p>
            <p>خط الطول: {formData.locationCoords.lng.toFixed(4)}</p>
          </div>
        </motion.div>
      )}

      <p className="text-sm text-[#134E4A]/50 text-center">
        💡 هذه الخطوة اختيارية - يمكنك المتابعة بدون تحديد الموقع
      </p>
    </div>
  );
}

// Step 5: Summary & Pricing
function SummaryStep({ formData }) {
  const selectedService = formData.serviceType;
  const dateStr = formData.date 
    ? `${formData.date.day} ${MONTHS[formData.date.month]} ${formData.date.year}`
    : '-';

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl p-5 border border-[#0e8fa3]/10 shadow-sm space-y-4">
        {/* Service */}
        <div className="flex items-center justify-between pb-4 border-b border-[#0e8fa3]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0e8fa3]/10 rounded-full flex items-center justify-center">
              <span className="text-xl">{selectedService?.icon}</span>
            </div>
            <div>
              <p className="text-sm text-[#134E4A]/60">الخدمة</p>
              <p className="font-medium text-[#134E4A]">{selectedService?.label}</p>
            </div>
          </div>
          <span className="text-lg font-bold text-[#0e8fa3]">{formatPrice(selectedService?.price || 0)}</span>
        </div>

        {/* Date & Time */}
        <div className="flex items-center justify-between py-4 border-b border-[#0e8fa3]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0e8fa3]/10 rounded-full flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-[#0e8fa3]" />
            </div>
            <div>
              <p className="text-sm text-[#134E4A]/60">التاريخ والوقت</p>
              <p className="font-medium text-[#134E4A]">{dateStr}</p>
              <p className="text-sm text-[#134E4A]/70">{formData.time}</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center justify-between py-4 border-b border-[#0e8fa3]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0e8fa3]/10 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-[#0e8fa3]" />
            </div>
            <div>
              <p className="text-sm text-[#134E4A]/60">معلومات الحجز</p>
              <p className="font-medium text-[#134E4A]">{formData.fullName}</p>
              <p className="text-sm text-[#134E4A]/70">{formData.phone}</p>
              {formData.email && <p className="text-sm text-[#134E4A]/70">{formData.email}</p>}
            </div>
          </div>
        </div>

        {/* Location (if provided) */}
        {formData.locationCoords && (
          <div className="flex items-center justify-between py-4 border-b border-[#0e8fa3]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0e8fa3]/10 rounded-full flex items-center justify-center">
                <LocationIcon className="w-5 h-5 text-[#0e8fa3]" />
              </div>
              <div>
                <p className="text-sm text-[#134E4A]/60">الموقع</p>
                <p className="font-medium text-[#134E4A]">{formData.location}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Total Price */}
      <div className="bg-gradient-to-r from-[#0e8fa3] to-[#134E4A] rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <span className="text-lg">السعر الإجمالي</span>
          <span className="text-3xl font-bold">{formatPrice(selectedService?.price || 0)}</span>
        </div>
      </div>
    </div>
  );
}

// Step 6: Confirmation
function ConfirmationStep({ isSubmitting, isSuccess, onSubmit }) {
  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckIcon className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#134E4A] mb-3">تم الحجز بنجاح!</h3>
        <p className="text-[#134E4A]/70 mb-2">شكراً لتواصلكم معنا</p>
        <p className="text-[#134E4A]/60 text-sm">سنقوم بتأكيد الموعد عبر الهاتف</p>
      </motion.div>
    );
  }

  return (
    <div className="text-center space-y-5">
      <div className="w-20 h-20 bg-[#0e8fa3]/10 rounded-full flex items-center justify-center mx-auto">
        <CalendarIcon className="w-10 h-10 text-[#0e8fa3]" />
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-[#134E4A] mb-2">تأكيد الحجز</h3>
        <p className="text-[#134E4A]/70">أكد حجزك لاستكمال العملية</p>
      </div>

      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className={`
          w-full py-4 px-8 bg-gradient-to-r from-[#0e8fa3] to-[#134E4A] text-white font-semibold rounded-xl 
          hover:from-[#0d655d] hover:to-[#0f4a47] transition-all duration-200 cursor-pointer
          disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2
        `}
      >
        {isSubmitting ? (
          <>
            <LoaderIcon className="w-5 h-5" />
            جاري الت-processing...
          </>
        ) : (
          'تأكيد الحجز'
        )}
      </button>

      <p className="text-xs text-[#134E4A]/50">
        بالضغط على تأكيد، أنت توافق على سياسة الخصوصية
      </p>
    </div>
  );
}

// =============================================================================
// Main Component
// =============================================================================

export default function MultiStepBooking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [services, setServices] = useState([]);
  const [submitError, setSubmitError] = useState('');

  const { availability, loading: loadingAvailability, getAvailableTimesForDate } = useAvailability();

  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved form data:', e);
    }
    return {
      date: null,
      time: '',
      serviceType: null,
      fullName: '',
      phone: '',
      email: '',
      location: '',
      locationCoords: null,
    };
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceService.getAll();
        const servicesData = response.data.data || response.data;
        setServices(Array.isArray(servicesData) ? servicesData : []);
      } catch (err) {
        console.error('Failed to fetch services:', err);
        setServices([
          { id: 1, name_ar: 'حضوري', name: 'In-Person', price: 575, duration: '30 دقيقة', icon: '🏢', type: 'in-person' },
          { id: 2, name_ar: 'عن بعد', name: 'Online', price: 375, duration: '30 دقيقة', icon: '💻', type: 'online' },
          { id: 3, name_ar: 'مكالمة', name: 'Phone', price: 279, duration: '-', icon: '📞', type: 'phone' },
        ]);
      }
    };
    fetchServices();
  }, []);

  const selectedDateString = formData.date
    ? `${formData.date.year}-${String(formData.date.month + 1).padStart(2, '0')}-${String(formData.date.day).padStart(2, '0')}`
    : '';

  const availableTimes = selectedDateString ? getAvailableTimesForDate(selectedDateString) : [];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      console.error('Failed to save form data:', e);
    }
  }, [formData]);

  const validateStep = useCallback((step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.date) newErrors.dateTime = 'الرجاء اختيار التاريخ';
        if (!formData.time) newErrors.dateTime = 'الرجاء اختيار الوقت';
        break;
      case 2:
        if (!formData.serviceType) newErrors.service = 'الرجاء اختيار نوع الخدمة';
        break;
      case 3:
        if (!formData.fullName?.trim()) {
          newErrors.fullName = 'الرجاء إدخال الاسم';
        }
        if (!formData.phone?.trim()) {
          newErrors.phone = 'الرجاء إدخال رقم الهاتف';
        } else if (!validatePhone(formData.phone)) {
          newErrors.phone = 'رقم الهاتف غير صحيح (مثال: 05xxxxxxxx)';
        }
        if (formData.email && !validateEmail(formData.email)) {
          newErrors.email = 'البريد الإلكتروني غير صحيح';
        }
        break;
      case 4:
        // Optional step - no validation needed
        break;
      case 5:
        // Summary step - no validation needed
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const dateString = `${formData.date.year}-${String(formData.date.month + 1).padStart(2, '0')}-${String(formData.date.day).padStart(2, '0')}`;
      const bookingData = {
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email || null,
        service_id: formData.serviceType?.id,
        date: dateString,
        time: formData.time,
        location_text: formData.location || null,
        location_lat: formData.locationCoords?.lat || null,
        location_lng: formData.locationCoords?.lng || null,
      };

      await bookingService.create(bookingData);
      setIsSuccess(true);
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      const message = err.response?.data?.message || 'حدث خطأ في إرسال الحجز. يرجى المحاولة مرة أخرى.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.date && formData.time;
      case 2:
        return formData.serviceType;
      case 3:
        return formData.fullName?.trim() && formData.phone?.trim();
      case 4:
        return true;
      case 5:
        return true;
      case 6:
        return !isSubmitting && !isSuccess;
      default:
        return false;
    }
  };

  const renderStep = () => {
    const stepProps = { formData, setFormData, errors };

    switch (currentStep) {
      case 1:
        return <DateTimeStep {...stepProps} availableTimes={availableTimes} loadingTimes={loadingAvailability} />;
      case 2:
        return <ServiceStep {...stepProps} services={services} />;
      case 3:
        return <UserInfoStep {...stepProps} />;
      case 4:
        return <LocationStep {...stepProps} />;
      case 5:
        return <SummaryStep {...stepProps} />;
      case 6:
        return (
          <>
            <ConfirmationStep 
              isSubmitting={isSubmitting}
              isSuccess={isSuccess}
              onSubmit={handleSubmit}
            />
            {submitError && (
              <p className="text-red-500 text-sm text-center mt-2">{submitError}</p>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section id="booking" className="py-16 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0FDFA] via-white to-[#F0FDFA]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0e8fa3]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0e8fa3]/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-[#0e8fa3]/10 text-[#0e8fa3] text-sm font-medium rounded-full mb-4">
            احجز موعدك
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#134E4A] mb-3">
            احجز استشارتك الآن
          </h2>
          <p className="text-[#134E4A]/70">
            اختر التاريخ والوقت المناسب لك وحجز موعدك في دقائق
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#0e8fa3]/20 -z-10"></div>
            <motion.div 
              className="absolute top-5 left-0 h-0.5 bg-[#0e8fa3] -z-10"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />

            {STEPS.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;

              return (
                <button
                  key={step.id}
                  onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                  disabled={step.id > currentStep && !isActive}
                  className={`
                    relative flex flex-col items-center cursor-pointer
                    ${step.id > currentStep ? 'pointer-events-none' : ''}
                  `}
                >
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium 
                    transition-all duration-300
                    ${isActive 
                      ? 'bg-[#0e8fa3] text-white shadow-lg scale-110' 
                      : isCompleted 
                        ? 'bg-[#0e8fa3] text-white' 
                        : 'bg-white border-2 border-[#0e8fa3]/30 text-[#134E4A]/50'
                    }
                  `}>
                    {isCompleted ? <CheckIcon className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={`
                    text-xs mt-2 whitespace-nowrap transition-colors
                    ${isActive ? 'text-[#0e8fa3] font-medium' : 'text-[#134E4A]/50'}
                  `}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-[#0e8fa3]/10 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {!isSuccess && currentStep < 6 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#0e8fa3]/10">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors cursor-pointer
                  ${currentStep === 1 
                    ? 'text-[#134E4A]/30 cursor-not-allowed' 
                    : 'text-[#134E4A] hover:bg-[#0e8fa3]/10'
                  }
                `}
              >
                <ChevronRightIcon className="w-5 h-5" />
                السابق
              </button>

              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`
                  flex items-center gap-2 px-6 py-2.5 bg-[#0e8fa3] text-white rounded-xl font-medium 
                  transition-all duration-200 cursor-pointer
                  ${!canProceed() 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-[#0d655d] shadow-md hover:shadow-lg'
                  }
                `}
              >
                التالي
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
            </div>
          )}

          {currentStep === 6 && !isSuccess && (
            <button
              onClick={prevStep}
              className="w-full mt-6 py-3 border border-[#0e8fa3]/20 text-[#134E4A] rounded-xl hover:bg-[#0e8fa3]/5 transition-colors cursor-pointer"
            >
              العودة للمراجعة
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
