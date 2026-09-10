import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ChevronRight, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Users, 
  PlusCircle,
  Tag,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_DATA, PAKISTAN_CITIES, dbService } from '../services/db';
import { AdCard } from '../components/AdCard';
import { CategoryIcon } from '../components/CategoryIcon';
import { CategoryType } from '../types';

export const HomePage: React.FC = () => {
  const { navigateTo, selectedCity, setSelectedCity, currentUser } = useApp();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [latestFilter, setLatestFilter] = useState<'all' | 'mobiles' | 'vehicles' | 'deals'>('all');

  const allAds = dbService.getAds();
  const featuredAds = allAds.filter(a => a.isFeatured && a.status === 'active');
  
  // Filter latest ads
  const filteredLatestAds = allAds.filter(a => {
    if (a.status !== 'active') return false;
    if (latestFilter === 'mobiles') return a.category === 'Mobiles';
    if (latestFilter === 'vehicles') return a.category === 'Vehicles';
    if (latestFilter === 'deals') return a.price <= 50000;
    return true;
  }).slice(0, 8);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('browse', {
      keyword: searchKeyword,
      city: selectedCity,
      category: selectedCategory === 'All' ? undefined : selectedCategory
    });
  };

  const trendingSearches = ['iPhone 15', 'Civic Turbo', 'Alto VXR', 'DHA Lahore', 'MacBook M3', 'PS5', 'Cricket Bat'];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section with Original Design */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-10 pb-16 px-4 sm:px-6">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Pakistan's Most Trusted Classifieds
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display leading-tight">
            Buy & Sell Anything Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Pakistan</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Connect directly with verified buyers & sellers in Karachi, Lahore, Islamabad, and nationwide. Zero commissions, direct WhatsApp chat, and 100% free posting.
          </p>

          {/* Search Box Card */}
          <form 
            onSubmit={handleHeroSearch}
            className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/20 max-w-4xl mx-auto text-slate-800 flex flex-col md:flex-row gap-2.5"
          >
            {/* Location selector */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl border md:border-none border-slate-200 md:border-r md:border-slate-200 md:w-56 shrink-0">
              <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-hidden cursor-pointer"
              >
                {PAKISTAN_CITIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl border md:border-none border-slate-200 md:border-r md:border-slate-200 md:w-48 shrink-0">
              <Tag className="w-4 h-4 text-teal-600 shrink-0" />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value as any)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-hidden cursor-pointer"
              >
                <option value="All">All Categories</option>
                {CATEGORIES_DATA.map(c => (
                  <option key={c.id} value={c.id}>{c.name.split('&')[0]}</option>
                ))}
              </select>
            </div>

            {/* Search input */}
            <div className="flex-1 flex items-center px-3 py-2">
              <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                placeholder="What are you looking for? (e.g. iPhone, Civic, Flat)"
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 font-medium outline-hidden"
              />
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-7 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-extrabold shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>Search Ads</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Trending Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Trending in Pakistan:
            </span>
            {trendingSearches.map(term => (
              <button
                key={term}
                onClick={() => navigateTo('browse', { keyword: term })}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700/60 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-14">

        {/* 1. Category Grid (The 11 Categories) */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Browse by Market</span>
              <h2 className="text-2xl font-black text-slate-900 font-display">Explore Categories</h2>
            </div>
            <button 
              onClick={() => navigateTo('browse')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
            >
              View All <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {CATEGORIES_DATA.map(cat => (
              <div
                key={cat.id}
                onClick={() => navigateTo('browse', { category: cat.id })}
                className="group p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col items-center text-center justify-center gap-2.5"
              >
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white flex items-center justify-center transition-colors duration-200 shadow-xs">
                  <CategoryIcon category={cat.id} className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                    {cat.name.split('&')[0]}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {cat.count} listings
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Featured Ads Section */}
        {featuredAds.length > 0 && (
          <section className="bg-gradient-to-br from-amber-500/5 via-emerald-500/5 to-teal-500/5 p-6 sm:p-8 rounded-3xl border border-amber-200/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500 text-slate-950 shadow-xs">
                  <Sparkles className="w-5 h-5 fill-slate-950" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                    Featured Classifieds
                  </h2>
                  <p className="text-xs text-slate-500">Verified premier listings curated for quality</p>
                </div>
              </div>

              <button 
                onClick={() => navigateTo('browse')}
                className="text-xs font-bold text-slate-700 hover:text-emerald-600 flex items-center gap-1"
              >
                See All <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredAds.slice(0, 4).map(ad => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </section>
        )}

        {/* 3. Popular Categories Showcase */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Top Sectors</span>
              <h2 className="text-2xl font-black text-slate-900 font-display">Popular Categories in Pakistan</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mobiles Showcase */}
            <div 
              onClick={() => navigateTo('browse', { category: 'Mobiles' })}
              className="relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer h-64 flex flex-col justify-end p-6"
            >
              <img
                src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80"
                alt="Mobiles"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
              <div className="relative z-10 text-white space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500 text-white uppercase tracking-wider">
                  Hot Category
                </span>
                <h3 className="text-xl font-black font-display">Mobiles & Tablets</h3>
                <p className="text-xs text-slate-300">PTA approved iPhones, Samsung Galaxy, Pixels & accessories.</p>
              </div>
            </div>

            {/* Vehicles Showcase */}
            <div 
              onClick={() => navigateTo('browse', { category: 'Vehicles' })}
              className="relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer h-64 flex flex-col justify-end p-6"
            >
              <img
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
                alt="Vehicles"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
              <div className="relative z-10 text-white space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-teal-500 text-white uppercase tracking-wider">
                  High Demand
                </span>
                <h3 className="text-xl font-black font-display">Vehicles & Cars</h3>
                <p className="text-xs text-slate-300">Honda, Toyota, Suzuki, bikes and verified spare parts.</p>
              </div>
            </div>

            {/* Property Showcase */}
            <div 
              onClick={() => navigateTo('browse', { category: 'Property' })}
              className="relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer h-64 flex flex-col justify-end p-6"
            >
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
                alt="Property"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
              <div className="relative z-10 text-white space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 uppercase tracking-wider font-extrabold">
                  Prime Investments
                </span>
                <h3 className="text-xl font-black font-display">Real Estate & Homes</h3>
                <p className="text-xs text-slate-300">Houses, luxury apartments, and commercial plots in DHA & Bahria.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Latest Ads Section with Quick Filter Tabs */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Fresh Arrivals</span>
              <h2 className="text-2xl font-black text-slate-900 font-display">Latest Classifieds</h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs font-bold">
              <button
                onClick={() => setLatestFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  latestFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setLatestFilter('mobiles')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  latestFilter === 'mobiles' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Mobiles
              </button>
              <button
                onClick={() => setLatestFilter('vehicles')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  latestFilter === 'vehicles' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Vehicles
              </button>
              <button
                onClick={() => setLatestFilter('deals')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  latestFilter === 'deals' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Under Rs. 50K
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredLatestAds.map(ad => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigateTo('browse')}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold shadow-md transition-colors inline-flex items-center gap-2"
            >
              <span>Explore All {allAds.length}+ Ads</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* 5. Call-to-action Section: "Sell your product today" */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900 text-white p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              <Zap className="w-3.5 h-3.5" /> 100% Free • No Commission
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
              Sell Your Product Today on Sellora
            </h2>

            <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
              Have something to sell? Post your classified ad in under 2 minutes. Reach active buyers across Karachi, Lahore, Islamabad, and every Pakistani city.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-semibold text-emerald-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Verified Inquiries</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-300" />
                <span>Instant Ad Activation</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-300" />
                <span>Direct WhatsApp Deal</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  if (!currentUser) {
                    navigateTo('login');
                  } else {
                    navigateTo('post-ad');
                  }
                }}
                className="px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-base font-extrabold shadow-lg transition-transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
              >
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                <span>Post Free Classified Ad Now</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
