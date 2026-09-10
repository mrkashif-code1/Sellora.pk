import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  PlusCircle, 
  Heart, 
  MessageSquare, 
  User as UserIcon, 
  ChevronDown, 
  ShieldCheck, 
  LogOut, 
  ListOrdered, 
  Settings, 
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_DATA, PAKISTAN_CITIES } from '../services/db';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    currentPage, 
    navigateTo, 
    logout, 
    favoritesCount, 
    unreadMessagesCount,
    searchFilters,
    setSearchFilters,
    selectedCity,
    setSelectedCity
  } = useApp();

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchFilters.keyword || '');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('browse', { keyword: searchInput, city: selectedCity });
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
    if (currentPage === 'browse') {
      setSearchFilters(prev => ({ ...prev, city }));
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs backdrop-blur-md">
      {/* Top micro bar with country & trust badge */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Pakistan's Next-Gen Classifieds Network
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">100% Free Ad Posting • Direct WhatsApp Chat • Verified Sellers</span>
          </div>
          <div className="flex items-center gap-4">
            {currentUser?.role === 'admin' && (
              <button 
                onClick={() => navigateTo('admin')} 
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Dashboard
              </button>
            )}
            <span className="text-slate-400">Currency: <strong className="text-white">PKR (Rs.)</strong></span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Brand Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="relative">
                <span className="font-extrabold text-xl tracking-tight">S</span>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full"></span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Sellora
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 tracking-wider">
                  PK
                </span>
              </div>
              <span className="text-[10px] -mt-1 font-medium text-slate-500 tracking-wider uppercase">
                Buy & Sell Pakistan
              </span>
            </div>
          </div>

          {/* Location Selector (Desktop) */}
          <div className="relative hidden lg:block shrink-0">
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-100/90 hover:bg-slate-200/80 rounded-xl text-sm font-semibold text-slate-700 transition-colors border border-slate-200"
            >
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="max-w-[110px] truncate">{selectedCity}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCityDropdownOpen && (
              <div className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Select Pakistan City
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {PAKISTAN_CITIES.map(city => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className={`w-full text-left px-3.5 py-2 text-sm transition-colors flex items-center justify-between ${
                        selectedCity === city 
                          ? 'bg-emerald-50 text-emerald-700 font-bold' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {city}
                      {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-2xl relative flex items-center"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Find Mobiles, Honda Civic, DHA Flats, Laptops..."
                className="w-full pl-10 pr-24 py-2.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-hidden transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="absolute right-1 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 shadow-xs"
            >
              <span>Search</span>
            </button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Favorites Icon */}
            <button
              onClick={() => {
                if (!currentUser) {
                  navigateTo('login');
                } else {
                  navigateTo('favorites');
                }
              }}
              title="Saved Favorites"
              className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Chat Icon */}
            <button
              onClick={() => {
                if (!currentUser) {
                  navigateTo('login');
                } else {
                  navigateTo('messages');
                }
              }}
              title="My Messages"
              className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            {/* User Account / Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl hover:bg-slate-100 text-slate-800 transition-colors border border-transparent hover:border-slate-200"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-emerald-500/40"
                  />
                  <span className="text-sm font-semibold hidden md:block max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-medium text-slate-500">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 mt-0.5">
                        <MapPin className="w-3 h-3" /> {currentUser.city}, PK
                      </span>
                    </div>

                    <button
                      onClick={() => { navigateTo('profile'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      My Profile
                    </button>

                    <button
                      onClick={() => { navigateTo('my-ads'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <ListOrdered className="w-4 h-4 text-slate-400" />
                      My Ads
                    </button>

                    <button
                      onClick={() => { navigateTo('favorites'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <Heart className="w-4 h-4 text-slate-400" />
                      Saved Ads ({favoritesCount})
                    </button>

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => { navigateTo('admin'); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-amber-700 font-medium hover:bg-amber-50 flex items-center gap-2.5"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-500" />
                        Admin Dashboard
                      </button>
                    )}

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => { logout(); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2.5"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => navigateTo('login')}
                  className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-emerald-600 hover:bg-slate-100 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigateTo('signup')}
                  className="px-3 py-2 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors hidden sm:block"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Post Ad CTA Button */}
            <button
              onClick={() => {
                if (!currentUser) {
                  navigateTo('login');
                } else {
                  navigateTo('post-ad');
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Post an Ad</span>
              <span className="sm:hidden">Sell</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg lg:hidden"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Category Quick Bar (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 mt-3 pt-2.5 border-t border-slate-100 text-sm overflow-x-auto no-scrollbar">
          <button
            onClick={() => navigateTo('browse', { category: undefined })}
            className={`font-semibold shrink-0 transition-colors ${
              currentPage === 'browse' && searchFilters.category === 'All'
                ? 'text-emerald-600'
                : 'text-slate-600 hover:text-emerald-600'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES_DATA.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigateTo('browse', { category: cat.id })}
              className={`shrink-0 transition-colors text-xs font-medium py-1 px-2 rounded-md hover:bg-slate-100 ${
                searchFilters.category === cat.id && currentPage === 'browse'
                  ? 'bg-emerald-50 text-emerald-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.name.split('&')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <select
              value={selectedCity}
              onChange={e => handleCitySelect(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-hidden"
            >
              {PAKISTAN_CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => { navigateTo('browse'); setIsMobileMenuOpen(false); }}
              className="p-2.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-800 text-left"
            >
              🔍 Browse All Ads
            </button>
            <button
              onClick={() => { navigateTo('post-ad'); setIsMobileMenuOpen(false); }}
              className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold text-left"
            >
              ➕ Post Classified Ad
            </button>
            {currentUser ? (
              <>
                <button
                  onClick={() => { navigateTo('my-ads'); setIsMobileMenuOpen(false); }}
                  className="p-2.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-800 text-left"
                >
                  📋 My Ads
                </button>
                <button
                  onClick={() => { navigateTo('profile'); setIsMobileMenuOpen(false); }}
                  className="p-2.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-800 text-left"
                >
                  👤 Profile & Ratings
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { navigateTo('login'); setIsMobileMenuOpen(false); }}
                  className="p-2.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-800 text-left"
                >
                  🔑 Login
                </button>
                <button
                  onClick={() => { navigateTo('signup'); setIsMobileMenuOpen(false); }}
                  className="p-2.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-800 text-left"
                >
                  ✨ Create Account
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
