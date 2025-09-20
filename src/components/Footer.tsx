import { TEMPLE_NAME, QUICK_LINKS } from '@/common/appConstants';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-temple-earth text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Temple */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-temple-gold to-temple-sunset bg-clip-text text-transparent mb-4">
              About {TEMPLE_NAME}
            </h3>
            <p className="text-white/80 mb-4">
              A beacon of spiritual light, welcoming all souls seeking peace,
              wisdom, and divine connection. Our temple stands as a sacred space
              where devotion meets community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-temple-gold hover:text-temple-sunset transition-colors text-xl">📧</a>
              <a href="#" className="text-temple-gold hover:text-temple-sunset transition-colors text-xl">📱</a>
              <a href="#" className="text-temple-gold hover:text-temple-sunset transition-colors text-xl">🌐</a>
              <a href="#" className="text-temple-gold hover:text-temple-sunset transition-colors text-xl">📍</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-temple-gold">
              Quick Links
            </h4>
            <div className="space-y-2">
              {QUICK_LINKS?.map((link) => (
                <Link
                  key={link?.name}
                  to={link?.url}
                  className="block text-white/80 hover:text-temple-gold transition-all duration-300 hover:translate-x-1">
                  {link?.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-temple-gold">
              Contact Info
            </h4>
            <div className="space-y-3 text-white/80">
              <div className="flex items-start space-x-2">
                <span className="text-temple-gold">📍</span>
                <p>Puttige Moodbidri, Karnataka 574227</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-temple-gold">📞</span>
                <p>(+91) 84336 21215</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-temple-gold">✉️</span>
                <p>info@raghavendra-temple.org</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-temple-gold">🕐</span>
                <p>5:00 AM - 9:00 PM</p>
              </div>
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
  );
};

export default Footer;
