import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Import gallery images
import galleryMeditation from "@/assets/gallery-meditation.jpg";
import galleryFestival from "@/assets/gallery-festival.jpg";
import galleryPrayer from "@/assets/gallery-prayer.jpg";
import galleryService from "@/assets/gallery-service.jpg";
import galleryGarden from "@/assets/gallery-garden.jpg";
import galleryEducation from "@/assets/gallery-education.jpg";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: galleryMeditation,
      alt: "Temple meditation hall with devotees in peaceful meditation",
      title: "Meditation & Prayer",
      description: "Daily meditation sessions in our serene temple hall"
    },
    {
      src: galleryFestival,
      alt: "Temple festival celebration with colorful decorations and community gathering",
      title: "Festival Celebrations",
      description: "Joyful community celebrations throughout the year"
    },
    {
      src: galleryPrayer,
      alt: "Temple prayer ceremony with sacred fire and traditional rituals",
      title: "Sacred Ceremonies",
      description: "Traditional prayer ceremonies and spiritual rituals"
    },
    {
      src: galleryService,
      alt: "Temple community service with volunteers helping families",
      title: "Community Service",
      description: "Serving our community with love and compassion"
    },
    {
      src: galleryGarden,
      alt: "Beautiful temple gardens with sacred lotus pond and peaceful paths",
      title: "Sacred Gardens",
      description: "Peaceful gardens for reflection and contemplation"
    },
    {
      src: galleryEducation,
      alt: "Temple children's learning class studying sacred texts",
      title: "Spiritual Education",
      description: "Learning and growing together in wisdom"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-gradient-earth">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Sacred
            <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
              Gallery
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Glimpses of our spiritual community, sacred ceremonies, and the
            peaceful atmosphere that fills our temple every day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <Card
              key={index}
              className="group cursor-pointer overflow-hidden border-temple-gold/20 hover:shadow-temple transition-[var(--transition-sacred)]"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-temple-earth/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                    <p className="text-sm text-white/90">{image.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:text-temple-gold z-10"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </Button>
              <img
                src={selectedImage}
                alt="Enlarged gallery image"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                onClick={() => setSelectedImage(null)}
              />
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <div className="bg-card border border-temple-gold/30 rounded-lg p-8 max-w-2xl mx-auto shadow-sacred">
            <h3 className="text-2xl font-semibold text-temple-earth mb-4">
              Visit Us
            </h3>
            <p className="text-muted-foreground mb-6">
              Experience the peace and spiritual energy of our temple firsthand.
              All are welcome to join our community gatherings and celebrations.
            </p>
            <Button variant="temple" size="lg">
              Plan Your Visit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;