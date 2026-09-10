import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Users, 
  Layers, 
  Sparkles, 
  Eye, 
  Ban, 
  Search,
  ExternalLink,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { dbService, CATEGORIES_DATA } from '../services/db';
import { Ad, User } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { currentUser, navigateTo, showToast, triggerRefresh } = useApp();
  const [activeTab, setActiveTab] = useState<'ads' | 'reports' | 'users' | 'categories'>('ads');
  const [searchQuery, setSearchQuery] = useState('');

  // Protect or give admin switch option
  const isAdmin = currentUser?.role === 'admin';

  const allAds = dbService.getAds();
  const allUsers = dbService.getAllUsers();
  const allReports = dbService.getReports();

  const totalViews = allAds.reduce((acc, a) => acc + (a.views || 0), 0);
  const pendingReports = allReports.filter(r => r.status === 'pending');

  const handleApproveAd = (adId: string) => {
    dbService.updateAd(adId, { status: 'active' });
    showToast('Ad approved and published live!');
    triggerRefresh();
  };

  const handleRejectAd = (adId: string) => {
    dbService.updateAd(adId, { status: 'rejected' });
    showToast('Ad rejected due to policy violations', 'info');
    triggerRefresh();
  };

  const handleDeleteAd = (adId: string) => {
    if (window.confirm('Delete this classified ad permanently?')) {
      dbService.deleteAd(adId);
      showToast('Ad removed from marketplace');
      triggerRefresh();
    }
  };

  const handleToggleFeature = (adId: string, current: boolean) => {
    dbService.updateAd(adId, { isFeatured: !current });
    showToast(!current ? 'Ad featured on homepage' : 'Feature badge removed');
    triggerRefresh();
  };

  const handleResolveReport = (reportId: string, action: 'resolved' | 'dismissed', adId: string) => {
    dbService.resolveReport(reportId, action);
    if (action === 'resolved') {
      dbService.deleteAd(adId);
      showToast('Report resolved: Violating ad was removed from Sellora');
    } else {
      showToast('Report dismissed as non-violating', 'info');
    }
    triggerRefresh();
  };

  const handleToggleUserSuspension = (user: User) => {
    const newStatus = !user.isSuspended;
    dbService.updateUser(user.id, { isSuspended: newStatus });
    showToast(newStatus ? `User ${user.name} has been suspended` : `User ${user.name} suspension lifted`);
    triggerRefresh();
  };

  const handleToggleUserVerification = (user: User) => {
    const newStatus = !user.isVerified;
    dbService.updateUser(user.id, { isVerified: newStatus });
    showToast(newStatus ? `User ${user.name} verified` : `Verification removed`);
    triggerRefresh();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Admin Top Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider">
                Admin Center
              </span>
              <span className="text-xs text-slate-400">Sellora Trust & Safety Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
              Marketplace Operations & Moderation
            </h1>
            <p className="text-xs text-slate-400 max-w-xl">
              Monitor classified listings, respond to fraud alerts, manage Pakistani merchant verifications, and enforce community standards.
            </p>
          </div>

          {!isAdmin && (
            <div className="bg-amber-500/20 border border-amber-500/40 p-3 rounded-2xl text-xs space-y-2 max-w-xs">
              <p className="text-amber-300 font-semibold">
                You are currently viewing in Preview Mode. Click below to switch to the Admin profile.
              </p>
              <button
                onClick={() => {
                  const adminUser = dbService.loginUser('admin@sellora.pk');
                  if (adminUser) triggerRefresh();
                }}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors"
              >
                Switch to Kashif Admin
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Ads</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900 font-display">{allAds.length}</span>
            <span className="text-xs font-bold text-emerald-600">{allAds.filter(a => a.status === 'active').length} active</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Reported Ads</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-rose-600 font-display">{pendingReports.length}</span>
            <span className="text-xs font-semibold text-slate-400">Pending review</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Registered Users</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900 font-display">{allUsers.length}</span>
            <span className="text-xs font-semibold text-emerald-600">100% verified</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Ad Views</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900 font-display">{totalViews}</span>
            <span className="text-xs font-semibold text-slate-400">Across Pakistan</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar text-xs font-bold">
        <button
          onClick={() => setActiveTab('ads')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'ads'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Classified Ads ({allAds.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'reports'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span>Reported Ads ({pendingReports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'users'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Accounts ({allUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'categories'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Categories ({CATEGORIES_DATA.length})</span>
        </button>
      </div>

      {/* Tab 1: Ads Moderation */}
      {activeTab === 'ads' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filter by title or seller..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Ad Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Seller</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allAds
                  .filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.sellerName.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(ad => (
                    <tr key={ad.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={ad.images[0] || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=150&q=80'}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <span 
                              onClick={() => navigateTo('ad-details', { adId: ad.id })}
                              className="font-bold text-slate-900 hover:text-emerald-600 cursor-pointer block max-w-xs truncate"
                            >
                              {ad.title}
                            </span>
                            <span className="text-[10px] text-slate-400">{ad.city} • {ad.views || 0} views</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-slate-600 font-medium">
                        {ad.category}
                      </td>

                      <td className="px-4 py-3.5 font-bold text-slate-900 font-display">
                        Rs. {ad.price.toLocaleString('en-PK')}
                      </td>

                      <td className="px-4 py-3.5 text-slate-700">
                        {ad.sellerName}
                      </td>

                      <td className="px-4 py-3.5">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          ad.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : ad.status === 'pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {ad.status}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                        {ad.status !== 'active' && (
                          <button
                            onClick={() => handleApproveAd(ad.id)}
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                            title="Approve Ad"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}

                        {ad.status !== 'rejected' && (
                          <button
                            onClick={() => handleRejectAd(ad.id)}
                            className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700"
                            title="Reject Ad"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => handleToggleFeature(ad.id, ad.isFeatured)}
                          className={`p-1.5 rounded-lg ${
                            ad.isFeatured ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                          }`}
                          title="Toggle Featured"
                        >
                          <Sparkles className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteAd(ad.id)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-700"
                          title="Delete Ad"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Report Requests */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">User Flagged Ads & Policy Reports</h3>
          </div>

          <div className="divide-y divide-slate-100">
            {allReports.length > 0 ? (
              allReports.map(report => (
                <div key={report.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold text-[10px] uppercase border border-rose-200">
                        {report.reason}
                      </span>
                      <span className="text-xs text-slate-400">
                        Reported {new Date(report.createdAt).toLocaleDateString()} by {report.reporterName}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        report.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {report.status}
                      </span>
                    </div>

                    <h4 
                      onClick={() => navigateTo('ad-details', { adId: report.adId })}
                      className="font-bold text-slate-900 hover:text-emerald-600 text-sm cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Ad: {report.adTitle}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </h4>

                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-w-xl">
                      "{report.details || 'No additional details provided by reporter.'}"
                    </p>
                  </div>

                  {report.status === 'pending' && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleResolveReport(report.id, 'dismissed', report.adId)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                      >
                        Dismiss Report
                      </button>
                      <button
                        onClick={() => handleResolveReport(report.id, 'resolved', report.adId)}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs"
                      >
                        Remove Ad (Take Down)
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <p className="text-xs">No pending report inquiries.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: User Management */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">User Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">City & Phone</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <span className="font-bold text-slate-900 block">{user.name}</span>
                          <span className="text-[10px] text-slate-400">Rating {user.rating} ★</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-slate-600">{user.email}</td>

                    <td className="px-4 py-3.5 text-slate-600">
                      {user.city} • {user.phone}
                    </td>

                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      {user.isSuspended ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-100 text-rose-800">
                          Suspended
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                          Active
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleToggleUserVerification(user)}
                        className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                          user.isVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {user.isVerified ? 'Verified ✓' : 'Verify'}
                      </button>

                      <button
                        onClick={() => handleToggleUserSuspension(user)}
                        className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                          user.isSuspended ? 'bg-emerald-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                        }`}
                      >
                        {user.isSuspended ? 'Unban' : 'Suspend'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Categories Breakdown */}
      {activeTab === 'categories' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            Pakistan Classified Categories Breakdown
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORIES_DATA.map(c => {
              const count = allAds.filter(a => a.category === c.id).length;
              return (
                <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">{c.name}</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                      {count} ads
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {c.subcategories.map(sub => (
                      <span key={sub} className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
