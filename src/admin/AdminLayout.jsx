import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { authService } from '../services/endpoints';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const Icons = {
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Clipboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  Star: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.05c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.05a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Logout: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Logo: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#0F766E" />
      <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const savedUser = localStorage.getItem('admin_user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (username, password) => {
    const response = await authService.login({ username, password });
    const { user: userData, token } = response.data;
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      setUser(null);
    }
  }, []);

  const isAuthenticated = !!user && user.is_admin;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F0FDFA] to-white">
        <div className="w-12 h-12 border-4 border-[#0F766E]/20 border-t-[#0F766E] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (location.pathname === '/admin/login') {
      return <Outlet context={{ login, isAuthenticated }} />;
    }
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { path: '/admin', label: 'لوحة التحكم', icon: <Icons.Dashboard /> },
    { path: '/admin/availability', label: 'المواعيد المتاحة', icon: <Icons.Calendar /> },
    { path: '/admin/bookings', label: 'الحجوزات', icon: <Icons.Clipboard /> },
    { path: '/admin/reviews', label: 'التقييمات', icon: <Icons.Star /> },
  ];

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#F0FDFA] to-white flex">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 right-0 z-50 w-72 bg-white border-r border-gray-100 shadow-xl transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0F766E] to-[#14B8A6] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0F766E]/20">
                <Icons.Logo />
              </div>
              <div>
                <h2 className="font-bold text-lg text-[#134E4A]">العرجاني</h2>
                <p className="text-xs text-[#5F7674]">لوحة التحكم</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white shadow-lg shadow-[#0F766E]/20'
                      : hoveredItem === item.path
                        ? 'bg-[#F0FDFA] text-[#0F766E]'
                        : 'text-[#5F7674] hover:bg-gray-50'
                  }`}
                >
                  <span className={`${isActive ? 'text-white' : hoveredItem === item.path ? 'text-[#0F766E]' : 'text-[#5F7674]'}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive && (
                    <div className="mr-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="absolute bottom-0 right-0 left-0 p-4 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0F766E] to-[#14B8A6] rounded-xl flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || 'ا'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#134E4A] truncate">{user?.name}</p>
                <p className="text-xs text-[#5F7674]">مدير النظام</p>
              </div>
              <button 
                onClick={logout} 
                className="p-2 text-[#5F7674] hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 cursor-pointer"
                title="تسجيل الخروج"
              >
                <Icons.Logout />
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-gray-900/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-30">
            <div className="px-6 py-4 flex items-center justify-between">
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 text-[#5F7674] transition-colors cursor-pointer"
              >
                <Icons.Menu />
              </button>
              <div className="flex items-center gap-4">
                <h1 className="text-lg font-bold text-[#134E4A] hidden sm:block">
                  {navItems.find(i => i.path === location.pathname)?.label || 'لوحة التحكم'}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F0FDFA] rounded-xl flex items-center justify-center">
                  <span className="text-sm font-bold text-[#0F766E]">{user?.name?.charAt(0) || 'ا'}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6 lg:p-8">
            <Outlet context={{ user, login, logout, isAuthenticated }} />
          </main>
        </div>
      </div>
    </AuthContext.Provider>
  );
}