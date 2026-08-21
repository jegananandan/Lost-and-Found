import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { Item } from '../../types';
import { claimsApi } from '../../services/api';

interface ClaimModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({ item, isOpen, onClose, onSuccess }) => {
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await claimsApi.submitClaim({
        itemId: item.itemId,
        note: note.trim(),
      });
      setLoading(false);
      onSuccess();
      onClose();
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || 'Failed to submit claim request');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-lg">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            Claim This Item
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex gap-3 items-center">
            <div className="w-12 h-12 bg-slate-200 rounded-md overflow-hidden shrink-0">
              <img src={item.imageUrl || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=200&q=80'} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-sm">{item.name}</p>
              <p className="text-xs text-slate-500">{item.itemId} • {item.category} • {item.location}</p>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Proof of Ownership / Identifiable Note
            </label>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Describe unique marks, serial numbers, wallpaper, contents inside, or date lost to verify ownership with campus security..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              Your claim will be reviewed by campus administrators before item release.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary text-sm"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary text-sm"
              disabled={loading}
            >
              {loading ? 'Submitting Claim...' : 'Confirm & Submit Claim'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
