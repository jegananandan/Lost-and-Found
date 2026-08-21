import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../../types';
import { Badge } from './Badge';
import { MapPin, Calendar, ArrowRight, Tag } from 'lucide-react';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const defaultImage = item.type === 'LOST' 
    ? 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80'
    : 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80';

  return (
    <div className="college-card overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform duration-200">
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={item.imageUrl || defaultImage}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge status={item.type} type="type" />
          <Badge status={item.status} type="status" />
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium shadow-sm flex items-center gap-1">
          <Tag className="w-3 h-3 text-blue-600" />
          {item.category}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-slate-900 text-lg group-hover:text-blue-700 transition-colors line-clamp-1">
            {item.name}
          </h3>
          <p className="text-slate-600 text-sm mt-1.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex items-center text-xs text-slate-500 gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center text-xs text-slate-500 gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{item.reportedDate}</span>
            </div>

            <Link
              to={`/items/${item.itemId}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 hover:underline"
            >
              View Details
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
