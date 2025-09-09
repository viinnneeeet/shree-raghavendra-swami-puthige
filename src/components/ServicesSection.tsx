import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = [
    {
      title: "Daily Prayers",
      time: "5:00 AM - 9:00 PM",
      description: "Join us for morning and evening prayers in our sacred sanctuary",
      icon: "🙏",
    },
    {
      title: "Meditation Sessions",
      time: "6:00 AM & 7:00 PM",
      description: "Guided meditation for inner peace and spiritual awakening",
      icon: "🧘‍♀️",
    },
    {
      title: "Scripture Study",
      time: "Wednesdays 7:00 PM",
      description: "Explore ancient wisdom and spiritual teachings together",
      icon: "📜",
    },
    {
      title: "Community Service",
      time: "Saturdays 9:00 AM",
      description: "Serve others through charitable activities and outreach",
      icon: "❤️",
    },
    {
      title: "Spiritual Counseling",
      time: "By Appointment",
      description: "Personal guidance and support on your spiritual journey",
      icon: "🕯️",
    },
    {
      title: "Festival Celebrations",
      time: "Various Times",
      description: "Celebrate sacred festivals with music, dance, and devotion",
      icon: "🎊",
    },
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Sacred
            <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
              Services
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the various ways we come together in worship, learning,
            and service to our community and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-temple transition-[var(--transition-sacred)] border-temple-gold/20 group"
            >
              <CardHeader className="text-center">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <CardTitle className="text-temple-earth text-xl">
                  {service.title}
                </CardTitle>
                <div className="text-temple-bronze font-semibold">
                  {service.time}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-temple-gold/10 to-temple-purple/10 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-temple-earth mb-4">
              First Time Visiting?
            </h3>
            <p className="text-muted-foreground mb-6">
              We welcome all souls seeking spiritual growth. Our doors are always
              open to those who come with sincere hearts.
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

export default ServicesSection;