import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchSevaDetails } from '@/api/sevas';
import SevaCard from './components/SevaCard';
import { formatAmount } from '@/utils/common-function';
import SkeletonCard from '@/components/ui/SkeletonCard';

const SevasOfferings = () => {
  const {
    data: sevaDetails,
    isFetching: sevaIsFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['sevas'],
    queryFn: fetchSevaDetails,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // refetch on window focus
  });

  const offerings = [
    {
      item: 'Fresh Fruits',
      price: '101',
      description: 'Seasonal fruits offering',
    },
    {
      item: 'Coconut & Flowers',
      price: '51',
      description: 'Traditional temple offering',
    },
    {
      item: 'Incense & Camphor',
      price: '31',
      description: 'Aromatic worship materials',
    },
    {
      item: 'Sacred Thread',
      price: '21',
      description: 'Blessed protection thread',
    },
  ];

  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-earth">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="lg:text-4xl md:text-8xl font-bold text-foreground mb-6">
            Sevas &
            <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3 lg:text-4xl md:text-8xl">
              Offerings
            </span>
          </h1>
          <p className="lg:text-xl md:text-4xl text-muted-foreground max-w-2xl mx-auto">
            Participate in sacred services and make offerings to receive divine
            blessings and contribute to temple activities.
          </p>
        </div>

        {/* Sevas Section */}
        <div className="mb-16">
          <h2 className="font-bold text-center mb-8 text-temple-earth lg:text-3xl md:text-8xl">
            Sacred Sevas
          </h2>
          <div className="grid md:grid-cols-1 lg:px-0 md:px-8 lg:grid-cols-3 lg:gap-6 md:gap-12">
            {sevaIsFetching ? (
              Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            ) : sevaDetails?.length ? (
              sevaDetails?.map((seva, index) => (
                <SevaCard seva={seva} key={index} />
              ))
            ) : (
              <p className="text-center text-muted-foreground col-span-full">
                No sevas available.
              </p>
            )}
          </div>
        </div>

        {/* Offerings Section */}
        <div>
          <h2 className="lg:text-3xl md:text-6xl font-bold text-center mb-8 text-temple-earth">
            Temple Offerings
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-4 md:px-16 lg:px-0 md:gap-16 lg:gap-4">
            {offerings.map((offering, index) => (
              <Card key={index} className="border-temple-gold/20 shadow-sacred">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-temple-earth mb-2 md:text-5xl lg:text-lg">
                      {offering.item}
                    </h3>
                    <p className="text-muted-foreground mb-3  md:text-4xl lg:text-sm">
                      {offering.description}
                    </p>
                    <div className="lg:text-lg font-bold text-temple-gold mb-4 md:text-5xl">
                      {offering.price ? formatAmount(+offering.price) : '-'}
                    </div>
                    <Button size="sm" variant="sacred" className="w-full">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Note about payments */}
        <Card className="mt-12 border-temple-gold/20 shadow-sacred">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="lg:text-xl  md:text-5xl font-semibold text-temple-earth mb-4">
                Online Payment Information
              </h3>
              <p className="text-muted-foreground mb-4 lg:text-sm md:text-4xl">
                Secure online payment processing will be available once our
                payment system is configured. For now, please visit the temple
                directly or contact us for donation arrangements.
              </p>
              <div className="flex justify-center space-x-4 md:mt-16 lg:mt-0">
                <Button
                  variant="outline"
                  className="border-temple-gold/30"
                  onClick={() => navigate('/#contact')}>
                  Contact Temple
                </Button>
                <Button variant="temple" onClick={() => navigate('/visit-us')}>
                  Visit Temple
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SevasOfferings;
