import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="border-temple-gold/30 hover:bg-temple-gold/10"
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4 text-temple-gold" />
      ) : (
        <Sun className="h-4 w-4 text-temple-gold" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;