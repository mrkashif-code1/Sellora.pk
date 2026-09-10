import React, { createContext, useContext, useEffect, useState } from 'react';
import { dbService } from '../services/db';
import { Ad, CategoryType, SearchFilterParams, User } from '../types';

export type PageView = 
  | 'home'
  | 'browse'
  | 'ad-details'
  | 'post-ad'
  | 'login'
  | 'signup'
  | 'profile'
  | 'my-ads'
  | 'favorites'
  | 'messages'
  | 'admin';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
  currentPage: PageView;
  selectedAdId: string | null;
  selectedConvId: string | null;
  searchFilters: SearchFilterParams;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilterParams>>;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  navigateTo: (page: PageView, params?: { adId?: string; convId?: string; category?: CategoryType; keyword?: string; city?: string }) => void;
  favoritesCount: number;
  unreadMessagesCount: number;
  toasts: Toast[];
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  refreshKey: number;
  triggerRefresh: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUserState] = useState<User | null>(() => dbService.getCurrentUser());
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedAdId, setSelectedAdId] = useState<string | null>(null);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [searchFilters, setSearchFilters] = useState<SearchFilterParams>({
    keyword: '',
    category: 'All',
    city: 'All Cities',
    minPrice: undefined,
    maxPrice: undefined,
    condition: 'All',
    sortBy: 'newest'
  });

  const triggerRefresh = () => setRefreshKey(prev => prev + 1);

  // Sync with DB events
  useEffect(() => {
    const handleDbChange = () => {
      setRefreshKey(prev => prev + 1);
      setCurrentUserState(dbService.getCurrentUser());
    };
    window.addEventListener('sellora_db_changed', handleDbChange);
    return () => window.removeEventListener('sellora_db_changed', handleDbChange);
  }, []);

  // Sync with URL Hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash || hash === '') {
        setCurrentPage('home');
        return;
      }
      const parts = hash.split('/');
      const pageRoute = parts[0];

      if (pageRoute === 'ad' && parts[1]) {
        setCurrentPage('ad-details');
        setSelectedAdId(parts[1]);
      } else if (pageRoute === 'messages') {
        setCurrentPage('messages');
        if (parts[1]) setSelectedConvId(parts[1]);
      } else if ([
        'home', 'browse', 'ad-details', 'post-ad', 'login', 
        'signup', 'profile', 'my-ads', 'favorites', 'messages', 'admin'
      ].includes(pageRoute)) {
        setCurrentPage(pageRoute as PageView);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (
    page: PageView, 
    params?: { adId?: string; convId?: string; category?: CategoryType; keyword?: string; city?: string }
  ) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (params?.adId) setSelectedAdId(params.adId);
    if (params?.convId) setSelectedConvId(params.convId);

    if (params?.category || params?.keyword !== undefined || params?.city) {
      setSearchFilters(prev => ({
        ...prev,
        category: params.category || prev.category,
        keyword: params.keyword !== undefined ? params.keyword : prev.keyword,
        city: params.city || prev.city
      }));
    }

    if (page === 'ad-details' && params?.adId) {
      window.location.hash = `#/ad/${params.adId}`;
    } else if (page === 'messages' && params?.convId) {
      window.location.hash = `#/messages/${params.convId}`;
    } else {
      window.location.hash = `#/${page === 'home' ? '' : page}`;
    }
    setCurrentPage(page);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = 'toast-' + Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const setCurrentUser = (user: User | null) => {
    dbService.setCurrentUser(user);
    setCurrentUserState(user);
  };

  const logout = () => {
    dbService.setCurrentUser(null);
    setCurrentUserState(null);
    showToast('You have been logged out safely.', 'info');
    navigateTo('home');
  };

  const favoritesCount = currentUser ? dbService.getFavorites(currentUser.id).length : 0;
  const conversations = currentUser ? dbService.getConversations(currentUser.id) : [];
  const unreadMessagesCount = conversations.reduce((acc, c) => {
    return acc + (c.buyerId === currentUser?.id ? c.unreadCountUser : c.unreadCountOther);
  }, 0);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        logout,
        currentPage,
        selectedAdId,
        selectedConvId,
        searchFilters,
        setSearchFilters,
        selectedCity,
        setSelectedCity,
        navigateTo,
        favoritesCount,
        unreadMessagesCount,
        toasts,
        showToast,
        refreshKey,
        triggerRefresh
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
