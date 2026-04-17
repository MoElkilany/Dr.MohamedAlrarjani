import { useState, useEffect } from 'react';
import { reviewService } from '../../services/endpoints';

const Icons = {
  Star: ({ filled }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  User: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Message: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
};

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200"></div>
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
        ))}
      </div>
      <div className="h-16 bg-gray-200 rounded mb-4"></div>
      <div className="flex gap-2">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
        <div className="h-8 w-16 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterApproved, setFilterApproved] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const params = filterApproved !== null ? { approved: filterApproved } : {};
      const response = await reviewService.getAll(params);
      setReviews(response.data.data || response.data);
    } catch (err) {
      setError('فشل في تحميل التقييمات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, [filterApproved]);

  const handleApprove = async (id) => {
    if (!window.confirm('هل أنت متأكد من اعتماد هذا التقييم؟')) return;
    try {
      await reviewService.approve(id);
      setReviews(reviews.map(r => r.id === id ? { ...r, approved: true } : r));
    } catch (err) {
      setError('فشل في اعتماد التقييم');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا التقييم؟')) return;
    try {
      await reviewService.delete(id);
      setReviews(reviews.filter(r => r.id !== id));
    } catch (err) {
      setError('فشل في حذف التقييم');
    }
  };

  if (loading && reviews.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#134E4A]">التقييمات</h2>
          <p className="text-[#5F7674] mt-1">إدارة تقييمات العملاء</p>
        </div>
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
          {[
            { value: null, label: 'الكل', icon: '📋' },
            { value: false, label: 'معلق', icon: '⏳' },
            { value: true, label: 'معتمد', icon: '✓' },
          ].map(({ value, label, icon }) => (
            <button
              key={String(value)}
              onClick={() => setFilterApproved(value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                (filterApproved === value) || (value === null && filterApproved === null)
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-[#5F7674]">
            <div className="flex flex-col items-center gap-2">
              <Icons.Message />
              لا توجد تقييمات
            </div>
          </div>
        ) : (
          reviews.map((review, index) => (
            <div 
              key={review.id} 
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#134E4A] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:shadow-md transition-shadow">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#134E4A] group-hover:text-[#0F766E] transition-colors">{review.name}</h3>
                    {review.role && <p className="text-sm text-[#5F7674]">{review.role}</p>}
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  review.approved
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {review.approved ? '✓ معتمد' : '⏳ معلق'}
                </span>
              </div>

              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icons.Star key={star} filled={star <= review.rating} />
                ))}
              </div>

              <p className="text-[#5F7674] leading-relaxed mb-4 bg-gray-50 rounded-xl p-3 border border-gray-100">
                {review.comment}
              </p>

              <div className="flex gap-2">
                {!review.approved && (
                  <button
                    onClick={() => handleApprove(review.id)}
                    className="px-4 py-2 text-sm font-medium bg-green-50 text-green-700 border border-green-200 rounded-xl hover:bg-green-100 hover:shadow-sm transition-all flex items-center gap-2"
                  >
                    <Icons.Check />
                    اعتماد
                  </button>
                )}
                <button
                  onClick={() => handleDelete(review.id)}
                  className="px-4 py-2 text-sm font-medium bg-red-50 text-red-700 border border-red-200 rounded-xl hover:bg-red-100 hover:shadow-sm transition-all flex items-center gap-2"
                >
                  <Icons.Trash />
                  حذف
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}