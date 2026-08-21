import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import { Claim } from '../../types';
import { Badge } from '../../components/common/Badge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ShieldCheck, CheckCircle, XCircle, Calendar, User, FileText } from 'lucide-react';

export const AdminClaimsPage: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getAllClaims();
      setClaims(response.data);
    } catch (err) {
      console.error('Failed to load admin claims:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (claimId: number) => {
    try {
      await adminApi.approveClaim(claimId);
      setActionMessage(`✓ Claim #${claimId} APPROVED. Item status updated to CLAIMED.`);
      fetchClaims();
      setTimeout(() => setActionMessage(''), 4000);
    } catch (err) {
      console.error('Failed to approve claim:', err);
    }
  };

  const handleReject = async (claimId: number) => {
    try {
      await adminApi.rejectClaim(claimId);
      setActionMessage(`Claim #${claimId} REJECTED.`);
      fetchClaims();
      setTimeout(() => setActionMessage(''), 4000);
    } catch (err) {
      console.error('Failed to reject claim:', err);
    }
  };

  if (loading) return <LoadingSpinner message="Loading claim requests..." />;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Claim Request Verification</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Review student ownership proofs and approve or reject claim requests.
        </p>
      </div>

      {actionMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl font-medium flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          {actionMessage}
        </div>
      )}

      {/* Claims List */}
      <div className="space-y-4">
        {claims.length === 0 ? (
          <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center text-slate-500">
            No claim requests submitted in the system.
          </div>
        ) : (
          claims.map((claim) => (
            <div key={claim.claimId} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <Badge status={claim.status} type="status" className="font-bold" />
                  <span className="text-xs text-slate-400 font-mono">Claim ID: #{claim.claimId}</span>
                  <span className="text-xs text-slate-400 font-mono">• Item ID: {claim.itemId}</span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {claim.item?.name || `Claim for Found Item ${claim.itemId}`}
                  </h3>
                  {claim.item && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      Category: {claim.item.category} • Found Location: {claim.item.location}
                    </p>
                  )}
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                  <span className="font-semibold text-slate-700 block">Claimant Details & Proof Note:</span>
                  <div className="flex flex-wrap gap-4 text-slate-600 pb-1">
                    <span className="flex items-center gap-1 font-medium"><User className="w-3.5 h-3.5 text-slate-400" /> {claim.claimantName}</span>
                    <span>• {claim.claimantEmail}</span>
                    <span>• Phone: {claim.claimantPhone}</span>
                  </div>
                  <p className="text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200 italic">
                    "{claim.note || 'No verification note provided.'}"
                  </p>
                </div>
              </div>

              {/* Action Buttons for Pending Claims */}
              {claim.status === 'PENDING' ? (
                <div className="flex md:flex-col gap-2 shrink-0 w-full md:w-auto">
                  <button
                    onClick={() => handleApprove(claim.claimId)}
                    className="btn-primary text-xs bg-emerald-600 hover:bg-emerald-700 w-full"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve Claim
                  </button>
                  <button
                    onClick={() => handleReject(claim.claimId)}
                    className="btn-secondary text-xs hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 w-full"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject Claim
                  </button>
                </div>
              ) : (
                <div className="text-xs text-slate-400 font-medium text-right shrink-0">
                  Reviewed & Closed
                </div>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
};
