import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

export default function AdminLogin() {
  const { login } = useOutletContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
        setError('لا يمكن الاتصال بالخادم. تأكد من تشغيل الخادم الخلفي.');
      } else if (err.response?.status === 401) {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      } else if (err.response?.status === 403) {
        setError('غير مصرح لك بالدخول. يجب أن تكون مديراً.');
      } else {
        setError(err.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#F0FDFA] via-white to-[#F0FDFA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#0e8fa3] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">م</span>
          </div>
          <h1 className="text-2xl font-bold text-[#134E4A]">لوحة التحكم</h1>
          <p className="text-[#134E4A]/60 mt-1">د. محمد العرجاني</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-[#0e8fa3]/10 p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#134E4A] mb-2">اسم المستخدم</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#0e8fa3]/20 bg-white text-[#134E4A] focus:outline-none focus:ring-2 focus:ring-[#0e8fa3]/30 focus:border-[#0e8fa3]"
                placeholder="أدخل اسم المستخدم"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#134E4A] mb-2">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#0e8fa3]/20 bg-white text-[#134E4A] focus:outline-none focus:ring-2 focus:ring-[#0e8fa3]/30 focus:border-[#0e8fa3]"
                placeholder="أدخل كلمة المرور"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#0e8fa3] to-[#134E4A] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#0e8fa3]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  جاري تسجيل الدخول...
                </span>
              ) : (
                'تسجيل الدخول'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}