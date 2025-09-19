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
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-temple-gold/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-temple-gold to-temple-bronze bg-clip-text text-transparent">
            {TEMPLE_NAME}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {NAVIGATION_ITEMS?.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={classNames(
                  'text-foreground hover:text-temple-gold transition-colors text-md',
                  {
                    'text-temple-gold font-medium':
                      location.pathname === item.href,
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
              <ThemeToggle />
            </div>
            <button
              className="lg:hidden text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-temple-gold/20">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`block py-2 text-foreground hover:text-temple-gold transition-colors ${
                  location.pathname === item.href
                    ? 'text-temple-gold font-medium'
                    : ''
                }`}
                onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-temple-gold/10">
              <LanguageSelector />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
