import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { TEMPLE_NAME, NAVIGATION_ITEMS } from '@/common/appConstants';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import classNames from 'classnames';
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-temple-gold/20 shadow-temple">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="lg:text-2xl md:text-4xl font-bold bg-gradient-to-r from-temple-gold to-temple-bronze bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
            {TEMPLE_NAME}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {NAVIGATION_ITEMS?.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={classNames(
                  'px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-99',
                  {
                    'text-temple-gold border-b-2 border-temple-gold':
                      location.pathname === item.href,
                    'text-foreground hover:text-temple-gold':
                      location.pathname !== item.href,
                  }
                )}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle and Language Selector */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSelector />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <div className="md:hidden flex items-center space-x-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
            <button
              className="lg:hidden text-foreground hover:text-temple-gold transition-all duration-300 p-2 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation with smooth animation */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-sm border-t border-temple-gold/20">
            {NAVIGATION_ITEMS.map((item, index) => (
              <Link
                key={item.href}
                to={item.href}
                className={classNames(
                  'block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:scale-105 transform',
                  {
                    'text-temple-gold bg-temple-gold/10':
                      location.pathname === item.href,
                    'text-foreground hover:text-temple-gold hover:bg-temple-gold/5':
                      location.pathname !== item.href,
                  },
                  isMenuOpen ? `animate-slide-in delay-${index * 100}` : ''
                )}
                onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
