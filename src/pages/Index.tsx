import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import EventsSection from '@/components/EventsSection';
import GallerySection from '@/components/GallerySection';
import DonateSection from '@/components/DonateSection';
import ContactSection from '@/components/ContactSection';
import { TEMPLE_NAME } from '@/common/appConstants';
const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <EventsSection />
      <GallerySection />
      <DonateSection />
      <ContactSection />

      {/* Footer */}
      <footer className="bg-temple-earth text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-temple-gold to-temple-sunset bg-clip-text text-transparent mb-4">
                {TEMPLE_NAME}
              </h3>
              <p className="text-white/80">
                A beacon of spiritual light, welcoming all souls seeking peace,
                wisdom, and divine connection.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-temple-gold">
                Quick Links
              </h4>
              <div className="space-y-2">
                <a
                  href="#about"
                  className="block text-white/80 hover:text-temple-gold transition-colors">
                  About Us
                </a>
                <a
                  href="#services"
                  className="block text-white/80 hover:text-temple-gold transition-colors">
                  Services
                </a>
                <a
                  href="#gallery"
                  className="block text-white/80 hover:text-temple-gold transition-colors">
                  Gallery
                </a>
                <a
                  href="#donate"
                  className="block text-white/80 hover:text-temple-gold transition-colors">
                  Donate
                </a>
                <a
                  href="#contact"
                  className="block text-white/80 hover:text-temple-gold transition-colors">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-temple-gold">
                Connect With Us
              </h4>
              <div className="space-y-2 text-white/80">
                <p>Shree Raghavendra Swami Temple</p>
                <p>Puttige Moodbidri, Karnataka 574227</p>
                <p>(+91) 8433621215</p>
                <p>info@sacredtemple.org</p>
              </div>
            </div>
          </div>

          <div className="border-t border-temple-gold/30 mt-8 pt-8 text-center text-white/60">
            <p>
              &copy; 2025 Shree Raghavendra Swami Temple. All rights reserved.
              Built with devotion and love.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
