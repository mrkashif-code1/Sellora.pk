import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  X, 
  ArrowUpDown, 
  RotateCcw,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_DATA, PAKISTAN_CITIES, dbService } from '../services/db';
import { AdCard } from '../components/AdCard';
import { CategoryType, ItemCondition } from '../types';

export const BrowsePage: React.FC = () => {
  const { searchFilters, setSearchFilters, navigateTo } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Price range quick presets
  const pricePresets = [
    { label: 'All', min: undefined, max: undefined },
    { label: 'Under Rs. 50K', min: 0, max: 50000 },
    { label: '50K - 200K', min: 50000, max: 200000 },
    { label: '200K - 1M', min: 200000, max: 1000000 },
    { label: 'Rs. 1M+', min: 1000000, max: undefined }
  ];

  const conditions: (ItemCondition | 'All')[] = ['All', 'Brand New', 'Like New', 'Excellent', 'Good', 'Fair'];

  // Filter ads
  const filteredAds = useMemo(() => {
    return dbService.getAds(searchFilters);
  }, [searchFilters]);

  const handleResetFilters = () => {
    setSearchFilters({
      keyword: '',
      category: 'All',
      city: 'All Cities',
      minPrice: undefined,
      maxPrice: undefined,
      condition: 'All',
      sortBy: 'newest'
    });
  };

  const hasActiveFilters = Boolean(
    (searchFilters.keyword && searchFilters.keyword.trim() !== '') ||
    (searchFilters.category && searchFilters.category !== 'All') ||
    (searchFilters.city && searchFilters.city !== 'All Cities') ||
    (searchFilters.condition && searchFilters.condition !== 'All') ||
    searchFilters.minPrice ||
    searchFilters.maxPrice ||
    searchFilters.featuredOnly
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Keyword Search */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilters.keyword || ''}
              onChange={e => setSearchFilters(prev => ({ ...prev, keyword: e.target.value }))}
              placeholder="Search by title, specs, or keyword (e.g., Civic, iPhone, Sofa)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-hidden"
            />
            {searchFilters.keyword && (
              <button 
                onClick={() => setSearchFilters(prev => ({ ...prev, keyword: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* City Selector */}
          <div className="relative md:w-56">
            <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={searchFilters.city || 'All Cities'}
              onChange={e => setSearchFilters(prev => ({ ...prev, city: e.target.value }))}
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-hidden cursor-pointer"
            >
              {PAKISTAN_CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-sm font-bold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
          </button>
        </div>

        {/* Active filter badges */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-medium">Active filters:</span>
            
            {searchFilters.category && searchFilters.category !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold">
                Category: {searchFilters.category}
                <button onClick={() => setSearchFilters(prev => ({ ...prev, category: 'All' }))}>
                  <X className="w-3 h-3 hover:text-emerald-950" />
                </button>
              </span>
            )}

            {searchFilters.city && searchFilters.city !== 'All Cities' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold">
                City: {searchFilters.city}
                <button onClick={() => setSearchFilters(prev => ({ ...prev, city: 'All Cities' }))}>
                  <X className="w-3 h-3 hover:text-emerald-950" />
                </button>
              </span>
            )}

            {searchFilters.condition && searchFilters.condition !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold">
                Condition: {searchFilters.condition}
                <button onClick={() => setSearchFilters(prev => ({ ...prev, condition: 'All' }))}>
                  <X className="w-3 h-3 hover:text-emerald-950" />
                </button>
              </span>
            )}

            {(searchFilters.minPrice || searchFilters.maxPrice) && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold">
                Price: Rs. {searchFilters.minPrice || 0} - {searchFilters.maxPrice ? `Rs. ${searchFilters.maxPrice}` : 'Above'}
                <button onClick={() => setSearchFilters(prev => ({ ...prev, minPrice: undefined, maxPrice: undefined }))}>
                  <X className="w-3 h-3 hover:text-emerald-950" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-slate-500 hover:text-rose-600 font-medium ml-auto flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                Refine Search
              </h3>
              {hasActiveFilters && (
                <button 
                  onClick={handleResetFilters}
                  className="text-xs text-rose-600 hover:underline font-semibold"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Categories
              </label>
              <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                <button
                  onClick={() => setSearchFilters(prev => ({ ...prev, category: 'All' }))}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    searchFilters.category === 'All'
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>All Categories</span>
                </button>
                {CATEGORIES_DATA.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSearchFilters(prev => ({ ...prev, category: c.id }))}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      searchFilters.category === c.id
                        ? 'bg-emerald-50 text-emerald-800 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{c.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Price (PKR)
              </label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="number"
                  placeholder="Min Rs."
                  value={searchFilters.minPrice || ''}
                  onChange={e => setSearchFilters(prev => ({ ...prev, minPrice: e.target.value ? Number(e.target.value) : undefined }))}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium outline-hidden"
                />
                <input
                  type="number"
                  placeholder="Max Rs."
                  value={searchFilters.maxPrice || ''}
                  onChange={e => setSearchFilters(prev => ({ ...prev, maxPrice: e.target.value ? Number(e.target.value) : undefined }))}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium outline-hidden"
                />
              </div>

              {/* Quick presets */}
              <div className="flex flex-wrap gap-1">
                {pricePresets.slice(1).map(p => (
                  <button
                    key={p.label}
                    onClick={() => setSearchFilters(prev => ({ ...prev, minPrice: p.min, maxPrice: p.max }))}
                    className="text-[10px] px-2 py-1 rounded bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Item Condition */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Condition
              </label>
              <div className="flex flex-wrap gap-1.5">
                {conditions.map(cond => (
                  <button
                    key={cond}
                    onClick={() => setSearchFilters(prev => ({ ...prev, condition: cond }))}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      searchFilters.condition === cond
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Only Toggle */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Featured Ads Only
              </span>
              <input
                type="checkbox"
                checked={Boolean(searchFilters.featuredOnly)}
                onChange={e => setSearchFilters(prev => ({ ...prev, featuredOnly: e.target.checked }))}
                className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
              />
            </div>
          </div>
        </aside>

        {/* Results Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Results Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                {searchFilters.category && searchFilters.category !== 'All' ? searchFilters.category : 'All Categories'} in {searchFilters.city || 'Pakistan'}
              </h2>
              <p className="text-xs text-slate-500">
                Showing <strong className="text-slate-800">{filteredAds.length}</strong> active classified listings
              </p>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium hidden sm:inline">Sort:</span>
                <select
                  value={searchFilters.sortBy || 'newest'}
                  onChange={e => setSearchFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  className="bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl font-semibold text-slate-700 outline-hidden cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Grid or List */}
          {filteredAds.length > 0 ? (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" : "space-y-3"}>
              {filteredAds.map(ad => (
                <AdCard key={ad.id} ad={ad} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-800">No Ads Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn't find any classifieds matching your criteria. Try adjusting your search keywords, city, or price range.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                >
                  Reset All Filters
                </button>
                <button
                  onClick={() => navigateTo('post-ad')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Post First Ad for This
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Filters Slide-over Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto space-y-6 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                Filter Classifieds
              </h3>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                value={searchFilters.category || 'All'}
                onChange={e => setSearchFilters(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700"
              >
                <option value="All">All Categories</option>
                {CATEGORIES_DATA.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Condition
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {conditions.map(c => (
                  <button
                    key={c}
                    onClick={() => setSearchFilters(prev => ({ ...prev, condition: c }))}
                    className={`px-2 py-1.5 rounded-lg text-xs font-medium text-center ${
                      searchFilters.condition === c 
                        ? 'bg-emerald-600 text-white font-bold' 
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Price (PKR)
              </label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <input
                  type="number"
                  placeholder="Min Rs."
                  value={searchFilters.minPrice || ''}
                  onChange={e => setSearchFilters(prev => ({ ...prev, minPrice: e.target.value ? Number(e.target.value) : undefined }))}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                />
                <input
                  type="number"
                  placeholder="Max Rs."
                  value={searchFilters.maxPrice || ''}
                  onChange={e => setSearchFilters(prev => ({ ...prev, maxPrice: e.target.value ? Number(e.target.value) : undefined }))}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-emerald-600 rounded-xl"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
