import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Star, 
  Eye, 
  Calendar, 
  Edit3, 
  ShieldCheck, 
  ListOrdered, 
  Heart,
  Save
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { dbService, PAKISTAN_CITIES } from '../services/db';

export const UserProfilePage: React.FC = () => {
  const { currentUser, setCurrentUser, navigateTo, showToast, triggerRefresh } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [city, setCity] = useState(currentUser?.city || 'Lahore');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Please Sign In</h2>
        <p className="text-xs text-slate-500">You need to sign in to access your profile settings.</p>
        <button
          onClick={() => navigateTo('login')}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const userAds = dbService.getAds().filter(a => a.sellerId === currentUser.id);
  const activeAdsCount = userAds.filter(a => a.status === 'active').length;
  const totalViews = userAds.reduce((acc, a) => acc + (a.views || 0), 0);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = dbService.updateUser(currentUser.id, {
      name,
      phone,
      city,
      bio,
      avatar
    });
    if (updated) {
      setCurrentUser(updated);
      setIsEditing(false);
      showToast('Profile updated successfully!');
      triggerRefresh();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Cover Banner */}
        <div className="h-36 bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 relative">
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full">
              {currentUser.role === 'admin' ? '🛡️ Admin Account' : 'Verified Member'}
            </span>
          </div>
        </div>

        {/* User Info Bar */}
        <div className="px-6 sm:px-8 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-4">
            <div className="relative inline-block">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white shadow-lg bg-white"
              />
              <span className="absolute bottom-1 right-1 p-1 bg-emerald-600 text-white rounded-full ring-2 ring-white">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={() => navigateTo('post-ad')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                + Post New Ad
              </button>
            </div>
          </div>

          {!isEditing ? (
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-slate-900 font-display">{currentUser.name}</h1>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Verified Seller
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
                  {currentUser.bio || 'Active trader and community member on Sellora Pakistan.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {currentUser.city}, Pakistan
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {currentUser.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {currentUser.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Member since {currentUser.createdAt}
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">City</label>
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-sm"
                  >
                    {PAKISTAN_CITIES.filter(c => c !== 'All Cities').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Avatar Image URL</label>
                  <input
                    type="text"
                    value={avatar}
                    onChange={e => setAvatar(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Bio / Shop Info</label>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-sm resize-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
          <span className="text-2xl font-black text-slate-900 font-display">{activeAdsCount}</span>
          <span className="text-xs text-slate-500 font-medium block">Active Classifieds</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
          <span className="text-2xl font-black text-slate-900 font-display">{totalViews}</span>
          <span className="text-xs text-slate-500 font-medium block">Total Ad Impressions</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-2xl font-black text-slate-900 font-display">
            <span>{currentUser.rating}</span>
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-xs text-slate-500 font-medium block">{currentUser.reviewsCount} Positive Reviews</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
          <span className="text-2xl font-black text-emerald-600 font-display">100%</span>
          <span className="text-xs text-slate-500 font-medium block">Response Rate</span>
        </div>
      </div>

      {/* Verification & Trust Badges */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Trust & Identity Verification
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Phone Verified</span>
              <span className="text-[11px] text-emerald-700">{currentUser.phone}</span>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Email Verified</span>
              <span className="text-[11px] text-emerald-700">{currentUser.email}</span>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">NADRA CNIC Check</span>
              <span className="text-[11px] text-emerald-700">Matched with SIM</span>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Quick Navigation Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div 
          onClick={() => navigateTo('my-ads')}
          className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-emerald-500/60 shadow-xs cursor-pointer flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ListOrdered className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Manage My Ads ({userAds.length})</h4>
              <p className="text-xs text-slate-500">Edit, boost, or mark items as sold</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600">Open →</span>
        </div>

        <div 
          onClick={() => navigateTo('favorites')}
          className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-rose-500/60 shadow-xs cursor-pointer flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Saved Favorites</h4>
              <p className="text-xs text-slate-500">Check ads you have bookmarked</p>
            </div>
          </div>
          <span className="text-xs font-bold text-rose-600">Open →</span>
        </div>
      </div>

    </div>
  );
};
