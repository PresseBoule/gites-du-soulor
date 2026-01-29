import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router'; // Changé de 'react-router-dom' à 'react-router'
import { NavigationRouter } from './NavigationRouter';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import { AdminLogin } from './AdminLogin';
import { AdminToolbar } from './admin/AdminToolbar';
import { FloatingElements } from './FloatingElements';
import { useAdmin } from '../contexts/AdminContext';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [scrollY, setScrollY] = useState(0);
  const { isAdminMode } = useAdmin();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#2d3843] via-[#3a4a5a] to-[#2d3843]">
      <FloatingElements />
      {isAdminMode && <AdminToolbar />}
      <NavigationRouter scrollY={scrollY} />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
      <AdminLogin />
    </div>
  );
}