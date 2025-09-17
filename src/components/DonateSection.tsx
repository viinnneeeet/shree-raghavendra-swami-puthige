import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Heart,
  Home,
  BookOpen,
  Users,
  Utensils,
  Lightbulb,
} from 'lucide-react';
import DonationForm from './Forms/DonationForm';

const DonateSection = () => {
  const donationCauses = [
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Temple Maintenance',
      description:
        'Help maintain our sacred spaces and ensure they remain beautiful for all who visit',
      color: 'text-temple-gold',
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Educational Programs',
      description:
        'Support spiritual education and learning programs for all ages',
      color: 'text-temple-purple',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Outreach',
      description:
        'Fund our community service initiatives and charitable activities',
      color: 'text-temple-bronze',
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: 'Community Kitchen',
      description:
        'Provide meals for those in need and support our free meal programs',
      color: 'text-temple-sunset',
    },
  ];

  return (
    <section id="donate" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Support Our
            <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
              Sacred Mission
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your generous contributions help us maintain our temple, support our
            community, and continue sharing spiritual wisdom with all who seek
            it.
          </p>
        </div>

        {/* Donation Causes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {donationCauses.map((cause, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-temple transition-[var(--transition-sacred)] border-temple-gold/20">
              <CardHeader>
                <div className={`mx-auto mb-4 ${cause.color}`}>
                  {cause.icon}
                </div>
                <CardTitle className="text-temple-earth text-lg">
                  {cause.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {cause.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Donation Form */}
        <DonationForm />

        {/* Impact Statement */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-temple-gold/10 to-temple-purple/10 rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-temple-earth mb-4">
              Your Impact
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-temple-gold mb-2">
                  1,200+
                </div>
                <p className="text-muted-foreground">
                  Community Members Served
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-temple-purple mb-2">
                  500+
                </div>
                <p className="text-muted-foreground">Meals Provided Monthly</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-temple-bronze mb-2">
                  50+
                </div>
                <p className="text-muted-foreground">Educational Programs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;
