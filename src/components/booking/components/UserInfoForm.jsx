import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default function UserInfoForm() {
  const { state, setUserInfo, setError, clearError } = useBooking();
  const { userInfo } = state;
  const [errors, setErrors] = useState({});

  const validatePhone = (phone) => {
    const saudiPhoneRegex = /^05[0-9]{8}$/;
    return saudiPhoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (field, value) => {
    setUserInfo({ [field]: value });
    
    if (field === 'phone' && value && !validatePhone(value)) {
      setErrors(prev => ({ ...prev, phone: 'رقم الهاتف غير صحيح (يجب أن يبدأ بـ 05)' }));
    } else if (field === 'phone') {
      setErrors(prev => ({ ...prev, phone: null }));
    }
    
    if (field === 'email' && value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'البريد الإلكتروني غير صحيح' }));
    } else if (field === 'email') {
      setErrors(prev => ({ ...prev, email: null }));
    }
  };

  const [location, setLocation] = useState(null);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setUserInfo({
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
          });
        },
        (error) => {
          console.log('Location error:', error);
        }
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#0e8fa3]/10"
    >
      <h3 className="text-lg font-semibold text-[#134E4A] mb-6">معلومات التواصل</h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#134E4A]/70 mb-2">
            الاسم الكامل <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#134E4A]/50">
              <UserIcon />
            </span>
            <input
              type="text"
              value={userInfo.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="أدخل اسمك الكامل"
              className="w-full px-4 py-3 pr-12 rounded-xl border border-[#0e8fa3]/20 bg-white text-[#134E4A] focus:outline-none focus:ring-2 focus:ring-[#0e8fa3]/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#134E4A]/70 mb-2">
            رقم الهاتف <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#134E4A]/50">
              <PhoneIcon />
            </span>
            <input
              type="tel"
              value={userInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="05xxxxxxxx"
              className={`w-full px-4 py-3 pr-12 rounded-xl border bg-white text-[#134E4A] focus:outline-none focus:ring-2 ${
                errors.phone 
                  ? 'border-red-400 focus:ring-red-300' 
                  : 'border-[#0e8fa3]/20 focus:ring-[#0e8fa3]/50'
              }`}
            />
          </div>
          {errors.phone && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.phone}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#134E4A]/70 mb-2">
            البريد الإلكتروني <span className="text-[#134E4A]/40">(اختياري)</span>
          </label>
          <div className="relative">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#134E4A]/50">
              <MailIcon />
            </span>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="example@email.com"
              className={`w-full px-4 py-3 pr-12 rounded-xl border bg-white text-[#134E4A] focus:outline-none focus:ring-2 ${
                errors.email 
                  ? 'border-red-400 focus:ring-red-300' 
                  : 'border-[#0e8fa3]/20 focus:ring-[#0e8fa3]/50'
              }`}
            />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.email}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#134E4A]/70 mb-2">
            الموقع <span className="text-[#134E4A]/40">(اختياري)</span>
          </label>
          <button
            onClick={handleLocationClick}
            className="w-full p-4 rounded-xl border border-[#0e8fa3]/20 bg-[#F0FDFA] hover:bg-[#0e8fa3]/5 transition-colors flex items-center gap-3 cursor-pointer"
          >
            <span className="text-[#134E4A]/50">
              <MapIcon />
            </span>
            {location ? (
              <div className="text-right flex-1">
                <p className="text-sm font-medium text-[#134E4A]">تم تحديد الموقع</p>
                <p className="text-xs text-[#134E4A]/60">
                  {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              </div>
            ) : (
              <span className="text-sm text-[#134E4A]/60">انقر لتحديد موقعك</span>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}