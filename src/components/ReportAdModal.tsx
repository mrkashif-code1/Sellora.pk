import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { AdReport } from '../types';
import { dbService } from '../services/db';
import { useApp } from '../context/AppContext';

interface ReportAdModalProps {
  adId: string;
  adTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportAdModal: React.FC<ReportAdModalProps> = ({ adId, adTitle, isOpen, onClose }) => {
  const { currentUser, showToast } = useApp();
  const [reason, setReason] = useState<AdReport['reason']>('Spam');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.createReport(
      adId,
      adTitle,
      currentUser ? currentUser.id : 'guest-' + Date.now(),
      currentUser ? currentUser.name : 'Anonymous Visitor',
      reason,
      details
    );
    setSubmitted(true);
    showToast('Report submitted. Sellora moderators will review this within 24 hours.', 'info');
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Report Received</h3>
            <p className="text-xs text-slate-500 mt-1">Thank you for helping keep Sellora marketplace safe.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-rose-600">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold text-lg text-slate-900">Report this Ad</h3>
            </div>
            <p className="text-xs text-slate-500 line-clamp-1">
              Ad: <strong>{adTitle}</strong>
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Reason for Reporting
              </label>
              <select
                value={reason}
                onChange={e => setReason(e.target.value as AdReport['reason'])}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-hidden"
              >
                <option value="Fraud / Scam">Fraud / Scam / Fake Seller</option>
                <option value="Spam">Spam / Misleading Information</option>
                <option value="Inappropriate Content">Inappropriate / Offensive Content</option>
                <option value="Wrong Category">Wrong Category or Location</option>
                <option value="Duplicate Ad">Duplicate Listing</option>
                <option value="Other">Other Issues</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Additional Details
              </label>
              <textarea
                value={details}
                onChange={e => setDetails(e.target.value)}
                placeholder="Explain what is wrong with this listing (e.g. invalid phone, stolen item, suspicious advance payment demand)..."
                rows={3}
                required
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-hidden resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs transition-colors"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
