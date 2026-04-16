import { createContext, useContext, useReducer, useCallback } from 'react';
import { SERVICES } from '../data/services';

const BookingContext = createContext(null);

const initialState = {
  currentStep: 1,
  date: null,
  time: null,
  selectedService: null,
  serviceData: {},
  userInfo: {
    fullName: '',
    phone: '',
    email: '',
    location: null,
  },
  isSubmitting: false,
  isSubmitted: false,
  errors: {},
};

function bookingReducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'NEXT_STEP':
      return { ...state, currentStep: Math.min(state.currentStep + 1, 5) };
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(state.currentStep - 1, 1) };
    case 'SET_DATE':
      return { ...state, date: action.payload };
    case 'SET_TIME':
      return { ...state, time: action.payload };
    case 'SET_SERVICE':
      return { ...state, selectedService: action.payload, serviceData: {} };
    case 'UPDATE_SERVICE_DATA':
      return {
        ...state,
        serviceData: { ...state.serviceData, ...action.payload },
      };
    case 'SET_USER_INFO':
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'SET_SUBMITTED':
      return { ...state, isSubmitted: action.payload, isSubmitting: false };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.payload.field]: action.payload.message } };
    case 'CLEAR_ERROR':
      const newErrors = { ...state.errors };
      delete newErrors[action.payload];
      return { ...state, errors: newErrors };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const setStep = useCallback((step) => dispatch({ type: 'SET_STEP', payload: step }), []);
  const nextStep = useCallback(() => dispatch({ type: 'NEXT_STEP' }), []);
  const prevStep = useCallback(() => dispatch({ type: 'PREV_STEP' }), []);

  const setDate = useCallback((date) => dispatch({ type: 'SET_DATE', payload: date }), []);
  const setTime = useCallback((time) => dispatch({ type: 'SET_TIME', payload: time }), []);
  const setService = useCallback((serviceId) => {
    const service = Object.values(SERVICES).find(s => s.id === serviceId);
    dispatch({ type: 'SET_SERVICE', payload: service });
  }, []);

  const updateServiceData = useCallback((data) => {
    dispatch({ type: 'UPDATE_SERVICE_DATA', payload: data });
  }, []);

  const setUserInfo = useCallback((data) => {
    dispatch({ type: 'SET_USER_INFO', payload: data });
  }, []);

  const setSubmitting = useCallback((value) => {
    dispatch({ type: 'SET_SUBMITTING', payload: value });
  }, []);

  const setSubmitted = useCallback((value) => {
    dispatch({ type: 'SET_SUBMITTED', payload: value });
  }, []);

  const setError = useCallback((field, message) => {
    dispatch({ type: 'SET_ERROR', payload: { field, message } });
  }, []);

  const clearError = useCallback((field) => {
    dispatch({ type: 'CLEAR_ERROR', payload: field });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const calculatePrice = useCallback(() => {
    if (!state.selectedService) return 0;
    if (state.selectedService.hasSubOptions && state.serviceData.consultationType) {
      const option = state.selectedService.subOptions.find(
        opt => opt.id === state.serviceData.consultationType
      );
      return option?.price || 0;
    }
    return state.selectedService.price || 0;
  }, [state.selectedService, state.serviceData.consultationType]);

  const canProceed = useCallback(() => {
    switch (state.currentStep) {
      case 1:
        return state.date && state.time;
      case 2:
        return state.selectedService;
      case 3:
        return true;
      case 4:
        return state.userInfo.fullName && state.userInfo.phone;
      default:
        return true;
    }
  }, [state]);

  const value = {
    state,
    setStep,
    nextStep,
    prevStep,
    setDate,
    setTime,
    setService,
    updateServiceData,
    setUserInfo,
    setSubmitting,
    setSubmitted,
    setError,
    clearError,
    reset,
    calculatePrice,
    canProceed,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
