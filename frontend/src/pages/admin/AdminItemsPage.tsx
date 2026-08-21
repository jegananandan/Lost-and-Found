import React, { useState, useEffect } from 'react';
import { adminApi, itemsApi } from '../../services/api';
import { Item } from '../../types';
import { Badge } from '../../components/common/Badge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Search, Trash2, Edit3, CheckCircle, MapPin, Calendar } from 'lucide-react';

export const AdminItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getAllItems();
      setItems(response.data);
    } catch (err) {
      console.error('Failed to load admin items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (itemId: string, newStatus: string) => {
    try {
      await itemsApi.updateStatus(itemId, newStatus);
      setActionMessage(`Item ${itemId} status updated to ${newStatus}`);
      fetchItems();
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (window.confirm(`Are you sure you want to delete item ${itemId}? This action cannot be undone.`)) {
      try {
        await itemsApi.deleteItem(itemId);
        setActionMessage(`Item ${itemId} deleted successfully`);
        fetchItems();
        setTimeout(() => setActionMessage(''), 3000);
      } catch (err) {
        console.error('Failed to delete item:', err);
      }
    }
  };

  const filteredItems = items.filter((i) => {
    const matchesSearch =
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.itemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || i.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || i.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  if (loading) return <LoadingSpinner message="Loading all item records..." />;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Manage Item Records</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            View, edit status, or remove reported lost & found items.
          </p>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {actionMessage}
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-3 items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, name, location..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex gap-2 text-xs">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-700"
          >
            <option value="ALL">All Types</option>
            <option value="LOST">Lost Only</option>
            <option value="FOUND">Found Only</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-700"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="CLAIMED">Claimed</option>
            <option value="RETURNED">Returned</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Item ID</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Item Details</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Reporter</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr key={item.itemId} className="hover:bg-slate-50/80">
                  <td className="p-3.5 font-mono font-semibold text-slate-900">{item.itemId}</td>
                  <td className="p-3.5"><Badge status={item.type} type="type" /></td>
                  <td className="p-3.5">
                    <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                    <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" /> {item.location} • {item.reportedDate}
                    </p>
                  </td>
                  <td className="p-3.5 font-medium text-slate-700">{item.category}</td>
                  <td className="p-3.5">
                    <p className="font-medium text-slate-900">{item.reporterName}</p>
                    <p className="text-slate-400 text-[11px] font-mono">{item.reporterContact}</p>
                  </td>
                  <td className="p-3.5">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.itemId, e.target.value)}
                      className="bg-slate-50 border border-slate-300 rounded-md px-2 py-1 text-xs font-medium text-slate-800"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="CLAIMED">CLAIMED</option>
                      <option value="RETURNED">RETURNED</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleDeleteItem(item.itemId)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
