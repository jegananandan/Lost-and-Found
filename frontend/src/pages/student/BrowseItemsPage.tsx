import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { itemsApi } from '../../services/api';
import { Item } from '../../types';
import { ItemCard } from '../../components/common/ItemCard';
import { SkeletonCard } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { Badge } from '../../components/common/Badge';
import {
  Search,
  Filter,
  RefreshCcw,
  Grid,
  List as ListIcon,
  MapPin,
  Calendar,
  ArrowRight
} from 'lucide-react';

export const BrowseItemsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter States
  const [type, setType] = useState<string>(searchParams.get('type') || 'ALL');
  const [category, setCategory] = useState<string>(searchParams.get('category') || 'ALL');
  const [status, setStatus] = useState<string>(searchParams.get('status') || 'ALL');
  const [query, setQuery] = useState<string>(searchParams.get('query') || '');

  useEffect(() => {
    fetchFilteredItems();
  }, [type, category, status]);

  const fetchFilteredItems = async () => {
    setLoading(true);
    try {
      const response = await itemsApi.searchItems({
        type: type !== 'ALL' ? type : undefined,
        category: category !== 'ALL' ? category : undefined,
        status: status !== 'ALL' ? status : undefined,
        query: query.trim() || undefined,
      });
      setItems(response.data);
    } catch (err) {
      console.error('Failed to fetch items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFilteredItems();
  };

  const handleResetFilters = () => {
    setType('ALL');
    setCategory('ALL');
    setStatus('ALL');
    setQuery('');
    setSearchParams({});
  };

  const categories = [
    'ALL', 'Electronics', 'Bags', 'Books', 'Documents', 'Keys', 'Accessories', 'Clothing', 'Other'
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Find Lost & Found Items</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Search active reports across campus or filter by category and location.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/report-lost" className="btn-lost text-xs shadow-xs">
            + Report Lost
          </Link>
          <Link to="/report-found" className="btn-found text-xs shadow-xs">
            + Report Found
          </Link>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keyword, item name, location..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button type="submit" className="btn-primary text-sm px-5">
            Search
          </button>
        </form>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Type Filter Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-700">
              {['ALL', 'LOST', 'FOUND'].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    type === t
                      ? t === 'LOST'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : t === 'FOUND'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-blue-700 shadow-xs'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {t === 'ALL' ? 'All Types' : t}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'ALL' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="CLAIMED">Claimed</option>
                <option value="RETURNED">Returned</option>
              </select>
            </div>

            {(type !== 'ALL' || category !== 'ALL' || status !== 'ALL' || query) && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-500 hover:text-slate-800 underline flex items-center gap-1"
              >
                <RefreshCcw className="w-3 h-3" />
                Reset Filters
              </button>
            )}

          </div>

          {/* Grid vs List View Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-xs text-blue-700' : 'text-slate-400'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white shadow-xs text-blue-700' : 'text-slate-400'}`}
              title="List View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Item Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title="We couldn't find a matching item"
          description="Try changing your search keywords or filter criteria. If you've lost an item that isn't listed, report it so others can find it."
          actionText="Report Your Lost Item"
          actionLink="/report-lost"
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <ItemCard key={item.itemId} item={item} />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.itemId}
              className="college-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={item.imageUrl || (item.type === 'LOST' 
                      ? 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=200&q=80'
                      : 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=200&q=80')}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge status={item.type} type="type" />
                    <Badge status={item.status} type="status" />
                    <span className="text-xs text-slate-400 font-mono">{item.itemId}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base">{item.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {item.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-400" /> {item.reportedDate}</span>
                  </div>
                </div>
              </div>

              <Link
                to={`/items/${item.itemId}`}
                className="btn-secondary text-xs w-full sm:w-auto"
              >
                View Details
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
