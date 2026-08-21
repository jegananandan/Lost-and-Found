import React from 'react';
import { SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionLink?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = "We couldn't find any items matching your criteria. Try adjusting your search filters.",
  actionText,
  actionLink,
  icon = <SearchX className="w-12 h-12 text-slate-400" />
}) => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-200 rounded-xl my-6">
    <div className="p-4 bg-slate-50 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    <p className="text-slate-500 text-sm max-w-md mt-1.5 leading-relaxed">{description}</p>
    {actionText && actionLink && (
      <Link to={actionLink} className="btn-primary mt-5 text-sm">
        {actionText}
      </Link>
    )}
  </div>
);
