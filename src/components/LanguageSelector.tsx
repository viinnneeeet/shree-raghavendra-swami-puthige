import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useTheme();

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="border-temple-gold/30 hover:bg-temple-gold/10">
          <Languages className="h-4 w-4 mr-2 text-temple-gold" />
          {currentLanguage?.native}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-temple-gold/30">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as any)}
            className={`${
              language === lang.code ? 'bg-temple-gold/10 text-temple-gold' : ''
            } hover:bg-temple-gold/10 hover:text-temple-gold cursor-pointer`}
          >
            {lang.native}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;