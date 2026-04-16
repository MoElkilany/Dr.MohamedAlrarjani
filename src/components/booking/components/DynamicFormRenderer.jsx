import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { FIELD_TYPES } from '../data/services';
import FileUploader from './FileUploader';

function MapPlaceholder() {
  const [location, setLocation] = useState(null);

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log('Location error:', error);
        }
      );
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-[#134E4A]/70 mb-2">
        الموقع على الخريطة <span className="text-[#134E4A]/40">(اختياري)</span>
      </label>
      <div
        onClick={handleClick}
        className="w-full h-40 rounded-xl bg-[#F0FDFA] border border-[#0e8fa3]/20 flex items-center justify-center cursor-pointer hover:bg-[#0e8fa3]/5 transition-colors"
      >
        {location ? (
          <div className="text-center">
            <svg className="w-8 h-8 text-[#0e8fa3] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm text-[#134E4A]">تم تحديد الموقع</p>
            <p className="text-xs text-[#134E4A]/60">
              {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <svg className="w-8 h-8 text-[#0e8fa3] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm text-[#134E4A]">انقر لتحديد الموقع</p>
          </div>
        )}
      </div>
    </div>
  );
}

function NumberInput({ field, value, onChange }) {
  const config = FIELD_TYPES[field];
  
  return (
    <div>
      <label className="block text-sm font-medium text-[#134E4A]/70 mb-2">
        {config.label}
        {config.required && <span className="text-red-500 mr-1">*</span>}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange({ [field]: e.target.value ? Number(e.target.value) : null })}
          placeholder={config.placeholder}
          min={config.min}
          className="w-full px-4 py-3 rounded-xl border border-[#0e8fa3]/20 bg-white text-[#134E4A] focus:outline-none focus:ring-2 focus:ring-[#0e8fa3]/50"
        />
        {config.suffix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#134E4A]/50">
            {config.suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function TextAreaInput({ field, value, onChange }) {
  const config = FIELD_TYPES[field];
  
  return (
    <div>
      <label className="block text-sm font-medium text-[#134E4A]/70 mb-2">
        {config.label}
        {config.required && <span className="text-red-500 mr-1">*</span>}
      </label>
      <textarea
        value={value || ''}
        onChange={(e) => onChange({ [field]: e.target.value })}
        placeholder={config.placeholder}
        rows={config.rows}
        className="w-full px-4 py-3 rounded-xl border border-[#0e8fa3]/20 bg-white text-[#134E4A] focus:outline-none focus:ring-2 focus:ring-[#0e8fa3]/50 resize-none"
      />
    </div>
  );
}

function RadioInput({ field, value, onChange, service }) {
  const config = FIELD_TYPES[field];
  const options = service.subOptions || [];
  
  return (
    <div>
      <label className="block text-sm font-medium text-[#134E4A]/70 mb-3">
        {config.label}
        {config.required && <span className="text-red-500 mr-1">*</span>}
      </label>
      <div className="space-y-3">
        {options.map((option) => (
          <motion.label
            key={option.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
              value === option.id
                ? 'border-[#0e8fa3] bg-[#0e8fa3]/5'
                : 'border-[#0e8fa3]/20 hover:border-[#0e8fa3]/40'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name={field}
                value={option.id}
                checked={value === option.id}
                onChange={() => onChange({ [field]: option.id })}
                className="w-4 h-4 text-[#0e8fa3] accent-[#0e8fa3]"
              />
              <div className="text-right">
                <span className="font-medium text-[#134E4A]">{option.name}</span>
                <span className="text-sm text-[#134E4A]/60 mr-2">({option.duration})</span>
              </div>
            </div>
            <span className="text-lg font-bold text-[#0e8fa3]">{option.price} ريال</span>
          </motion.label>
        ))}
      </div>
    </div>
  );
}

export default function DynamicFormRenderer() {
  const { state, updateServiceData, setError, clearError } = useBooking();
  const { selectedService, serviceData } = state;

  if (!selectedService) return null;

  const handleChange = (data) => {
    updateServiceData(data);
  };

  const renderField = (field) => {
    const fieldConfig = FIELD_TYPES[field];
    
    switch (field) {
      case 'titleDeed':
      case 'propertyMedia':
      case 'singlePropertyImage':
      case 'buildingPlan':
        return (
          <FileUploader
            key={field}
            label={fieldConfig.label}
            accept={fieldConfig.accept}
            maxSize={fieldConfig.maxSize}
            multiple={fieldConfig.multiple || false}
            value={serviceData[field] || []}
            onChange={(files) => handleChange({ [field]: files })}
            required={fieldConfig.required}
          />
        );
      
      case 'location':
        return <MapPlaceholder key={field} />;
      
      case 'expectedPrice':
      case 'sellingPrice':
      case 'estimatedCost':
        return (
          <NumberInput
            key={field}
            field={field}
            value={serviceData[field]}
            onChange={handleChange}
          />
        );
      
      case 'projectDetails':
        return (
          <TextAreaInput
            key={field}
            field={field}
            value={serviceData[field]}
            onChange={handleChange}
          />
        );
      
      case 'consultationType':
        return (
          <RadioInput
            key={field}
            field={field}
            value={serviceData[field]}
            onChange={handleChange}
            service={selectedService}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#0e8fa3]/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{selectedService.icon}</span>
        <div>
          <h3 className="text-lg font-semibold text-[#134E4A]">تفاصيل الخدمة</h3>
          <p className="text-sm text-[#134E4A]/60">{selectedService.name}</p>
        </div>
      </div>

      <div className="space-y-6">
        {selectedService.fields.map((field, index) => (
          <motion.div
            key={field}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {renderField(field)}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}