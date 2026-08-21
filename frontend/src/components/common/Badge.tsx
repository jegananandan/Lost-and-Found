import React from 'react';

interface BadgeProps {
  status: string;
  type?: 'type' | 'status';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, type = 'status', className = '' }) => {
  let colorStyle = 'bg-slate-100 text-slate-700 border-slate-200';

  if (type === 'type') {
    if (status === 'LOST') {
      colorStyle = 'bg-rose-50 text-rose-700 border-rose-200 font-semibold';
    } else if (status === 'FOUND') {
      colorStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold';
    }
  } else {
    switch (status) {
      case 'ACTIVE':
        colorStyle = 'bg-blue-50 text-blue-700 border-blue-200';
        break;
      case 'CLAIMED':
        colorStyle = 'bg-purple-50 text-purple-700 border-purple-200';
        break;
      case 'RETURNED':
        colorStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        break;
      case 'PENDING':
        colorStyle = 'bg-amber-50 text-amber-700 border-amber-200';
        break;
      case 'APPROVED':
        colorStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        break;
      case 'REJECTED':
        colorStyle = 'bg-rose-50 text-rose-700 border-rose-200';
        break;
      case 'CLOSED':
        colorStyle = 'bg-slate-100 text-slate-600 border-slate-200';
        break;
      default:
        colorStyle = 'bg-slate-100 text-slate-700 border-slate-200';
    }
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border ${colorStyle} ${className}`}>
      {status}
    </span>
  );
};
