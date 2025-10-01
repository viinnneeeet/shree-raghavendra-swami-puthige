import { TEMPLE_NAME, QUICK_LINKS, CONTACT_INFO } from '@/common/appConstants';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-temple-earth text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About Temple */}
          <div className="md:col-span-1 lg:col-span-2">
            <h3 className="lg:text-xl md:text-5xl font-bold bg-gradient-to-r from-temple-gold to-temple-sunset bg-clip-text text-transparent mb-3 sm:mb-4">
              About {TEMPLE_NAME}
            </h3>
            <p className="text-white/85 md:text-4xl mb-4 sm:mb-6 lg:text-sm sm:text-base leading-loose">
              A beacon of spiritual light, welcoming all souls seeking peace,
              wisdom, and divine connection. Our temple stands as a sacred space
              where devotion meets community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mt-4 sm:mt-0">
            <h4 className="lg:text-lg md:text-5xl font-semibold mb-3 lg:mb-4 md:mb-10 text-temple-gold">
              Quick Links
            </h4>
            <div className="lg:space-y-2 md:space-y-10">
              {QUICK_LINKS?.map((link) => (
                <Link
                  key={link?.name}
                  to={link?.url}
                  className="block text-white/80 hover:text-temple-gold transition-all duration-300 hover:translate-x-1 lg:text-sm md:text-4xl  sm:text-base py-1">
                  {link?.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-4 sm:mt-0">
            <h4 className="text-lg lg:text-xl md:text-5xl font-semibold lg:mb-3 md:mb-10 text-temple-gold">
              Contact Info
            </h4>
            <div className="sm:space-y-4 text-white/80 md:space-y-10 lg:space-y-3">
              {CONTACT_INFO.map(({ icon, text, className = '' }, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 md:space-x-3">
                  <span className="text-temple-gold lg:text-lg md:text-5xl flex-shrink-0">
                    {icon}
                  </span>
                  <p
                    className={`lg:text-sm md:text-4xl sm:text-base ${className}`}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-temple-gold/30 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-white/60">
          <p className="lg:text-xs md:text-4xl sm:text-sm leading-relaxed">
            &copy; 2025 Shree Raghavendra Swami Temple. All rights reserved.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>Built with devotion and
            love.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
