import React, { useState } from 'react';
import { LogIn, Lock, Mail, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/db';

export const LoginPage: React.FC = () => {
  const { setCurrentUser, navigateTo, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    const user = dbService.loginUser(email.trim());
    if (user) {
      if (user.isSuspended) {
        setError('This account has been suspended by Sellora Trust & Safety.');
        return;
      }
      showToast(`Welcome back, ${user.name}!`);
      navigateTo('home');
    } else {
      setError('No registered account found with this email. You can use 1-click demo logins below or sign up.');
    }
  };

  const handleQuickDemo = (demoEmail: string) => {
    const user = dbService.loginUser(demoEmail);
    if (user) {
      showToast(`Logged in as ${user.name} (${user.role.toUpperCase()})`);
      navigateTo('home');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-2xl mx-auto shadow-md">
            S
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-display">
            Sign In to Sellora
          </h2>
          <p className="text-xs text-slate-500">
            Manage your classified ads, track inquiries, and chat with buyers across Pakistan.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g. hamza@example.com"
                required
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 outline-hidden"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => showToast('Demo password is: demo123 (or use 1-click buttons below)', 'info')}
                className="text-xs text-emerald-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 outline-hidden"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-600 font-medium">Keep me signed in</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* 1-Click Demo Accounts */}
        <div className="pt-4 border-t border-slate-100 space-y-2.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
            Or 1-Click Demo Accounts
          </span>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => handleQuickDemo('hamza@example.com')}
              className="p-2 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl border border-slate-200 font-semibold text-slate-700 transition-colors text-center"
            >
              Buyer <span className="block text-[10px] text-slate-400">Hamza</span>
            </button>
            <button
              onClick={() => handleQuickDemo('ayesha@sellora.pk')}
              className="p-2 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl border border-slate-200 font-semibold text-slate-700 transition-colors text-center"
            >
              Seller <span className="block text-[10px] text-slate-400">Ayesha</span>
            </button>
            <button
              onClick={() => handleQuickDemo('admin@sellora.pk')}
              className="p-2 bg-amber-50/80 hover:bg-amber-100 text-amber-900 rounded-xl border border-amber-200 font-bold transition-colors text-center"
            >
              Admin <span className="block text-[10px] text-amber-600">Full Access</span>
            </button>
          </div>
        </div>

        {/* Link to SignUp */}
        <p className="text-center text-xs text-slate-500 pt-2">
          Don't have a Sellora account?{' '}
          <button
            onClick={() => navigateTo('signup')}
            className="font-bold text-emerald-600 hover:underline"
          >
            Sign Up Now
          </button>
        </p>
      </div>
    </div>
  );
};
