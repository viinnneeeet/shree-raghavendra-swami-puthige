import React from 'react';
import { Outlet } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Layout: React.FC = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
