import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardService } from '../../services/endpoints';

const Icons = {
  Calendar: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Star: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  ThumbUp: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
    </svg>
  ),
  Document: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  TrendUp: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  TrendDown: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
    </svg>
  ),
};

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-gray-200"></div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, trend }) {
  const colors = {
    teal: { bg: 'bg-teal-500', text: 'text-teal-600', light: 'bg-teal-50' },
    amber: { bg: 'bg-amber-500', text: 'text-amber-600', light: 'bg-amber-50' },
    green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
    rose: { bg: 'bg-rose-500', text: 'text-rose-600', light: 'bg-rose-50' },
  };
  
  const colorScheme = colors[color] || colors.teal;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#5F7674] mb-1">{label}</p>
          <p className="text-3xl font-bold text-[#134E4A] group-hover:text-[#0F766E] transition-colors">
            {value}
          </p>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? <Icons.TrendUp /> : <Icons.TrendDown />}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 rounded-2xl ${colorScheme.light} flex items-center justify-center ${colorScheme.text}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardService.getStats();
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
        setError('فشل في تحميل إحصائيات لوحة التحكم');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const statCards = stats ? [
    { label: 'إجمالي الحجوزات', value: stats.total_bookings, icon: <Icons.Calendar />, color: 'teal' },
    { label: 'حجوزات معلقة', value: stats.pending_bookings, icon: <Icons.Clock />, color: 'amber' },
    { label: 'حجوزات مؤكدة', value: stats.confirmed_bookings, icon: <Icons.Check />, color: 'green' },
    { label: 'إجمالي التقييمات', value: stats.total_reviews, icon: <Icons.Star />, color: 'purple' },
    { label: 'تقييمات معتمدة', value: stats.approved_reviews, icon: <Icons.ThumbUp />, color: 'blue' },
    { label: 'تقييمات معلقة', value: stats.pending_reviews, icon: <Icons.Document />, color: 'rose' },
  ] : [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#134E4A]">لوحة التحكم</h2>
        <p className="text-[#5F7674] mt-1">مرحباً بك، إليك ملخصاً لآخر النشاطات</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {stats?.recent_bookings && stats.recent_bookings.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#134E4A]">آخر الحجوزات</h3>
            <Link to="/admin/bookings" className="text-sm text-[#0F766E] hover:text-[#0d655d] font-medium cursor-pointer transition-colors">
              عرض الكل →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="text-right py-4 px-6 text-sm font-semibold text-[#5F7674]">الاسم</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-[#5F7674]">الخدمة</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-[#5F7674]">التاريخ</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-[#5F7674]">الوقت</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-[#5F7674]">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent_bookings.map((booking, index) => (
                  <tr 
                    key={booking.id} 
                    className={`border-b border-gray-50 hover:bg-[#F0FDFA]/50 transition-colors cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                  >
                    <td className="py-4 px-6 text-sm font-medium text-[#134E4A]">{booking.name}</td>
                    <td className="py-4 px-6 text-sm text-[#5F7674]">{booking.service?.name_ar || `خدمة #${booking.service_id}`}</td>
                    <td className="py-4 px-6 text-sm text-[#5F7674]">{booking.date}</td>
                    <td className="py-4 px-6 text-sm text-[#5F7674]">{booking.time}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-700' 
                          : booking.status === 'pending' 
                            ? 'bg-amber-100 text-amber-700' 
                            : 'bg-red-100 text-red-700'
                      }`}>
                        {booking.status === 'confirmed' ? 'مؤكد' : booking.status === 'pending' ? 'معلق' : 'ملغي'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}