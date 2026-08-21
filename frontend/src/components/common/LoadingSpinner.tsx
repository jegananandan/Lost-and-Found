import React from 'react';

export const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading lost & found records...' }) => (
  <div className="flex flex-col items-center justify-center py-16 text-slate-500">
    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin"></div>
    <p className="mt-4 text-sm font-medium">{message}</p>
  </div>
);

export const SkeletonCard: React.FC = () => (
  <div className="college-card overflow-hidden animate-pulse">
    <div className="bg-slate-200 h-44 w-full"></div>
    <div className="p-5 space-y-3">
      <div className="h-5 bg-slate-200 rounded w-3/4"></div>
      <div className="h-4 bg-slate-200 rounded w-full"></div>
      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
      <div className="pt-3 border-t border-slate-100 flex justify-between">
        <div className="h-3 bg-slate-200 rounded w-1/3"></div>
        <div className="h-3 bg-slate-200 rounded w-1/4"></div>
      </div>
    </div>
  </div>
);
