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
      className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={templeHero}
          alt="Sacred temple at golden hour with beautiful traditional architecture"
          className="w-full h-full object-cover object-center"
        />
        {/* Mobile-first enhanced overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 md:bg-gradient-to-r md:from-temple-earth/90 md:via-temple-earth/50 md:to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-6 lg:px-12 max-w-7xl mx-auto h-full flex flex-col justify-center">
        {/* Mobile-first heading with better hierarchy */}
        <div className="lg:mb-8 sm:mb-12">
          <p className="md:text-9xl lg:text-6xl text-temple-gold/90 mb-4 sm:mb-6 font-medium tracking-wide">
            Welcome to
          </p>
          <h1 className="sm:text-5xl md:text-9xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 leading-[1.1] tracking-tight">
            <span className="block bg-gradient-to-r from-temple-gold via-temple-sunset to-temple-gold bg-clip-text text-transparent font-display leading-[1.05] drop-shadow-lg">
              {TEMPLE_NAME}
            </span>
          </h1>
        </div>

        {/* Mobile-optimized description with better contrast */}
        <div className="mb-10 sm:mb-12">
          <p className="md:text-4xl lg:text-xl text-white/95 max-w-4xl mx-auto leading-relaxed font-light drop-shadow-md">
            A sacred sanctuary of peace, prayer, and spiritual awakening where
            all souls find divine connection.
          </p>
        </div>

        {/* Mobile-optimized buttons with better touch targets */}
        {/* <div className="flex flex-col lg:flex-row gap-4 md:gap-8 md:w-full justify-center items-center">
          <Button
            variant="sacred"
            size="lg"
            className="text-base lg:text-lg md:text-4xl px-8 sm:px-10 py- lg:py-5 md:py-8 hover:scale-105 transition-all duration-300 w-full sm:w-auto lg:min-w-[200px] md:min-w-[400px] font-semibold shadow-xl border-2 border-temple-gold/30"
            onClick={onClick}>
            Join Our Community
          </Button>
          <Button
            variant="blessing"
            size="lg"
            className="text-base lg:text-lg md:text-4xl px-8 sm:px-10 py-4 lg:py-5 md:py-8 hover:scale-105 transition-all duration-300 w-full sm:w-auto lg:min-w-[200px] md:min-w-[400px] font-semibold shadow-xl"
            onClick={() =>
              toast({
                title: 'Temple Information',
                description: 'Welcome to our sacred space of devotion',
                variant: 'default',
              })
            }>
            Learn More
          </Button>
        </div> */}

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
