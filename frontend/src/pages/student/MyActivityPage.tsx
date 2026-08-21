import React, { useState, useEffect } from 'react';
import { itemsApi, claimsApi } from '../../services/api';
import { Item, Claim } from '../../types';
import { Badge } from '../../components/common/Badge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { Link } from 'react-router-dom';
import { Clock, Package, ShieldCheck, MapPin, Calendar, FileText, ArrowRight } from 'lucide-react';

export const MyActivityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lost' | 'found' | 'claims'>('lost');
  const [myItems, setMyItems] = useState<Item[]>([]);
  const [myClaims, setMyClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const [itemsRes, claimsRes] = await Promise.all([
        itemsApi.getMyItems(),
        claimsApi.getMyClaims()
      ]);
      setMyItems(itemsRes.data);
      setMyClaims(claimsRes.data);
    } catch (err) {
      console.error('Failed to load user activity:', err);
    } finally {
      setLoading(false);
    }
  };

  const lostItems = myItems.filter(i => i.type === 'LOST');
  const foundItems = myItems.filter(i => i.type === 'FOUND');

  if (loading) return <LoadingSpinner message="Fetching your activity records..." />;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Activity & Claims</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Track your reported lost items, submitted found items, and claim request status.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-700">
          <button
            onClick={() => setActiveTab('lost')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'lost' ? 'bg-white text-rose-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            My Lost ({lostItems.length})
          </button>
          <button
            onClick={() => setActiveTab('found')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'found' ? 'bg-white text-emerald-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            My Found ({foundItems.length})
          </button>
          <button
            onClick={() => setActiveTab('claims')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'claims' ? 'bg-white text-blue-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            My Claims ({myClaims.length})
          </button>
        </div>
      </div>

      {/* TAB CONTENT: MY LOST ITEMS */}
      {activeTab === 'lost' && (
        <div className="space-y-4">
          {lostItems.length === 0 ? (
            <EmptyState
              title="No lost items reported yet"
              description="If you've misplaced something on campus, submit a report to search for matches."
              actionText="Report Lost Item"
              actionLink="/report-lost"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lostItems.map((item) => (
                <div key={item.itemId} className="college-card p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge status={item.type} type="type" />
                        <Badge status={item.status} type="status" />
                        <span className="text-xs font-mono text-slate-400">{item.itemId}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg">{item.name}</h3>
                    </div>
                    <Link to={`/items/${item.itemId}`} className="btn-secondary text-xs">
                      View Details →
                    </Link>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {item.reportedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: MY FOUND ITEMS */}
      {activeTab === 'found' && (
        <div className="space-y-4">
          {foundItems.length === 0 ? (
            <EmptyState
              title="No found items reported yet"
              description="Help students locate their lost property by submitting a report when you find something."
              actionText="Report Found Item"
              actionLink="/report-found"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foundItems.map((item) => (
                <div key={item.itemId} className="college-card p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge status={item.type} type="type" />
                        <Badge status={item.status} type="status" />
                        <span className="text-xs font-mono text-slate-400">{item.itemId}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg">{item.name}</h3>
                    </div>
                    <Link to={`/items/${item.itemId}`} className="btn-secondary text-xs">
                      View Details →
                    </Link>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.location}</span>
                    <span className="font-semibold text-blue-900">Stored at: {item.extraField2 || 'Security'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: MY CLAIMS */}
      {activeTab === 'claims' && (
        <div className="space-y-4">
          {myClaims.length === 0 ? (
            <EmptyState
              title="No claims submitted yet"
              description="When you identify a found item that belongs to you, submit a claim request to retrieve it."
              actionText="Search Found Items"
              actionLink="/items?type=FOUND"
            />
          ) : (
            <div className="space-y-3">
              {myClaims.map((claim) => (
                <div key={claim.claimId} className="college-card p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge status={claim.status} type="status" className="font-bold" />
                      <span className="text-xs text-slate-400 font-mono">Claim #{claim.claimId}</span>
                      <span className="text-xs text-slate-400">• Item ID: {claim.itemId}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">
                      {claim.item?.name || `Claim for Item ${claim.itemId}`}
                    </h3>
                    <p className="text-xs text-slate-600 max-w-xl">
                      <span className="font-semibold text-slate-700">Proof Note:</span> {claim.note || 'No note provided.'}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> Submitted: {claim.claimDate}</span>
                    </div>
                  </div>

                  {claim.itemId && (
                    <Link to={`/items/${claim.itemId}`} className="btn-secondary text-xs shrink-0">
                      View Item <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
