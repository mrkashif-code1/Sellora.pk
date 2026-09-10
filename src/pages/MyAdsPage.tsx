import React, { useState } from 'react';
import { 
  PlusCircle, 
  Trash2, 
  CheckCircle, 
  Sparkles, 
  Eye, 
  ExternalLink, 
  Clock, 
  AlertCircle,
  MapPin,
  Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/db';
import { AdStatus } from '../types';

export const MyAdsPage: React.FC = () => {
  const { currentUser, navigateTo, showToast, triggerRefresh } = useApp();
  const [filterStatus, setFilterStatus] = useState<AdStatus | 'all'>('all');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Please Sign In</h2>
        <p className="text-xs text-slate-500">You must be logged in to view your classified ads.</p>
        <button
          onClick={() => navigateTo('login')}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl"
        >
          Sign In
        </button>
      </div>
    );
  }

  const allUserAds = dbService.getAds().filter(a => a.sellerId === currentUser.id);

  const displayedAds = allUserAds.filter(a => {
    if (filterStatus === 'all') return true;
    return a.status === filterStatus;
  });

  const handleToggleSold = (id: string, currentStatus: AdStatus) => {
    const newStatus = currentStatus === 'sold' ? 'active' : 'sold';
    dbService.updateAd(id, { status: newStatus });
    showToast(newStatus === 'sold' ? 'Ad marked as SOLD! Congratulations!' : 'Ad reactivated to active marketplace.');
    triggerRefresh();
  };

  const handleToggleFeatured = (id: string, currentFeatured: boolean) => {
    dbService.updateAd(id, { isFeatured: !currentFeatured });
    showToast(!currentFeatured ? '🌟 Ad featured on Sellora homepage!' : 'Featured status removed.');
    triggerRefresh();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this ad? This action cannot be undone.')) {
      dbService.deleteAd(id);
      showToast('Classified ad deleted successfully', 'info');
      triggerRefresh();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            My Classified Ads
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your listings, edit information, mark items as sold, or boost visibility.
          </p>
        </div>

        <button
          onClick={() => navigateTo('post-ad')}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-md flex items-center justify-center gap-1.5 self-start sm:self-auto transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Ad</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl w-fit text-xs font-bold">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            filterStatus === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          All ({allUserAds.length})
        </button>
        <button
          onClick={() => setFilterStatus('active')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            filterStatus === 'active' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Active ({allUserAds.filter(a => a.status === 'active').length})
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            filterStatus === 'pending' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Pending Review ({allUserAds.filter(a => a.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilterStatus('sold')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            filterStatus === 'sold' ? 'bg-white text-slate-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Sold ({allUserAds.filter(a => a.status === 'sold').length})
        </button>
      </div>

      {/* Ads List */}
      {displayedAds.length > 0 ? (
        <div className="space-y-3">
          {displayedAds.map(ad => {
            const formattedPrice = new Intl.NumberFormat('en-PK', {
              style: 'currency',
              currency: 'PKR',
              maximumFractionDigits: 0
            }).format(ad.price).replace('PKR', 'Rs.');

            return (
              <div 
                key={ad.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
              >
                {/* Thumbnail & Info */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={ad.images[0] || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=400&q=80'}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                    {ad.isFeatured && (
                      <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 font-black text-[9px] uppercase px-1.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                        ad.status === 'active' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : ad.status === 'pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {ad.status === 'sold' ? 'Sold Out' : ad.status}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {ad.category}
                      </span>
                    </div>

                    <h3 
                      onClick={() => navigateTo('ad-details', { adId: ad.id })}
                      className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors truncate cursor-pointer max-w-md"
                    >
                      {ad.title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="font-extrabold text-slate-900 font-display">
                        {formattedPrice}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {ad.views || 0} views
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {ad.city}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions Toolbar */}
                <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-none border-slate-100 w-full sm:w-auto justify-end">
                  {/* View Details */}
                  <button
                    onClick={() => navigateTo('ad-details', { adId: ad.id })}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                    title="View Ad"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  {/* Toggle Featured */}
                  <button
                    onClick={() => handleToggleFeatured(ad.id, ad.isFeatured)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                      ad.isFeatured 
                        ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                        : 'bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-600'
                    }`}
                    title="Feature this ad"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{ad.isFeatured ? 'Featured' : 'Boost'}</span>
                  </button>

                  {/* Mark as Sold */}
                  <button
                    onClick={() => handleToggleSold(ad.id, ad.status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                      ad.status === 'sold'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{ad.status === 'sold' ? 'Mark Active' : 'Mark Sold'}</span>
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(ad.id)}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete Ad"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Tag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">No ads listed under this status</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't posted any classified ads yet, or no ads match the selected tab.
            </p>
          </div>
          <button
            onClick={() => navigateTo('post-ad')}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl"
          >
            Post Your First Classified Ad
          </button>
        </div>
      )}
    </div>
  );
};
