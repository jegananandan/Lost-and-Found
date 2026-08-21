import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  ShieldCheck,
  Users,
  BarChart3,
  LogOut,
  ArrowLeft,
  School
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const adminNav = [
    { name: 'Overview', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'All Items', path: '/admin/items', icon: <Package className="w-4 h-4" /> },
    { name: 'Pending Claims', path: '/admin/claims', icon: <ShieldCheck className="w-4 h-4" /> },
    { name: 'User Management', path: '/admin/users', icon: <Users className="w-4 h-4" /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between shrink-0 shadow-xl">
        <div className="space-y-6">
          
          <div className="flex items-center gap-2.5 text-white font-bold text-lg pb-4 border-b border-slate-800">
            <div className="w-9 h-9 bg-amber-500 text-slate-900 rounded-xl flex items-center justify-center font-black">
              <School className="w-5 h-5" />
            </div>
            <div>
              <span className="block leading-tight font-extrabold tracking-tight text-base">ADMIN PORTAL</span>
              <span className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">College Lost & Found</span>
            </div>
          </div>

          <nav className="space-y-1">
            {adminNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Student View
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300 py-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout ({user?.name})
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};
