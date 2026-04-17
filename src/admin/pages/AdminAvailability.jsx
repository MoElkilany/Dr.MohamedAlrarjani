import { useState, useEffect } from 'react';
import { availabilityService } from '../../services/endpoints';

const Icons = {
  Plus: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

function SkeletonTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">التاريخ</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">الأوقات المتاحة</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">عدد الأوقات</th>
              <th className="text-center py-4 px-6 text-sm font-semibold text-gray-400">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-b border-gray-50">
                <td className="py-4 px-6"><div className="h-4 w-24 bg-gray-200 rounded"></div></td>
                <td className="py-4 px-6"><div className="h-6 w-48 bg-gray-200 rounded"></div></td>
                <td className="py-4 px-6"><div className="h-4 w-8 bg-gray-200 rounded"></div></td>
                <td className="py-4 px-6"><div className="h-8 w-8 bg-gray-200 rounded-full mx-auto"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminAvailability() {
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlots, setTimeSlots] = useState(['09:00 - 10:00']);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchAvailabilities = async () => {
    try {
      setLoading(true);
      const response = await availabilityService.getAll();
      setAvailabilities(response.data.data || response.data);
    } catch (err) {
      setError('فشل في تحميل المواعيد');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAvailabilities(); }, []);

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, '']);
  };

  const handleRemoveTimeSlot = (index) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const handleTimeSlotChange = (index, value) => {
    const newSlots = [...timeSlots];
    newSlots[index] = value;
    setTimeSlots(newSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || timeSlots.filter(t => t.trim()).length === 0) return;
    setSubmitting(true);
    setError('');
    try {
      await availabilityService.create({
        date: selectedDate,
        available_times: timeSlots.filter(t => t.trim()),
      });
      setShowForm(false);
      setSelectedDate('');
      setTimeSlots(['09:00 - 10:00']);
      fetchAvailabilities();
    } catch (err) {
      setError(err.response?.data?.message || 'فشل في إضافة المواعيد');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه المواعيد؟')) return;
    try {
      await availabilityService.delete(id);
      fetchAvailabilities();
    } catch (err) {
      setError('فشل في حذف المواعيد');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <SkeletonTable />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#134E4A]">المواعيد المتاحة</h2>
          <p className="text-[#5F7674] mt-1">إدارة المواعيد المتاحة للحجز</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 bg-[#0F766E] text-white rounded-xl hover:bg-[#0d655d] transition-all font-medium shadow-sm hover:shadow-md flex items-center gap-2"
        >
          <Icons.Plus />
          {showForm ? 'إلغاء' : 'إضافة مواعيد'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#134E4A] mb-2 flex items-center gap-2">
              <Icons.Calendar />
              التاريخ
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#134E4A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#134E4A] mb-3 flex items-center gap-2">
              <Icons.Clock />
              الأوقات المتاحة
            </label>
            <div className="space-y-3">
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={slot}
                    onChange={(e) => handleTimeSlotChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#134E4A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] transition-all"
                    placeholder="09:00 - 10:00"
                  />
                  {timeSlots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTimeSlot(index)}
                      className="p-3 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors"
                    >
                      <Icons.Trash />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddTimeSlot}
              className="mt-3 px-4 py-2 text-sm text-[#0F766E] border border-[#0F766E]/20 rounded-xl hover:bg-[#0F766E]/5 transition-colors flex items-center gap-1"
            >
              <Icons.Plus />
              إضافة وقت آخر
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-gradient-to-r from-[#0F766E] to-[#134E4A] text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                جاري الحفظ...
              </>
            ) : (
              <>
                <Icons.Plus />
                حفظ المواعيد
              </>
            )}
          </button>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-right py-4 px-6 text-sm font-semibold text-[#5F7674]">التاريخ</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-[#5F7674]">الأوقات المتاحة</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-[#5F7674]">عدد الأوقات</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-[#5F7674]">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {availabilities.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-[#5F7674]">
                    <div className="flex flex-col items-center gap-2">
                      <Icons.Calendar />
                      لا توجد مواعيد متاحة بعد
                    </div>
                  </td>
                </tr>
              ) : (
                availabilities.map((avail, index) => (
                  <tr 
                    key={avail.id} 
                    className={`border-b border-gray-50 hover:bg-[#F0FDFA]/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                  >
                    <td className="py-4 px-6 text-sm text-[#134E4A] font-medium">{avail.date}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-2">
                        {(avail.available_times || []).map((time, i) => (
                          <span key={i} className="px-3 py-1.5 bg-[#F0FDFA] text-[#0F766E] text-xs font-medium rounded-lg border border-[#0F766E]/20">
                            {time}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#5F7674]">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-[#F0FDFA] text-[#0F766E] rounded-full text-sm font-semibold">
                        {(avail.available_times || []).length}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleDelete(avail.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2.5 rounded-xl transition-colors"
                      >
                        <Icons.Trash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}