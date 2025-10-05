import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchGallery } from '@/api/gallery';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    data: galleryImages,
    isLoading: fetchLoading,
    isError: fetchIsError,
    error: fetchError,
  } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGallery,
    staleTime: 1000 * 60 * 0.1, // 5 minutes
    refetchOnWindowFocus: true, // refetch on window focus
  });
  return (
    <section id="gallery" className="py-20 bg-gradient-earth">
      <div className="container mx-auto px-4">
        {galleryImages?.length ? (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Sacred
              <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
                Gallery
              </span>
            </h2>
            <p className="lg:text-xl md:text-4xl text-muted-foreground max-w-2xl mx-auto">
              Glimpses of our spiritual community, sacred ceremonies, and the
              peaceful atmosphere that fills our temple every day.
            </p>
          </div>
        ) : null}

        <div className="grid md:grid-cols-1 md:p-16 md:gap-8 lg:grid-cols-3 gap-6">
          {galleryImages?.length
            ? galleryImages?.map((image, index) => (
                <Card
                  key={index}
                  className="group cursor-pointer overflow-hidden border-temple-gold/20 hover:shadow-temple transition-[var(--transition-sacred)]"
                  onClick={() => setSelectedImage(image.src)}>
                  <div className="relative overflow-hidden">
                    <img
                      src={image.image_url}
                      alt={image.alt}
                      className="w-full lg:h-64 md:h-128 lg:object-cover md:object-fill group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-temple-earth/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-lg font-semibold mb-2">
                          {image?.title}
                        </h3>
                        <p className="text-sm text-white/90">
                          {image?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            : null}
        </div>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:text-temple-gold z-10"
                onClick={() => setSelectedImage(null)}>
                <X size={24} />
              </Button>
              <img
                src={selectedImage}
                alt="Enlarged gallery image"
                className="max-w-full lg:max-h-[80vh] md:max-h-svh lg:object-contain md:object-cover rounded-lg"
                onClick={() => setSelectedImage(null)}
              />
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <div className="bg-card border border-temple-gold/30 rounded-lg p-8 max-w-2xl mx-auto shadow-sacred">
            <h3 className="lg:text-2xl md:text-5xl font-semibold text-temple-earth mb-4">
              Visit Us
            </h3>
            <p className="text-muted-foreground mb-6 md:text-4xl lg:text-lg">
              Experience the peace and spiritual energy of our temple firsthand.
              All are welcome to join our community gatherings and celebrations.
            </p>
            <Button
              variant="temple"
              size="lg"
              className="md:py-8 lg:py-2 lg:text-lg md:text-4xl"
              onClick={() => {
                navigate('/plan-visit');
              }}>
              Plan Your Visit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
