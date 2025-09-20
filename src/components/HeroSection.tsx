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
        {/* Enhanced mobile contrast overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-temple-earth/60 via-temple-earth/80 to-temple-earth/60 md:bg-gradient-to-r md:from-temple-earth/80 md:via-temple-earth/40 md:to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
        {/* Mobile-optimized heading */}
        <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight">
          <span className="block text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 md:mb-4 font-medium">
            Welcome to
          </span>
          <span className="block bg-gradient-to-r from-temple-gold to-temple-sunset bg-clip-text text-transparent font-display leading-[1.05]">
            {TEMPLE_NAME}
          </span>
        </h1>

        {/* Mobile-optimized description */}
        <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0 font-light">
          A sacred sanctuary of peace, prayer, and spiritual awakening where all souls find divine connection.
        </p>

        {/* Mobile-optimized buttons */}
        <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center items-center max-w-md xs:max-w-none mx-auto">
          <Button
            variant="sacred"
            size="lg"
            className="text-sm xs:text-base sm:text-lg px-8 xs:px-6 sm:px-8 py-4 xs:py-3 hover:scale-105 transition-all duration-300 w-full xs:w-auto min-w-[180px] xs:min-w-0 font-medium shadow-lg"
            onClick={onClick}>
            Join Our Community
          </Button>
          <Button
            variant="blessing"
            size="lg"
            className="text-sm xs:text-base sm:text-lg px-8 xs:px-6 sm:px-8 py-4 xs:py-3 hover:scale-105 transition-all duration-300 w-full xs:w-auto min-w-[180px] xs:min-w-0 font-medium shadow-lg"
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
