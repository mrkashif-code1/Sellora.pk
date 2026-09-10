import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MapPin, 
  Sparkles, 
  Eye, 
  Clock, 
  Phone, 
  MessageSquare, 
  Share2, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  Layers,
  Maximize2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/db';
import { ReportAdModal } from '../components/ReportAdModal';
import { AdCard } from '../components/AdCard';

export const AdDetailsPage: React.FC = () => {
  const { selectedAdId, navigateTo, currentUser, showToast, triggerRefresh } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isFullscreenImage, setIsFullscreenImage] = useState(false);

  // Increment ad views on mount
  useEffect(() => {
    if (selectedAdId) {
      dbService.incrementAdViews(selectedAdId);
      triggerRefresh();
    }
  }, [selectedAdId]);

  const ad = selectedAdId ? dbService.getAdById(selectedAdId) : undefined;
  const seller = ad ? dbService.getUserById(ad.sellerId) : undefined;
  const isFav = (currentUser && ad) ? dbService.isFavorite(currentUser.id, ad.id) : false;

  if (!ad) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Classified Ad Not Found</h2>
        <p className="text-sm text-slate-500">This ad may have been sold, removed, or the link is invalid.</p>
        <button
          onClick={() => navigateTo('browse')}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors"
        >
          Browse Active Ads
        </button>
      </div>
    );
  }

  const relatedAds = dbService.getAds({ category: ad.category })
    .filter(a => a.id !== ad.id && a.status === 'active')
    .slice(0, 4);

  const formattedPrice = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0
  }).format(ad.price).replace('PKR', 'Rs.');

  const handleFavoriteToggle = () => {
    if (!currentUser) {
      showToast('Please login to save favorite ads', 'info');
      navigateTo('login');
      return;
    }
    const added = dbService.toggleFavorite(currentUser.id, ad.id);
    showToast(added ? 'Saved to your favorites' : 'Removed from favorites');
    triggerRefresh();
  };

  const handleStartChat = () => {
    if (!currentUser) {
      showToast('Please login to chat with seller', 'info');
      navigateTo('login');
      return;
    }
    if (currentUser.id === ad.sellerId) {
      showToast('You are the seller of this ad', 'info');
      return;
    }
    const conv = dbService.startOrGetConversation(currentUser.id, ad.sellerId, ad);
    navigateTo('messages', { convId: conv.id });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Ad link copied to clipboard!');
    }
  };

  const cleanPhone = ad.sellerPhone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${ad.sellerName}, I am interested in your ad on Sellora: "${ad.title}" listed for ${formattedPrice}. Is it still available?`)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto no-scrollbar">
        <button onClick={() => navigateTo('home')} className="hover:text-emerald-600 font-medium">Home</button>
        <span>/</span>
        <button onClick={() => navigateTo('browse', { category: ad.category })} className="hover:text-emerald-600 font-medium">{ad.category}</button>
        {ad.subcategory && (
          <>
            <span>/</span>
            <span className="text-slate-600 font-medium">{ad.subcategory}</span>
          </>
        )}
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate max-w-xs">{ad.title}</span>
      </nav>

      {/* Main Grid: Gallery & Details on Left, Seller & Actions on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left 2 Columns: Gallery, Specs, Description */}
        <div className="lg:col-span-2 space-y-6">

          {/* Image Gallery */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs space-y-4">
            {/* Main Display Image */}
            <div className="relative aspect-16/10 sm:aspect-16/9 bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center group">
              <img
                src={ad.images[selectedImageIndex] || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80'}
                alt={ad.title}
                className="max-h-full max-w-full object-contain select-none cursor-pointer"
                onClick={() => setIsFullscreenImage(true)}
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                {ad.isFeatured && (
                  <span className="bg-amber-500 text-slate-950 font-black text-xs uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-slate-950" /> Featured Ad
                  </span>
                )}
                <span className="bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                  {ad.condition}
                </span>
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullscreenImage(true)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-xs transition-colors"
                title="View Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Image Prev/Next Navigation Controls */}
              {ad.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex(prev => (prev === 0 ? ad.images.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-xs transition-all active:scale-90 opacity-80 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex(prev => (prev === ad.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-xs transition-all active:scale-90 opacity-80 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Counter */}
              <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md font-medium">
                {selectedImageIndex + 1} / {ad.images.length} Photos
              </div>
            </div>

            {/* Thumbnail Strip */}
            {ad.images.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {ad.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImageIndex === idx ? 'border-emerald-600 scale-102 shadow-xs' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ad Overview Card (Mobile & Desktop) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {ad.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Posted {new Date(ad.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{ad.views} views</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display leading-snug">
                {ad.title}
              </h1>

              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{ad.locality ? `${ad.locality}, ` : ''}{ad.city}, Pakistan</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 font-semibold block">Asking Price</span>
                <span className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
                  {formattedPrice}
                </span>
              </div>
              <div>
                {ad.isNegotiable ? (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg">
                    Price Negotiable
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg">
                    Fixed Price
                  </span>
                )}
              </div>
            </div>

            {/* Specifications (if any) */}
            {ad.specifications && Object.keys(ad.specifications).length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  Overview & Key Specifications
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(ad.specifications).map(([k, v]) => (
                    <div key={k} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[11px] text-slate-400 font-medium block truncate">{k}</span>
                      <span className="text-xs font-bold text-slate-800 block truncate mt-0.5">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Seller's Description
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {ad.description}
              </p>
            </div>

            {/* Safety Tips Banner */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold text-slate-900 block">Sellora Safety Advisory for Pakistan:</strong>
                <p className="text-slate-600 leading-relaxed">
                  Never pay advance deposits via Easypaisa or JazzCash before seeing the product in person. Meet in busy public places like shopping malls or bank branches during daytime.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Seller Profile, Contact Actions, Report */}
        <div className="space-y-6">

          {/* Seller Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <img
                src={seller?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80'}
                alt={ad.sellerName}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/30"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-slate-900 text-base">{ad.sellerName}</h3>
                  {seller?.isVerified && (
                    <span title="Verified Seller">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{seller?.rating || '4.9'}</span>
                  <span className="text-slate-400 font-normal">({seller?.reviewsCount || 24} reviews)</span>
                </div>
                <span className="text-[11px] text-slate-400 block">
                  Member on Sellora since {seller?.createdAt ? new Date(seller.createdAt).getFullYear() : '2025'}
                </span>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="space-y-3">
              {/* Chat Button */}
              <button
                onClick={handleStartChat}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Seller</span>
              </button>

              {/* Call Seller (Show Number) */}
              {showPhone ? (
                <a
                  href={`tel:${cleanPhone}`}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>{ad.sellerPhone} (Call Now)</span>
                </a>
              ) : (
                <button
                  onClick={() => setShowPhone(true)}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-200"
                >
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span>Show Phone Number</span>
                </button>
              )}

              {/* WhatsApp Direct */}
              {ad.whatsappEnabled && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 border border-emerald-500/30 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>WhatsApp Seller Direct</span>
                </a>
              )}
            </div>

            {/* Utility buttons: Favorite & Share */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={handleFavoriteToggle}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                  isFav
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isFav ? 'Favorited' : 'Save Ad'}</span>
              </button>

              <button
                onClick={handleShare}
                className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Report Ad button */}
            <div className="text-center pt-2">
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="text-xs text-slate-400 hover:text-rose-600 font-medium inline-flex items-center gap-1 transition-colors"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Report this suspicious ad</span>
              </button>
            </div>
          </div>

          {/* Ad Location Mini Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" /> Ad Location
            </h4>
            <div>
              <p className="text-sm font-bold text-slate-900">{ad.locality ? `${ad.locality}, ` : ''}{ad.city}</p>
              <p className="text-xs text-slate-500 mt-0.5">Pakistan</p>
            </div>
          </div>
        </div>

      </div>

      {/* Related Ads Section */}
      {relatedAds.length > 0 && (
        <section className="pt-8 border-t border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 font-display">
              Related Ads in {ad.category}
            </h3>
            <button
              onClick={() => navigateTo('browse', { category: ad.category })}
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              See More
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedAds.map(item => (
              <AdCard key={item.id} ad={item} />
            ))}
          </div>
        </section>
      )}

      {/* Report Modal */}
      <ReportAdModal
        adId={ad.id}
        adTitle={ad.title}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Fullscreen Lightbox Modal */}
      {isFullscreenImage && (
        <div 
          onClick={() => setIsFullscreenImage(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <img
            src={ad.images[selectedImageIndex]}
            alt={ad.title}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
          />
          <button 
            onClick={() => setIsFullscreenImage(false)}
            className="absolute top-6 right-6 text-white text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl font-bold"
          >
            Close ✕
          </button>
        </div>
      )}
    </div>
  );
};
