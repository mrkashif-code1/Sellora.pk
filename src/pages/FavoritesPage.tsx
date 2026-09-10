import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/db';
import { AdCard } from '../components/AdCard';

export const FavoritesPage: React.FC = () => {
  const { currentUser, navigateTo } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Please Sign In</h2>
        <p className="text-xs text-slate-500">Sign in to view and manage your saved classified ads.</p>
        <button
          onClick={() => navigateTo('login')}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl"
        >
          Sign In
        </button>
      </div>
    );
  }

  const favorites = dbService.getFavorites(currentUser.id);
  const allAds = dbService.getAds();
  const favoriteAds = favorites
    .map(f => allAds.find(a => a.id === f.adId))
    .filter((a): a is typeof allAds[0] => a !== undefined);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display flex items-center gap-2.5">
          <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
          Saved Classifieds ({favoriteAds.length})
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Items you have saved to monitor price drops or contact the seller later.
        </p>
      </div>

      {favoriteAds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteAds.map(ad => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">No Saved Ads Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tap the heart icon on any classified ad to save it here for quick access.
            </p>
          </div>
          <button
            onClick={() => navigateTo('browse')}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl inline-flex items-center gap-2"
          >
            <span>Explore Ads Across Pakistan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
