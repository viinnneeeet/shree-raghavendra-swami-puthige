import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Phone, Mail, Car, Users } from 'lucide-react';

const VisitUs = () => {
  const timings = [
    { day: 'Monday - Friday', time: '6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM' },
    { day: 'Saturday - Sunday', time: '6:00 AM - 8:00 PM' },
    { day: 'Festival Days', time: '5:00 AM - 9:00 PM' },
  ];

  const facilities = [
    {
      icon: Car,
      title: 'Free Parking',
      description: 'Ample parking space available for devotees',
    },
    {
      icon: Users,
      title: 'Rest Areas',
      description: 'Comfortable seating areas for elderly and families',
    },
    {
      icon: MapPin,
      title: 'Prasada Counter',
      description: 'Sacred food offerings available daily',
    },
  ];

  return (
    <section className="py-20 bg-gradient-earth">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="lg:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Visit
            <span className="lg:text-4xl md:text-5xl bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
              Our Temple
            </span>
          </h1>
          <p className="lg:text-xl md:text-4xl text-muted-foreground max-w-2xl mx-auto">
            Come experience divine peace and spiritual serenity at Shree
            Raghavendra Swami Temple.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Address & Contact */}
          <Card className="border-temple-gold/20 shadow-sacred">
            <CardHeader>
              <CardTitle className="lg:text-2xl md:text-5xl text-temple-earth flex items-center">
                <MapPin className="lg:w-6 lg:h-6 md:h-12 md:w-12 mr-3 text-temple-gold" />
                Address & Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-temple-earth mb-2 lg:text-base md:text-4xl">
                  Temple Address
                </h3>
                <p className="text-muted-foreground lg:text-base md:text-4xl">
                  Shree Raghavendra Swami Temple
                  <br />
                  Puttige Moodbidri, Karnataka 574227
                  <br />
                  India
                </p>
              </div>

              <div className="flex items-center space-x-3 lg:text-base md:text-4xl">
                <Phone className="lg:w-5 lg:h-5 md:h-10 md:w-10 text-temple-gold" />
                <a
                  href="tel:+918433621215"
                  className="text-muted-foreground hover:text-temple-gold transition-colors">
                  +91 84336 21215
                </a>
              </div>

              <div className="flex items-center space-x-3 lg:text-base md:text-4xl">
                <Mail className="lg:w-5 lg:h-5 md:h-10 md:w-10 text-temple-gold" />
                <span className="text-muted-foreground">
                  info@raghavendra-temple.org
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Temple Timings */}
          <Card className="border-temple-gold/20 shadow-sacred">
            <CardHeader>
              <CardTitle className="text-2xl text-temple-earth flex items-center  lg:text-base md:text-5xl">
                <Clock className="lg:w-6 lg:h-6 md:h-12 md:w-12 mr-3 text-temple-gold" />
                Temple Timings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timings.map((timing, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-temple-gold/10 last:border-b-0">
                    <span className="font-medium text-temple-earth  lg:text-sm md:text-4xl">
                      {timing.day}
                    </span>
                    <span className="text-muted-foreground lg:text-sm md:text-4xl">
                      {timing.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-temple-gold/10 rounded-lg">
                <p className="lg:text-sm md:text-4xl text-muted-foreground">
                  <strong>Note:</strong> Aarti timings: 7:00 AM, 12:00 PM, and
                  7:00 PM daily
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Placeholder */}
        <Card className="border-temple-gold/20 shadow-sacred mb-12">
          <CardHeader>
            <CardTitle className="lg:text-2xl md:text-5xl text-temple-earth">
              Location Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-temple-gold/20 to-temple-purple/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="lg:w-12 lg:h-12 md:h-24 md:w-24 mx-auto mb-4 text-temple-gold" />
                <p className="text-muted-foreground lg:text-sm md:text-4xl">
                  Interactive map will be available here
                </p>
                <p className="text-muted-foreground mt-2 lg:text-sm md:text-4xl">
                  Google Maps integration coming soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Facilities */}
        <div>
          <h2 className="lg:text-3xl md:text-5xl font-bold text-center mb-8 text-temple-earth">
            Temple Facilities
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <Card
                key={index}
                className="border-temple-gold/20 shadow-sacred hover:shadow-temple transition-shadow">
                <CardContent className="text-center pt-6">
                  <facility.icon className="lg:w-12 lg:h-12 md:h-24 md:w-24 mx-auto mb-4 text-temple-gold" />
                  <h3 className="font-semibold text-temple-earth mb-2 lg:text-base md:text-4xl">
                    {facility.title}
                  </h3>
                  <p className="text-muted-foreground lg:text-sm md:text-4xl">
                    {facility.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitUs;
