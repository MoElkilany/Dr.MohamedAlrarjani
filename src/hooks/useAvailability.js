import { useState, useEffect, useCallback } from 'react';
import { availabilityService } from '../services/endpoints';

export function useAvailability(month, year) {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailability = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (month !== undefined) params.month = month + 1;
      if (year !== undefined) params.year = year;
      const response = await availabilityService.getAll(params);
      setAvailability(response.data.data || response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في تحميل المواعيد المتاحة');
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  const getAvailableTimesForDate = useCallback(
    (dateStr) => {
      const found = availability.find((a) => a.date === dateStr);
      return found ? found.available_times : [];
    },
    [availability]
  );

  return { availability, loading, error, refetch: fetchAvailability, getAvailableTimesForDate };
}