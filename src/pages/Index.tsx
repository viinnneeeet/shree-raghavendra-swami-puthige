import React, { Suspense } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import Loader from '@/components/ui/Loader';

// Lazy load heavy / secondary sections
const ServicesSection = React.lazy(
  () => import('@/components/ServicesSection')
);
const EventsSection = React.lazy(() => import('@/components/EventsSection'));
const GallerySection = React.lazy(() => import('@/components/GallerySection'));
const DonateSection = React.lazy(() => import('@/components/DonateSection'));
const ContactSection = React.lazy(() => import('@/components/ContactSection'));

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <Suspense fallback={<Loader isLoading={true} />}>
        <ServicesSection />
        <EventsSection />
        <GallerySection />
        <DonateSection />
        <ContactSection />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Index;
