import api from './api';

export const authService = {
  login: (credentials) => api.post('/login', credentials),
  logout: () => api.post('/logout'),
  me: () => api.get('/me'),
};

export const availabilityService = {
  getAll: (params) => api.get('/availability', { params }),
  getByDate: (date) => api.get(`/availability/${date}`),
  create: (data) => api.post('/availability', data),
  delete: (id) => api.delete(`/availability/${id}`),
};

export const bookingService = {
  create: (data) => api.post('/bookings', data),
  getAll: (params) => api.get('/bookings', { params }),
  getById: (id) => api.get(`/bookings/${id}`),
  updateStatus: (id, status) => api.patch(`/bookings/${id}/status`, { status }),
};

export const reviewService = {
  create: (data) => api.post('/reviews', data),
  getApproved: (params) => api.get('/reviews', { params }),
  getAll: (params) => api.get('/admin/reviews', { params }),
  approve: (id) => api.patch(`/reviews/${id}/approve`),
  delete: (id) => api.delete(`/reviews/${id}`),
};

export const serviceService = {
  getAll: () => api.get('/services'),
  getById: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
};

export const dashboardService = {
  getStats: () => api.get('/dashboard/stats'),
};