import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import { AdminStats } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { BarChart3, PieChart, MapPin, Layers, TrendingUp } from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getDashboardStats();
      setStats(response.data);
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Generating analytics report..." />;

  const totalItems = (stats?.totalLostItems || 0) + (stats?.totalFoundItems || 0);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">System Analytics & Visual Reports</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Campus lost and found breakdown by category, location, and return success metrics.
        </p>
      </div>

      {/* Key Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <span>Total Reported Items</span>
            <BarChart3 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{totalItems}</p>
          <p className="text-xs text-slate-500">
            {stats?.totalLostItems || 0} Lost • {stats?.totalFoundItems || 0} Found
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <span>Return Success Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-600">
            {totalItems > 0 ? Math.round(((stats?.successfulReturns || 0) / totalItems) * 100) : 0}%
          </p>
          <p className="text-xs text-slate-500">{stats?.successfulReturns || 0} items returned to owners</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <span>Active Listings</span>
            <PieChart className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-3xl font-extrabold text-amber-600">{stats?.activeItems || 0}</p>
          <p className="text-xs text-slate-500">Currently active on portal</p>
        </div>

      </div>

      {/* Category Breakdown */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
          <Layers className="w-5 h-5 text-blue-600" />
          Items by Category Breakdown
        </div>

        <div className="space-y-4">
          {stats?.itemsByCategory && Object.keys(stats.itemsByCategory).length > 0 ? (
            Object.entries(stats.itemsByCategory).map(([cat, count]) => {
              const percentage = totalItems > 0 ? Math.round((count / totalItems) * 100) : 0;
              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-slate-800">{cat}</span>
                    <span className="font-mono text-xs text-slate-500">{count} item(s) ({percentage}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(percentage, 5)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-slate-500">No category breakdown data available yet.</p>
          )}
        </div>
      </div>

      {/* Location Breakdown */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
          <MapPin className="w-5 h-5 text-emerald-600" />
          Items by Location Breakdown
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats?.itemsByLocation && Object.keys(stats.itemsByLocation).length > 0 ? (
            Object.entries(stats.itemsByLocation).map(([loc, count]) => (
              <div key={loc} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{loc}</h4>
                  <p className="text-xs text-slate-500">Campus location hotspot</p>
                </div>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-blue-700">
                  {count} item(s)
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500">No location data available yet.</p>
          )}
        </div>
      </div>

    </div>
  );
};
