import { useState, useEffect } from 'react';
import { useBookings } from '../../hooks/useBookings';

const Icons = {
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  X: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
  Phone: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">#</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">الاسم</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">الخدمة</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">التاريخ</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">الوقت</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">الهاتف</th>
              <th className="text-center py-4 px-6 text-sm font-semibold text-gray-400">الحالة</th>
              <th className="text-center py-4 px-6 text-sm font-semibold text-gray-400">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-b border-gray-50">
                <td className="py-4 px-6"><div className="h-4 w-8 bg-gray-200 rounded"></div></td>
                <td className="py-4 px-6"><div className="h-4 w-32 bg-gray-200 rounded"></div></td>
                <td className="py-4 px-6"><div className="h-4 w-24 bg-gray-200 rounded"></div></td>
                <td className="py-4 px-6"><div className="h-4 w-20 bg-gray-200 rounded"></div></td>
                <td className="py-4 px-6"><div className="h-4 w-16 bg-gray-200 rounded"></div></td>
                <td className="py-4 px-6"><div className="h-4 w-24 bg-gray-200 rounded"></div></td>
                <td className="py-4 px-6"><div className="h-6 w-16 bg-gray-200 rounded-full mx-auto"></div></td>
                <td className="py-4 px-6"><div className="h-8 w-24 bg-gray-200 rounded mx-auto"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminBookings() {
  const { bookings, loading, error, pagination, fetchBookings, updateBookingStatus } = useBookings();
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchBookings(filterStatus ? { status: filterStatus } : {});
  }, [filterStatus]);

  const handleStatusUpdate = async (id, newStatus) => {
    const statusLabel = newStatus === 'confirmed' ? 'تأكيد' : 'إلغاء';
    if (!window.confirm(`هل أنت متأكد من ${statusLabel} هذا الحجز؟`)) return;
    try {
      await updateBookingStatus(id, newStatus);
    } catch (err) {
      console.error('Failed to update booking status:', err);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: '🌐' },
      confirmed: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: '✓' },
      cancelled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: '✕' },
    };
    const labels = {
      pending: 'معلق',
      confirmed: 'مؤكد',
      cancelled: 'ملغي',
    };
    const style = styles[status] || styles.pending;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${style.bg} ${style.text} border ${style.border}`}>
        <span>{style.icon}</span>
        {labels[status] || status}
      </span>
    );
  };

  if (loading && bookings.length === 0) {
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
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#134E4A]">الحجوزات</h2>
          <p className="text-[#5F7674] mt-1">إدارة حجوزات العملاء</p>
        </div>
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
          {[
            { value: '', label: 'الكل', icon: '📋' },
            { value: 'pending', label: 'معلق', icon: '⏳' },
            { value: 'confirmed', label: 'مؤكد', icon: '✓' },
            { value: 'cancelled', label: 'ملغي', icon: '✕' },
          ].map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => setFilterStatus(value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === value
                  ? 'bg-[#0F766E] text-white shadow-sm'
                  : 'text-[#5F7674] hover:bg-white hover:text-[#134E4A]'
              }`}
            >
              <span className="ml-1.5">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-right py-4 px-6 text-sm font-semibold text-[#5F7674]">#</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-[#5F7674]">الاسم</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-[#5F7674]">الخدمة</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-[#5F7674]">التاريخ</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-[#5F7674]">الوقت</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-[#5F7674]">الهاتف</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-[#5F7674]">الحالة</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-[#5F7674]">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-[#5F7674]">
                    <div className="flex flex-col items-center gap-2">
                      <Icons.Calendar />
                      لا توجد حجوزات
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map((booking, index) => (
                  <tr 
                    key={booking.id} 
                    className={`border-b border-gray-50 hover:bg-[#F0FDFA]/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                  >
                    <td className="py-4 px-6 text-sm text-[#5F7674] font-medium">{index + 1}</td>
                    <td className="py-4 px-6 text-sm text-[#134E4A] font-semibold">{booking.name}</td>
                    <td className="py-4 px-6 text-sm text-[#5F7674]">
                      <span className="px-3 py-1 bg-[#F0FDFA] text-[#0F766E] rounded-lg text-xs font-medium border border-[#0F766E]/20">
                        {booking.service?.name_ar || `خدمة #${booking.service_id}`}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#5F7674]">{booking.date}</td>
                    <td className="py-4 px-6 text-sm text-[#5F7674]">{booking.time}</td>
                    <td className="py-4 px-6 text-sm text-[#5F7674]" dir="ltr">{booking.phone}</td>
                    <td className="py-4 px-6 text-center">{getStatusBadge(booking.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                              className="px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 hover:shadow-sm transition-all flex items-center gap-1"
                            >
                              <Icons.Check />
                              تأكيد
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                              className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 hover:shadow-sm transition-all flex items-center gap-1"
                            >
                              <Icons.X />
                              إلغاء
                            </button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                            className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 hover:shadow-sm transition-all flex items-center gap-1"
                          >
                            <Icons.X />
                            إلغاء
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pagination && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-[#5F7674]">
              عرض {bookings.length} من {pagination.total} حجز
            </p>
          </div>
        )}
      </div>
    </div>
  );
}