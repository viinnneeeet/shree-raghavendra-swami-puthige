import React, { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import Loader from '@/components/ui/Loader';
import DevotionalAudio from '@/components/DevotionalAudio';
import audio from '@/assets/audio/raghavendra-jap.mp3.mp3';
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

      {/* Devotional Audio Player */}
      <DevotionalAudio
        audioSrc={audio} // You can replace this with your audio file
        title="Shree Raghavendra Swami Jap"
      />
    </div>
  );
};

export default Index;
