import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { ErrorBoundary } from './components/ErrorBoundary';

// Pages
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { AdDetailsPage } from './pages/AdDetailsPage';
import { PostAdPage } from './pages/PostAdPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { MyAdsPage } from './pages/MyAdsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { MessagesPage } from './pages/MessagesPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const PageRenderer: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'browse':
        return <BrowsePage />;
      case 'ad-details':
        return <AdDetailsPage />;
      case 'post-ad':
        return <PostAdPage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignUpPage />;
      case 'profile':
        return <UserProfilePage />;
      case 'my-ads':
        return <MyAdsPage />;
      case 'favorites':
        return <FavoritesPage />;
      case 'messages':
        return <MessagesPage />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={currentPage}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="flex-1"
      >
        {renderPage()}
      </motion.main>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white antialiased">
          <Navbar />
          <PageRenderer />
          <Footer />
          <ToastContainer />
        </div>
      </AppProvider>
    </ErrorBoundary>
  );
}
