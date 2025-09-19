import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

// Import images
import galleryMeditation from '@/assets/images/gallery-meditation.jpg';
import galleryFestival from '@/assets/images/gallery-festival.jpg';
import galleryPrayer from '@/assets/images/gallery-prayer.jpg';
import galleryService from '@/assets/images/gallery-service.jpg';
import galleryGarden from '@/assets/images/gallery-garden.jpg';
import galleryEducation from '@/assets/images/gallery-education.jpg';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const galleryImages = [
    {
      src: galleryMeditation,
      title: 'Meditation Sessions',
      category: 'Spiritual',
      description: 'Peaceful meditation in the sacred garden',
    },
    {
      src: galleryFestival,
      title: 'Festival Celebrations',
      category: 'Festivals',
      description: 'Vibrant festivals bringing community together',
    },
    {
      src: galleryPrayer,
      title: 'Prayer Gatherings',
      category: 'Spiritual',
      description: 'Devotees in deep prayer and contemplation',
    },
    {
      src: galleryService,
      title: 'Community Service',
      category: 'Service',
      description: 'Serving the community with love and dedication',
    },
    {
      src: galleryGarden,
      title: 'Sacred Gardens',
      category: 'Temple',
      description: 'Beautiful temple gardens for peaceful reflection',
    },
    {
      src: galleryEducation,
      title: 'Educational Programs',
      category: 'Education',
      description: 'Teaching spiritual wisdom to all ages',
    },
    // Add more images as needed - using same images with different contexts
    {
      src: galleryMeditation,
      title: 'Morning Aarti',
      category: 'Spiritual',
      description: 'Daily morning prayers and aarti ceremony',
    },
    {
      src: galleryFestival,
      title: 'Diwali Celebration',
      category: 'Festivals',
      description: 'Festival of lights celebrated with joy',
    },
    {
      src: galleryPrayer,
      title: 'Evening Prayers',
      category: 'Spiritual',
      description: 'Serene evening prayer sessions',
    },
  ];

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
      : galleryImages.filter((img) => img.category === selectedCategory);

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
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                  className={`cursor-pointer px-4 py-2 ${
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <Card
              key={index}
              className="group border-temple-gold/20 shadow-sacred hover:shadow-temple transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setSelectedImage(image.src)}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors">
                    <ZoomIn className="w-6 h-6 text-white" />
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
                <h3 className="font-semibold text-temple-earth mb-2">
                  {image.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {image.description}
                </p>
              </CardContent>
            </Card>
          ))}
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
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <h3 className="text-3xl font-bold text-temple-gold mb-2">
                  500+
                </h3>
                <p className="text-muted-foreground">Photos Captured</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-temple-purple mb-2">
                  50+
                </h3>
                <p className="text-muted-foreground">Events Documented</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-temple-sunset mb-2">
                  25+
                </h3>
                <p className="text-muted-foreground">Festivals Celebrated</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-temple-earth mb-2">
                  1000+
                </h3>
                <p className="text-muted-foreground">Community Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GalleryPage;
