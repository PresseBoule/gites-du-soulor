import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router'; // Changé de 'react-router-dom' à 'react-router'
import { HelmetProvider } from 'react-helmet-async';
import { FloatingElements } from './components/FloatingElements';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { LoadingScreen } from './components/LoadingScreen';
import { AdminProvider, useAdmin } from './contexts/AdminContext';
import { AdminToolbar } from './components/admin/AdminToolbar';
import { useContent } from './hooks/useContent';
import { HomePage } from './pages/HomePage';
import { TarifsPage } from './pages/TarifsPage';
import { GitesListPage } from './pages/GitesListPage';
import { GitePage } from './pages/GitePage';
import { WellnessPage } from './pages/WellnessPage';
import { ContactPage } from './pages/ContactPage';
import { GitesPage } from './pages/GitesPage';
import { BienEtrePage } from './pages/BienEtrePage';
import { GiteArrensMarsousPage } from './pages/GiteArrensMarsousPage';
import { GiteValAzunPage } from './pages/GiteValAzunPage';
import { GiteBainNordiquePage } from './pages/GiteBainNordiquePage';
import { GiteProximiteLourdesPage } from './pages/GiteProximiteLourdesPage';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AdminProvider>
          <AppContent />
        </AdminProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

function AppContent() {
  const { setContent } = useAdmin();
  const { content: loadedContent, loading: contentLoading } = useContent();
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loadedContent && !contentLoading) {
      setContent(loadedContent);
    }
  }, [loadedContent, contentLoading, setContent]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!loadedContent || contentLoading) {
    return (
      <div className="min-h-screen bg-[#3a4a5a] flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />

      {/* Admin Toolbar */}
      <AdminToolbar />

      <div className="min-h-screen bg-gradient-to-br from-[#2d3843] via-[#3a4a5a] to-[#4a5a6a] relative overflow-hidden">
        <FloatingElements />
        
        {/* Navigation */}
        <Navigation scrollY={scrollY} />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tarifs" element={<TarifsPage />} />
          <Route path="/gites" element={<GitesPage />} />
          <Route path="/gites/:slug" element={<GitePage />} />
          <Route path="/bien-etre" element={<BienEtrePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gite-arrens-marsous" element={<GiteArrensMarsousPage />} />
          <Route path="/gite-val-azun" element={<GiteValAzunPage />} />
          <Route path="/gite-bain-nordique" element={<GiteBainNordiquePage />} />
          <Route path="/gite-proximite-lourdes" element={<GiteProximiteLourdesPage />} />
        </Routes>

        {/* Footer */}
        <Footer contact={loadedContent.contact} social={loadedContent.social} />

        {/* Cookie Banner */}
        <CookieBanner />
      </div>
    </>
  );
}