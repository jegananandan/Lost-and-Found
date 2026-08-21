import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { itemsApi } from '../../services/api';
import { Item } from '../../types';
import { ItemCard } from '../../components/common/ItemCard';
import { SkeletonCard } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Search,
  PlusCircle,
  HelpCircle,
  Laptop,
  Briefcase,
  BookOpen,
  FileText,
  Key,
  Watch,
  Shirt,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentItems, setRecentItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await itemsApi.getAllItems();
        setRecentItems(response.data.slice(0, 8)); // Top 8 recent items
      } catch (err) {
        console.error('Failed to load recent items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/items?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    { name: 'Electronics', icon: <Laptop className="w-5 h-5 text-blue-600" /> },
    { name: 'Bags', icon: <Briefcase className="w-5 h-5 text-emerald-600" /> },
    { name: 'Books', icon: <BookOpen className="w-5 h-5 text-amber-600" /> },
    { name: 'Documents', icon: <FileText className="w-5 h-5 text-purple-600" /> },
    { name: 'Keys', icon: <Key className="w-5 h-5 text-rose-600" /> },
    { name: 'Accessories', icon: <Watch className="w-5 h-5 text-teal-600" /> },
    { name: 'Clothing', icon: <Shirt className="w-5 h-5 text-indigo-600" /> },
    { name: 'Other', icon: <Layers className="w-5 h-5 text-slate-600" /> },
  ];

  return (
    <div className="space-y-10 pb-12">
      
      {/* Hero Welcome Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10">
          <Sparkles className="w-96 h-96 text-white" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-700/60 border border-blue-400/30 rounded-full text-xs font-semibold text-blue-100">
            <span>Official Campus Lost & Found System</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Hello, {user?.name || 'Student'} 👋
          </h1>
          
          <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
            Find what you've lost on campus. Return what you've found. Together, we reunite people with their belongings.
          </p>

          {/* Prominent Dual Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            
            {/* Action 1: Lost */}
            <Link
              to="/report-lost"
              className="group bg-white text-slate-900 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 border-2 border-rose-100 hover:border-rose-300 flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-600 animate-pulse"></span>
                  <span className="font-extrabold text-slate-900 text-lg group-hover:text-rose-600 transition-colors">
                    I Lost Something
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Report a missing item on campus</p>
              </div>
              <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <PlusCircle className="w-6 h-6" />
              </div>
            </Link>

            {/* Action 2: Found */}
            <Link
              to="/report-found"
              className="group bg-white text-slate-900 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 border-2 border-emerald-100 hover:border-emerald-300 flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span className="font-extrabold text-slate-900 text-lg group-hover:text-emerald-600 transition-colors">
                    I Found Something
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Help return a found item to owner</p>
              </div>
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <PlusCircle className="w-6 h-6" />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Prominent Global Search Bar */}
      <section className="max-w-4xl mx-auto">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-6 h-6 text-blue-600" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search by item name, description, location (e.g. 'Blue Nike Backpack', 'Library', 'Phone')..."
            className="w-full pl-12 pr-32 py-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all"
          />
          <button
            type="submit"
            className="absolute right-2.5 top-2.5 bottom-2.5 btn-primary px-6 text-sm shadow-sm"
          >
            Search Items
          </button>
        </form>
      </section>

      {/* Category Shortcuts */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Category Shortcuts</h2>
          <Link to="/items" className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-1">
            Browse All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/items?category=${encodeURIComponent(cat.name)}`}
              className="college-card p-3.5 text-center flex flex-col items-center justify-center gap-2 hover:bg-blue-50/50 hover:border-blue-200 transition-all group"
            >
              <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
                {cat.icon}
              </div>
              <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700 line-clamp-1">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Items Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Recent Lost & Found Reports</h2>
            <p className="text-xs text-slate-500">Latest active items reported on campus</p>
          </div>
          <Link to="/items" className="btn-secondary text-xs">
            View All Reports
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </div>
        ) : recentItems.length === 0 ? (
          <EmptyState
            title="No recent items reported"
            description="Be the first to submit a lost or found report on campus."
            actionText="Report an Item"
            actionLink="/report-lost"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentItems.map((item) => (
              <ItemCard key={item.itemId} item={item} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
