import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

const EventsSection = () => {
  const events = [
    {
      title: "Spring Equinox Celebration",
      date: "March 20, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Main Temple Hall",
      description: "Welcome the spring season with prayers, music, and community feast",
      type: "Festival",
    },
    {
      title: "Meditation Retreat Weekend",
      date: "April 5-7, 2024",
      time: "Friday 7 PM - Sunday 5 PM",
      location: "Temple Grounds",
      description: "Three-day intensive meditation and spiritual reflection retreat",
      type: "Retreat",
    },
    {
      title: "Community Service Day",
      date: "April 15, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Various Locations",
      description: "Join us in serving local families and community organizations",
      type: "Service",
    },
    {
      title: "Full Moon Prayer Circle",
      date: "April 23, 2024",
      time: "8:00 PM - 10:00 PM",
      location: "Sacred Garden",
      description: "Monthly gathering under the full moon for prayer and reflection",
      type: "Prayer",
    },
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case "Festival":
        return "bg-temple-sunset/20 text-temple-sunset border-temple-sunset/30";
      case "Retreat":
        return "bg-temple-purple/20 text-temple-purple border-temple-purple/30";
      case "Service":
        return "bg-temple-gold/20 text-temple-gold border-temple-gold/30";
      case "Prayer":
        return "bg-temple-bronze/20 text-temple-bronze border-temple-bronze/30";
      default:
        return "bg-primary/20 text-primary border-primary/30";
    }
  };

  return (
    <section id="events" className="py-20 bg-gradient-earth">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Upcoming
            <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
              Events
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us for these sacred gatherings, celebrations, and opportunities
            for spiritual growth and community connection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {events.map((event, index) => (
            <Card
              key={index}
              className="hover:shadow-temple transition-[var(--transition-sacred)] border-temple-gold/20"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold border ${getEventColor(
                      event.type
                    )}`}
                  >
                    {event.type}
                  </span>
                </div>
                <CardTitle className="text-temple-earth text-xl">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2 text-temple-gold" />
                  {event.date}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2 text-temple-gold" />
                  {event.time}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2 text-temple-gold" />
                  {event.location}
                </div>
                <p className="text-muted-foreground">{event.description}</p>
                <Button variant="temple" className="w-full">
                  Register for Event
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-card border border-temple-gold/30 rounded-lg p-8 max-w-2xl mx-auto shadow-sacred">
            <h3 className="text-2xl font-semibold text-temple-earth mb-4">
              Stay Connected
            </h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter to receive updates about upcoming events,
              spiritual teachings, and community announcements.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
              />
              <Button variant="sacred">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;