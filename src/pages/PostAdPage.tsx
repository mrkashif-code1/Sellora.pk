import React, { useState } from 'react';
import { 
  Upload, 
  X, 
  Plus, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  Smartphone,
  Info,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_DATA, PAKISTAN_CITIES, dbService } from '../services/db';
import { CategoryType, ItemCondition } from '../types';

export const PostAdPage: React.FC = () => {
  const { currentUser, navigateTo, showToast } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('Mobiles');
  const [subcategory, setSubcategory] = useState('');
  const [condition, setCondition] = useState<ItemCondition>('Like New');
  const [price, setPrice] = useState<string>('');
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [description, setDescription] = useState('');
  const [city, setCity] = useState(currentUser?.city || 'Lahore');
  const [locality, setLocality] = useState('');
  const [phone, setPhone] = useState(currentUser?.phone || '+92 300 1234567');
  const [showPhone, setShowPhone] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected category object
  const selectedCatObj = CATEGORIES_DATA.find(c => c.id === category);

  // Sample image presets for quick testing
  const samplePresets = [
    { label: 'Smartphone', url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80' },
    { label: 'Car / Motor', url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80' },
    { label: 'Laptop / Tech', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' },
    { label: 'Property / Home', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = 8 - images.length;
    const filesToProcess = (Array.from(files) as File[]).slice(0, remainingSlots);

    filesToProcess.forEach((file: File) => {
      if (!file.type.startsWith('image/')) {
        showToast('Only image files are allowed (JPEG, PNG, WEBP)', 'error');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image size exceeds 5MB limit', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        if (loadEvt.target?.result) {
          setImages(prev => [...prev, loadEvt.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddPreset = (url: string) => {
    if (images.length >= 8) {
      showToast('Maximum 8 photos allowed', 'info');
      return;
    }
    setImages(prev => [...prev, url]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim() || title.trim().length < 8) {
      newErrors.title = 'Title must be at least 8 characters long';
    }
    if (!price || Number(price) <= 0) {
      newErrors.price = 'Please enter a valid asking price';
    }
    if (!description.trim() || description.trim().length < 15) {
      newErrors.description = 'Description must be at least 15 characters long';
    }
    if (!locality.trim()) {
      newErrors.locality = 'Please provide locality / area (e.g., DHA Phase 5, Blue Area)';
    }
    if (!phone.trim() || phone.length < 10) {
      newErrors.phone = 'Please provide a valid Pakistani contact number (+92 ...)';
    }
    if (images.length === 0) {
      newErrors.images = 'Please upload at least 1 photo of the product';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please correct the errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);

    const newAd = dbService.createAd({
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      isNegotiable,
      category,
      subcategory: subcategory || (selectedCatObj?.subcategories[0] || ''),
      condition,
      images,
      city,
      locality: locality.trim(),
      sellerId: currentUser ? currentUser.id : 'user-hamza',
      sellerName: currentUser ? currentUser.name : 'Sellora User',
      sellerPhone: phone.trim(),
      showPhone,
      whatsappEnabled,
      isFeatured,
      status: 'active'
    });

    setTimeout(() => {
      setIsSubmitting(false);
      showToast('🎉 Your classified ad is now live on Sellora!');
      navigateTo('ad-details', { adId: newAd.id });
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
          Post a Classified Ad on Sellora
        </h1>
        <p className="text-slate-500 text-sm">
          Sell your product to millions of active buyers across Pakistan for free.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* 1. Category Selection */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-black">1</span>
            Select Category & Subcategory
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {CATEGORIES_DATA.map(c => (
              <button
                type="button"
                key={c.id}
                onClick={() => {
                  setCategory(c.id);
                  setSubcategory(c.subcategories[0] || '');
                }}
                className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all flex flex-col gap-1.5 ${
                  category === c.id
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <span className="truncate">{c.name.split('&')[0]}</span>
                <span className="text-[10px] text-slate-400 font-normal">{c.subcategories.length} sub-items</span>
              </button>
            ))}
          </div>

          {/* Subcategory pills */}
          {selectedCatObj && (
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Subcategory
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedCatObj.subcategories.map(sub => (
                  <button
                    type="button"
                    key={sub}
                    onClick={() => setSubcategory(sub)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      (subcategory || selectedCatObj.subcategories[0]) === sub
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. Upload Photos */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-black">2</span>
              Upload Photos (Max 8)
            </h3>
            <span className="text-xs text-slate-400">{images.length} / 8 photos</span>
          </div>

          {errors.images && (
            <p className="text-xs font-semibold text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.images}
            </p>
          )}

          {/* Photo Previews & Dropzone */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 group bg-slate-100">
                <img src={img} alt="Upload" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                {idx === 0 && (
                  <span className="absolute bottom-1.5 left-1.5 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Cover Photo
                  </span>
                )}
              </div>
            ))}

            {images.length < 8 && (
              <label className="relative aspect-4/3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50/60 hover:bg-emerald-50/30 flex flex-col items-center justify-center cursor-pointer transition-colors text-center p-3 group">
                <Upload className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 transition-colors mb-1" />
                <span className="text-xs font-bold text-slate-700">Add Photo</span>
                <span className="text-[10px] text-slate-400">Drag & Drop or Click</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Quick preset selector for fast demo testing */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Quick sample photos:</span>
            {samplePresets.map(p => (
              <button
                type="button"
                key={p.label}
                onClick={() => handleAddPreset(p.url)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                + {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Product Details */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-black">3</span>
            Ad Title, Price & Condition
          </h3>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Ad Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. iPhone 15 Pro Max 256GB PTA Approved (Box & Invoice)"
              maxLength={100}
              className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm outline-hidden ${
                errors.title ? 'border-rose-500 bg-rose-50/40' : 'border-slate-200 focus:border-emerald-500'
              }`}
            />
            {errors.title ? (
              <p className="text-xs text-rose-600 mt-1">{errors.title}</p>
            ) : (
              <p className="text-[11px] text-slate-400 mt-1">Mention brand, key specs, and condition (min 8 characters)</p>
            )}
          </div>

          {/* Condition */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Item Condition *
            </label>
            <div className="flex flex-wrap gap-2">
              {(['Brand New', 'Like New', 'Excellent', 'Good', 'Fair'] as ItemCondition[]).map(c => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCondition(c)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                    condition === c
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Negotiable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Asking Price (PKR) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                  Rs.
                </span>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="e.g. 85000"
                  className={`w-full pl-11 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-semibold outline-hidden ${
                    errors.price ? 'border-rose-500 bg-rose-50/40' : 'border-slate-200 focus:border-emerald-500'
                  }`}
                />
              </div>
              {errors.price && <p className="text-xs text-rose-600 mt-1">{errors.price}</p>}
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Price Negotiable</span>
                <span className="text-[11px] text-slate-400">Allow buyers to make offers</span>
              </div>
              <input
                type="checkbox"
                checked={isNegotiable}
                onChange={e => setIsNegotiable(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Description *
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={5}
              placeholder="Describe the condition, usage period, accessories included, reason for selling, and any defects or warranty details..."
              className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm outline-hidden resize-none ${
                errors.description ? 'border-rose-500 bg-rose-50/40' : 'border-slate-200 focus:border-emerald-500'
              }`}
            />
            {errors.description && <p className="text-xs text-rose-600 mt-1">{errors.description}</p>}
          </div>
        </div>

        {/* 4. Location & Contact Preferences */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-black">4</span>
            Location & Contact Preferences
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                City *
              </label>
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-hidden"
              >
                {PAKISTAN_CITIES.filter(c => c !== 'All Cities').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Locality / Area *
              </label>
              <input
                type="text"
                value={locality}
                onChange={e => setLocality(e.target.value)}
                placeholder="e.g. DHA Phase 5, Blue Area, Gulberg III"
                className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm outline-hidden ${
                  errors.locality ? 'border-rose-500 bg-rose-50/40' : 'border-slate-200 focus:border-emerald-500'
                }`}
              />
              {errors.locality && <p className="text-xs text-rose-600 mt-1">{errors.locality}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Contact Phone Number *
            </label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+92 300 1234567"
              className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm outline-hidden ${
                errors.phone ? 'border-rose-500 bg-rose-50/40' : 'border-slate-200 focus:border-emerald-500'
              }`}
            />
            {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={showPhone}
                onChange={e => setShowPhone(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
              />
              <span className="text-xs font-semibold text-slate-800">Show phone number on ad</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={whatsappEnabled}
                onChange={e => setWhatsappEnabled(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
              />
              <span className="text-xs font-semibold text-slate-800">Enable direct WhatsApp chats</span>
            </label>
          </div>
        </div>

        {/* 5. Optional Featured Booster */}
        <div className="bg-gradient-to-r from-amber-500/10 to-emerald-500/10 p-5 rounded-3xl border border-amber-300/40 flex items-center justify-between">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 text-xs font-black text-amber-600 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> Feature This Ad (Free Demo Boost)
            </span>
            <p className="text-xs text-slate-600">
              Get up to 5x more buyer views by pinning this ad on the Sellora homepage.
            </p>
          </div>
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={e => setIsFeatured(e.target.checked)}
            className="w-5 h-5 text-amber-500 rounded-sm focus:ring-amber-400"
          />
        </div>

        {/* Submit button */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-extrabold shadow-lg shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? 'Publishing Classified Ad...' : 'Publish Ad Now'}
          </button>
        </div>

      </form>
    </div>
  );
};
