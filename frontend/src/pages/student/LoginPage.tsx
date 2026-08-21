import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../services/api';
import { School, LogIn, Key, Mail, Shield, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });
      login(response.data.token, response.data.user);
      setLoading(false);
      
      if (response.data.user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    }
  };

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-14 h-14 bg-blue-700 text-white rounded-2xl flex items-center justify-center shadow-md mb-3">
            <School className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            College Lost & Found
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to report items, search found property, or track your claims.
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-xl space-y-2">
          <p className="text-xs font-semibold text-blue-900 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-blue-700" />
            Quick Demo Login Buttons:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('student@college.edu', 'student123')}
              className="text-xs bg-white hover:bg-blue-100 text-blue-800 font-medium py-1.5 px-2.5 rounded-lg border border-blue-200 shadow-xs flex items-center justify-center gap-1"
            >
              <span>Student Account</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('jegan@gmail.com', 'jegan123')}
              className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold py-1.5 px-2.5 rounded-lg border border-amber-300 shadow-xs flex items-center justify-center gap-1"
            >
              <Shield className="w-3.5 h-3.5 text-amber-700" />
              <span>Admin Account</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@college.edu"
                className="pl-10 w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Key className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-base shadow-md"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <LogIn className="w-5 h-5 ml-1" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-700 hover:underline">
              Create Student Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
