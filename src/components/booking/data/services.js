/**
 * Booking Services Configuration
 * Defines all available services and their dynamic form fields
 */

export const SERVICES = {
  PROPERTY_EVALUATION: {
    id: 'property_evaluation',
    name: 'تقييم عقاري',
    nameEn: 'Property Evaluation',
    icon: '🏠',
    price: 0,
    fields: ['titleDeed', 'location', 'propertyMedia'],
  },
  PROPERTY_MARKETING: {
    id: 'property_marketing',
    name: 'عرض وتسويق العقارات',
    nameEn: 'Property Marketing',
    icon: '📢',
    price: 0,
    fields: ['titleDeed', 'location', 'propertyMedia', 'expectedPrice', 'sellingPrice'],
  },
  PROPERTY_PHOTOGRAPHY: {
    id: 'property_photography',
    name: 'تصوير عقار',
    nameEn: 'Property Photography',
    icon: '📷',
    price: 0,
    fields: ['titleDeed', 'location', 'singlePropertyImage'],
  },
  DEVELOPER_REQUEST: {
    id: 'developer_request',
    name: 'طلب مطور عقاري',
    nameEn: 'Real Estate Developer Request',
    icon: '🏗️',
    price: 0,
    fields: ['projectDetails'],
  },
  CONTRACTOR_REQUEST: {
    id: 'contractor_request',
    name: 'طلب مقاول',
    nameEn: 'Contractor Request',
    icon: '🔨',
    price: 0,
    fields: ['buildingPlan', 'estimatedCost'],
  },
  CONSULTATION: {
    id: 'consultation',
    name: 'استشارة عقارية',
    nameEn: 'Real Estate Consultation',
    icon: '💬',
    price: 0,
    fields: ['consultationType'],
    hasSubOptions: true,
    subOptions: [
      { id: 'in_person', name: 'حضوري', nameEn: 'In-person', price: 575, duration: '30 دقيقة' },
      { id: 'remote', name: 'عن بعد', nameEn: 'Remote', price: 375, duration: '30 دقيقة' },
      { id: 'call', name: 'مكالمة', nameEn: 'Call', price: 279, duration: 'مكالمة' },
    ],
  },
};

export const SERVICE_LIST = Object.values(SERVICES);

export const FIELD_TYPES = {
  titleDeed: {
    type: 'file',
    label: 'صورة الصك',
    labelEn: 'Title Deed Image',
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize: 10 * 1024 * 1024,
    required: true,
  },
  location: {
    type: 'location',
    label: 'الموقع على الخريطة',
    labelEn: 'Location on Map',
    required: false,
  },
  propertyMedia: {
    type: 'file',
    label: 'صور وفيديو العقار',
    labelEn: 'Property Images & Video',
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'], 'video/*': ['.mp4', '.webm'] },
    maxSize: 50 * 1024 * 1024,
    multiple: true,
    required: true,
  },
  singlePropertyImage: {
    type: 'file',
    label: 'صورة العقار',
    labelEn: 'Property Image',
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    required: true,
  },
  expectedPrice: {
    type: 'number',
    label: 'السوم',
    labelEn: 'Expected Price',
    placeholder: 'أدخل سعر السوم',
    min: 0,
    required: true,
    suffix: 'ريال',
  },
  sellingPrice: {
    type: 'number',
    label: 'سعر البيع',
    labelEn: 'Selling Price',
    placeholder: 'أدخل سعر البيع',
    min: 0,
    required: true,
    suffix: 'ريال',
  },
  projectDetails: {
    type: 'textarea',
    label: 'تفاصيل المشروع / معلومات الأرض',
    labelEn: 'Project Details / Land Info',
    placeholder: 'أدخل تفاصيل المشروع أو معلومات الأرض',
    rows: 4,
    required: true,
  },
  buildingPlan: {
    type: 'file',
    label: 'تصميم المخطط',
    labelEn: 'Building Plan',
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'], 'application/pdf': ['.pdf'] },
    maxSize: 20 * 1024 * 1024,
    required: true,
  },
  estimatedCost: {
    type: 'number',
    label: 'التكلفة التقديرية للبناء',
    labelEn: 'Estimated Construction Cost',
    placeholder: 'أدخل التكلفة التقديرية',
    min: 0,
    required: true,
    suffix: 'ريال',
  },
  consultationType: {
    type: 'radio',
    label: 'نوع الاستشارة',
    labelEn: 'Consultation Type',
    required: true,
  },
};

export const TIME_SLOTS = [
  { id: '09:00', label: '09:00 - 10:00', available: true },
  { id: '10:00', label: '10:00 - 11:00', available: true },
  { id: '11:00', label: '11:00 - 12:00', available: true },
  { id: '14:00', label: '14:00 - 15:00', available: true },
  { id: '15:00', label: '15:00 - 16:00', available: true },
  { id: '16:00', label: '16:00 - 17:00', available: true },
];

export const MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

export const STEPS = [
  { id: 1, title: 'التاريخ والوقت', titleEn: 'Date & Time' },
  { id: 2, title: 'اختر الخدمة', titleEn: 'Choose Service' },
  { id: 3, title: 'تفاصيل الخدمة', titleEn: 'Service Details' },
  { id: 4, title: 'معلوماتك', titleEn: 'Your Information' },
  { id: 5, title: 'ملخص السعر', titleEn: 'Price Summary' },
];
