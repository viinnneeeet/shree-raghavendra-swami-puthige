import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { X } from 'lucide-react';

import { STATS_DATA } from '@/common/appConstants';
import { useQuery } from '@tanstack/react-query';
import { fetchGallery } from '@/api/gallery';
import GalleryCard from './components/GalleryCard';
import SkeletonCard from '@/components/ui/SkeletonCard';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const { data = {}, isFetching: galleryIsFetching } = useQuery({
    queryKey: ['gallery', { page, limit, filters }],
    queryFn: fetchGallery,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // refetch on window focus
  });
  const { galleryList = [], pagination = {} } = data;

  const handleFilters = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const categories = [
    'Spiritual',
    'Festivals',
    'Service',
    'Temple',
    'Education',
  ];

  return (
    <section className="py-20 bg-gradient-earth">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Temple
            <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
              Gallery
            </span>
          </h1>
          <p className="lg:text-xl md:text-4xl text-muted-foreground max-w-2xl mx-auto">
            Explore the beauty and spirituality of our temple through these
            sacred moments and celebrations.
          </p>
        </div>

        {/* Category Filter */}
        <Card className="mb-8 border-temple-gold/20 shadow-sacred">
          <CardContent className="pt-6">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={
                    filters?.category === category ? 'default' : 'outline'
                  }
                  className={`cursor-pointer px-4 py-2 md:text-4xl lg:text-base ${
                    filters?.category === category
                      ? 'bg-temple-gold text-white'
                      : 'border-temple-gold/30 hover:bg-temple-gold/10'
                  }`}
                  onClick={() =>
                    handleFilters(
                      'category',
                      category === 'All' ? '' : category
                    )
                  }>
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          {galleryIsFetching ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          ) : galleryList?.length ? (
            galleryList?.map((image, index) => (
              <GalleryCard
                image={image}
                index={index}
                setSelectedImage={selectedImage}
                key={index}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground col-span-full">
              No images available.
            </p>
          )}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors z-10">
                <X className="w-6 h-6 text-white" />
              </button>
              <img
                src={selectedImage}
                alt="Gallery image"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Statistics */}
        <Card className="mt-12 border-temple-gold/20 shadow-sacred">
          <CardContent className="pt-6">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 md:gap-12 lg:gap-6 text-center">
              {STATS_DATA?.map((stat, index) => (
                <div key={index}>
                  <h3
                    className={`lg:text-3xl md:text-6xl font-bold ${stat?.color} mb-2`}>
                    {stat?.value}
                  </h3>
                  <p className="text-muted-foreground md:text-3xl lg:text-base">
                    {stat?.label}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GalleryPage;
