import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-white text-sm font-medium transition-all duration-300 animate-in slide-in-from-bottom-5 ${
            t.type === 'error' 
              ? 'bg-rose-600' 
              : t.type === 'info' 
              ? 'bg-slate-900' 
              : 'bg-emerald-600'
          }`}
        >
          {t.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0" />}
          {t.type === 'info' && <Info className="w-5 h-5 shrink-0 text-amber-400" />}
          {t.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-200" />}
          <span className="flex-1 text-xs sm:text-sm">{t.message}</span>
        </div>
      ))}
    </div>
  );
};
