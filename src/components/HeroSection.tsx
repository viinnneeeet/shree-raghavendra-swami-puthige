import { Button } from '@/components/ui/button';
import templeHero from '@/assets/images/temple-hero.jpg';
import { TEMPLE_NAME } from '@/common/appConstants';
import { useToast } from '@/hooks/use-toast';
import { useErrorHandler } from 'react-error-boundary';
const HeroSection = () => {
  const { toast } = useToast();
  const handleError = useErrorHandler();

  const onClick = () => {
    // simulate an error
    handleError(new Error('Manual trigger: Something went wrong!'));
  };
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={templeHero}
          alt="Sacred temple at golden hour with beautiful traditional architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-temple-earth/80 via-temple-earth/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Welcome to
          <span className="block bg-gradient-to-r from-temple-gold to-temple-sunset bg-clip-text text-transparent">
            {TEMPLE_NAME}
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          A sacred sanctuary of peace, prayer, and spiritual awakening where all souls find divine connection.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="sacred"
            size="lg"
            className="text-base sm:text-lg px-6 sm:px-8 py-3 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            onClick={onClick}>
            Join Our Community
          </Button>
          <Button
            variant="blessing"
            size="lg"
            className="text-base sm:text-lg px-6 sm:px-8 py-3 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            onClick={() =>
              toast({
                title: 'Temple Information',
                description: 'Welcome to our sacred space of devotion',
                variant: 'default',
              })
            }>
            Learn More
          </Button>
        </div>

        {/* Decorative elements */}
        {/* <div className="mt-12 flex justify-center space-x-8 text-temple-gold/60">
          <div className="text-4xl">🕉️</div>
          <div className="text-4xl">🪷</div>
          <div className="text-4xl">☸️</div>
        </div> */}
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-temple-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-temple-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </div> */}
    </section>
  );
};

export default HeroSection;
