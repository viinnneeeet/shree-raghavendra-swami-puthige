import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

import { STATS_DATA } from '@/common/appConstants';
import { useQuery } from '@tanstack/react-query';
import { fetchGallery } from '@/api/gallery';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const {
    data: galleryImages,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGallery,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // refetch on window focus
  });

  const categories = [
    'All',
    'Spiritual',
    'Festivals',
    'Service',
    'Temple',
    'Education',
  ];

  const filteredImages =
    selectedCategory === 'All'
      ? galleryImages
      : galleryImages?.filter(
          (img) =>
            img.category?.toLowerCase() === selectedCategory?.toLowerCase()
        );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Festivals':
        return 'bg-temple-sunset/20 text-temple-sunset border-temple-sunset/30';
      case 'Spiritual':
        return 'bg-temple-purple/20 text-temple-purple border-temple-purple/30';
      case 'Service':
        return 'bg-temple-gold/20 text-temple-gold border-temple-gold/30';
      case 'Temple':
        return 'bg-temple-bronze/20 text-temple-bronze border-temple-bronze/30';
      case 'Education':
        return 'bg-temple-earth/20 text-temple-earth border-temple-earth/30';
      default:
        return 'bg-primary/20 text-primary border-primary/30';
    }
  };

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
                    selectedCategory === category ? 'default' : 'outline'
                  }
                  className={`cursor-pointer px-4 py-2 md:text-4xl lg:text-base ${
                    selectedCategory === category
                      ? 'bg-temple-gold text-white'
                      : 'border-temple-gold/30 hover:bg-temple-gold/10'
                  }`}
                  onClick={() => setSelectedCategory(category)}>
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredImages?.length
            ? filteredImages?.map((image, index) => (
                <Card
                  key={index}
                  className="group border-temple-gold/20 shadow-sacred hover:shadow-temple transition-all duration-300 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full lg:h-64 md:h-180 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => setSelectedImage(image.src)}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors">
                        <ZoomIn className="lg:w-6 lg:h-6 md:h-12 md:w-12 text-white" />
                      </button>
                    </div>
                    <Badge
                      variant="outline"
                      className={`absolute top-3 right-3 border ${getCategoryColor(
                        image.category
                      )}`}>
                      {image.category}
                    </Badge>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-temple-earth mb-2 md:text-4xl lg:text-base">
                      {image.title}
                    </h3>
                    <p className="text-sm text-muted-foreground md:text-3xl lg:text-sm">
                      {image.description}
                    </p>
                  </CardContent>
                </Card>
              ))
            : null}
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
