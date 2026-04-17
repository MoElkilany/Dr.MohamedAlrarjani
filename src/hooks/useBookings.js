import { useState, useCallback } from 'react';
import { bookingService } from '../services/endpoints';

export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchBookings = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await bookingService.getAll(params);
      setBookings(response.data.data || response.data);
      setPagination({
        current_page: response.data.current_page,
        last_page: response.data.last_page,
        total: response.data.total,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في تحميل الحجوزات');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBookingStatus = useCallback(async (id, status) => {
    try {
      const response = await bookingService.updateStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? response.data.data || response.data : b))
      );
      return response.data.data || response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في تحديث حالة الحجز');
      throw err;
    }
  }, []);

  return { bookings, loading, error, pagination, fetchBookings, updateBookingStatus };
}