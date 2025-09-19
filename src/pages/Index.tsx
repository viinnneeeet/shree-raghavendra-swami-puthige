import React, { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import Loader from '@/components/ui/Loader';

// Lazy load heavy / secondary sections
const ServicesSection = React.lazy(
  () => import('@/components/ServicesSection')
);
const EventsSection = React.lazy(() => import('@/components/EventsSection'));
const GallerySection = React.lazy(() => import('@/components/GallerySection'));
const ContactSection = React.lazy(() => import('@/components/ContactSection'));

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <Suspense fallback={<Loader isLoading={true} />}>
        <ServicesSection />
        <EventsSection />
        <GallerySection />
        <ContactSection />
      </Suspense>
    </div>
  );
};

export default Index;
