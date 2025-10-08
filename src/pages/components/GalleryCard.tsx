import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ZoomIn } from 'lucide-react';

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

const GalleryCard = ({ image, index, setSelectedImage }) => {
  return (
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
          className={`absolute capitalize top-3 right-3 border ${getCategoryColor(
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
  );
};

export default GalleryCard;
