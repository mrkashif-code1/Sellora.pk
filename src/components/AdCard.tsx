import React from 'react';
import { Heart, MapPin, Sparkles, Clock, Eye, ShieldCheck } from 'lucide-react';
import { Ad } from '../types';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/db';

interface AdCardProps {
  ad: Ad;
  viewMode?: 'grid' | 'list';
}

export const AdCard: React.FC<AdCardProps> = ({ ad, viewMode = 'grid' }) => {
  const { currentUser, navigateTo, showToast, triggerRefresh } = useApp();

  const isFav = currentUser ? dbService.isFavorite(currentUser.id, ad.id) : false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      showToast('Please login to save favorite ads', 'info');
      navigateTo('login');
      return;
    }
    const added = dbService.toggleFavorite(currentUser.id, ad.id);
    showToast(added ? 'Saved to your favorites' : 'Removed from favorites');
    triggerRefresh();
  };

  const formattedPrice = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0
  }).format(ad.price).replace('PKR', 'Rs.');

  // Time ago format
  const getTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => navigateTo('ad-details', { adId: ad.id })}
        className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/40 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col sm:flex-row p-3 gap-4"
      >
        {/* Image */}
        <div className="relative w-full sm:w-56 h-48 sm:h-auto rounded-xl overflow-hidden bg-slate-100 shrink-0">
          <img
            src={ad.images[0] || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=400&q=80'}
            alt={ad.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {ad.isFeatured && (
            <span className="absolute top-2.5 left-2.5 bg-amber-500 text-slate-900 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <Sparkles className="w-2.5 h-2.5 fill-slate-900" /> Featured
            </span>
          )}
          <span className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
            {ad.condition}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                {ad.category} {ad.subcategory ? `• ${ad.subcategory}` : ''}
              </span>
              <button
                onClick={handleFavoriteClick}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-rose-500 transition-colors"
                title={isFav ? 'Remove Favorite' : 'Add to Favorites'}
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-emerald-600 transition-colors line-clamp-1 mt-0.5">
              {ad.title}
            </h3>

            <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
              {ad.description}
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-slate-900 font-display">
                  {formattedPrice}
                </span>
                {ad.isNegotiable && (
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Negotiable
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {ad.locality ? `${ad.locality}, ` : ''}{ad.city}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {getTimeAgo(ad.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout (Default)
  return (
    <div
      onClick={() => navigateTo('ad-details', { adId: ad.id })}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/40 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Thumbnail Image Container */}
        <div className="relative w-full aspect-4/3 overflow-hidden bg-slate-100">
          <img
            src={ad.images[0] || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=400&q=80'}
            alt={ad.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
            {ad.isFeatured && (
              <span className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                <Sparkles className="w-2.5 h-2.5 fill-slate-950" /> Featured
              </span>
            )}
            <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-xs">
              {ad.condition}
            </span>
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-slate-600 hover:text-rose-500 shadow-md transition-all active:scale-90"
            title={isFav ? 'Remove Favorite' : 'Save Ad'}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          {/* Views badge */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900/60 backdrop-blur-xs text-white text-[10px] font-medium">
            <Eye className="w-3 h-3 text-slate-300" />
            <span>{ad.views || 0}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3.5">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-emerald-600 uppercase tracking-wider text-[11px] truncate max-w-[150px]">
              {ad.category}
            </span>
            <span className="text-[11px] text-slate-400">
              {getTimeAgo(ad.createdAt)}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
              {formattedPrice}
            </span>
            {ad.isNegotiable && (
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                Nego
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-800 text-sm group-hover:text-emerald-600 transition-colors line-clamp-2 mt-1 min-h-[2.5rem]">
            {ad.title}
          </h3>
        </div>
      </div>

      {/* Footer / Location */}
      <div className="px-3.5 pb-3 pt-1 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1 font-medium truncate max-w-[180px]">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{ad.locality ? `${ad.locality}, ` : ''}{ad.city}</span>
        </span>
        <span className="text-[11px] text-emerald-600 font-semibold shrink-0">
          Verified
        </span>
      </div>
    </div>
  );
};
