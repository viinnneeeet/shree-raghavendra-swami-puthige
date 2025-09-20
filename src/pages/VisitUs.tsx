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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Visit
            <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
              Our Temple
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Come experience divine peace and spiritual serenity at Shree
            Raghavendra Swami Temple.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Address & Contact */}
          <Card className="border-temple-gold/20 shadow-sacred">
            <CardHeader>
              <CardTitle className="text-2xl text-temple-earth flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-temple-gold" />
                Address & Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-temple-earth mb-2">
                  Temple Address
                </h3>
                <p className="text-muted-foreground">
                  Shree Raghavendra Swami Temple
                  <br />
                  Puttige Moodbidri, Karnataka 574227
                  <br />
                  India
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-temple-gold" />
                <span className="text-muted-foreground">+91 84336 21215</span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-temple-gold" />
                <span className="text-muted-foreground">
                  info@raghavendra-temple.org
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Temple Timings */}
          <Card className="border-temple-gold/20 shadow-sacred">
            <CardHeader>
              <CardTitle className="text-2xl text-temple-earth flex items-center">
                <Clock className="w-6 h-6 mr-3 text-temple-gold" />
                Temple Timings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timings.map((timing, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-temple-gold/10 last:border-b-0">
                    <span className="font-medium text-temple-earth">
                      {timing.day}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {timing.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-temple-gold/10 rounded-lg">
                <p className="text-sm text-muted-foreground">
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
            <CardTitle className="text-2xl text-temple-earth">
              Location Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-temple-gold/20 to-temple-purple/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-temple-gold" />
                <p className="text-muted-foreground">
                  Interactive map will be available here
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Google Maps integration coming soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Facilities */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8 text-temple-earth">
            Temple Facilities
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <Card
                key={index}
                className="border-temple-gold/20 shadow-sacred hover:shadow-temple transition-shadow">
                <CardContent className="text-center pt-6">
                  <facility.icon className="w-12 h-12 mx-auto mb-4 text-temple-gold" />
                  <h3 className="font-semibold text-temple-earth mb-2">
                    {facility.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
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
