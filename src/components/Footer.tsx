import React from 'react';
import { ShieldCheck, PhoneCall, Heart, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_DATA } from '../services/db';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedCity } = useApp();

  const pakistanCities = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 
    'Faisalabad', 'Multan', 'Peshawar', 'Gujranwala', 
    'Sialkot', 'Quetta', 'Hyderabad', 'Abbottabad'
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm mt-16">
      {/* Trust & Safety Banner */}
      <div className="bg-slate-950/60 border-b border-slate-800/80 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">Safe Trading Across Pakistan</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Meet in secure public places like commercial markaz or malls. Verify items and vehicle documents before transferring funds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">PTA & CPLC Verification</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Always verify smartphone IMEI via official PTA 8484 and check vehicle chassis status on government excise portals.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">Direct WhatsApp & Calling</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Connect directly with sellers in your city via phone or WhatsApp. Negotiate fairly with zero middleman fees.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xl shadow-md">
                S
              </div>
              <span className="text-2xl font-black text-white tracking-tight">Sellora</span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                Pakistan
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Sellora is Pakistan's premier classifieds marketplace. From smartphones and sports cars to luxury homes and freelance services, post your free ad and connect with millions of buyers nationwide.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              Operated locally across Punjab, Sindh, KPK, Balochistan & ICT.
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Popular Categories</h5>
            <ul className="space-y-2 text-xs">
              {CATEGORIES_DATA.slice(0, 6).map(c => (
                <li key={c.id}>
                  <button 
                    onClick={() => navigateTo('browse', { category: c.id })}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                  >
                    <span>{c.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Trending Pakistan Cities */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Top Cities</h5>
            <ul className="space-y-2 text-xs">
              {pakistanCities.slice(0, 6).map(city => (
                <li key={city}>
                  <button 
                    onClick={() => {
                      setSelectedCity(city);
                      navigateTo('browse', { city });
                    }}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Classifieds in {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Sellora Support</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('post-ad')} className="hover:text-emerald-400 transition-colors font-medium text-emerald-400 flex items-center gap-1">
                  Post Free Classified Ad <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('browse')} className="hover:text-emerald-400 transition-colors">
                  Search All Products
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('profile')} className="hover:text-emerald-400 transition-colors">
                  Trust & Verification Center
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-amber-400 transition-colors text-slate-400">
                  Moderator Portal
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sellora Pakistan (Pvt.) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Safety Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
