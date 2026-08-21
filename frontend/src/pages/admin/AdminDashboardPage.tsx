import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import { AdminStats, Item, Claim } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Badge } from '../../components/common/Badge';
import { Link } from 'react-router-dom';
import {
  Users,
  Package,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentItems, setRecentItems] = useState<Item[]>([]);
  const [pendingClaims, setPendingClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, itemsRes, claimsRes] = await Promise.all([
        adminApi.getDashboardStats(),
        adminApi.getAllItems(),
        adminApi.getAllClaims()
      ]);

      setStats(statsRes.data);
      setRecentItems(itemsRes.data.slice(0, 5));
      setPendingClaims(claimsRes.data.filter(c => c.status === 'PENDING').slice(0, 5));
    } catch (err) {
      console.error('Failed to load admin dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading Admin Dashboard Analytics..." />;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Admin System Dashboard</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Overview of campus lost & found activity, pending claims, and system metrics.
        </p>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Users</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{stats?.totalUsers || 0}</p>
          <span className="text-[11px] text-slate-400">Registered campus members</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Lost</span>
            <Package className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-3xl font-extrabold text-rose-600">{stats?.totalLostItems || 0}</p>
          <span className="text-[11px] text-slate-400">Lost item reports</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Found</span>
            <Package className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-600">{stats?.totalFoundItems || 0}</p>
          <span className="text-[11px] text-slate-400">Found item reports</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Claims</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-3xl font-extrabold text-amber-600">{stats?.pendingClaims || 0}</p>
          <span className="text-[11px] text-slate-400">Awaiting admin review</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Returns</span>
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-3xl font-extrabold text-purple-600">{stats?.successfulReturns || 0}</p>
          <span className="text-[11px] text-slate-400">Reunited with owners</span>
        </div>

      </div>

      {/* Grid: Pending Claims & Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pending Claims Queue */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              Pending Claims Review Queue
            </div>
            <Link to="/admin/claims" className="text-xs font-semibold text-blue-700 hover:underline">
              View All Claims →
            </Link>
          </div>

          {pendingClaims.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center bg-slate-50 rounded-xl">
              No pending claims requiring review.
            </p>
          ) : (
            <div className="space-y-3">
              {pendingClaims.map((claim) => (
                <div key={claim.claimId} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-900">{claim.claimantName}</span>
                      <span className="text-slate-400 font-mono">Claim #{claim.claimId}</span>
                    </div>
                    <p className="text-slate-600 font-medium">Item ID: {claim.itemId}</p>
                    <p className="text-slate-500 text-[11px] line-clamp-1 italic">"{claim.note || 'No note'}"</p>
                  </div>
                  <Link to="/admin/claims" className="btn-secondary text-[11px] px-3 py-1.5 shrink-0">
                    Review
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Items List */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <Package className="w-5 h-5 text-blue-600" />
              Recent Reports
            </div>
            <Link to="/admin/items" className="text-xs font-semibold text-blue-700 hover:underline">
              Manage All Items →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">ID</th>
                  <th className="p-2.5">Type</th>
                  <th className="p-2.5">Item Name</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentItems.map((item) => (
                  <tr key={item.itemId} className="hover:bg-slate-50/80">
                    <td className="p-2.5 font-mono text-slate-500">{item.itemId}</td>
                    <td className="p-2.5"><Badge status={item.type} type="type" /></td>
                    <td className="p-2.5 font-medium text-slate-900 truncate max-w-[150px]">{item.name}</td>
                    <td className="p-2.5"><Badge status={item.status} type="status" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
