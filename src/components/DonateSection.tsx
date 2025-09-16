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

const DonateSection = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

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

  const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

  const handleDonate = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (amount && amount > 0) {
      // Placeholder for Stripe integration
      alert(
        `Thank you for your generous donation of $${amount}! Payment integration will be implemented next.`
      );
    } else {
      alert('Please select or enter a donation amount.');
    }
  };

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
        <div className="max-w-2xl mx-auto">
          <Card className="border-temple-gold/20 shadow-sacred">
            <CardHeader className="text-center">
              <CardTitle className="text-temple-earth text-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 mr-2 text-temple-gold" />
                Make a Donation
              </CardTitle>
              <p className="text-muted-foreground">
                Every contribution, no matter the size, makes a meaningful
                difference
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Suggested Amounts */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Choose an amount:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {suggestedAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant={selectedAmount === amount ? 'temple' : 'outline'}
                      className="h-12"
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}>
                      ₹ {amount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Or enter a custom amount:
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="w-full pl-8 pr-4 py-3 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
                  />
                </div>
              </div>

              {/* Donation Type */}
              {/* <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Donation frequency:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12">
                    One-time
                  </Button>
                  <Button variant="outline" className="h-12">
                    Monthly
                  </Button>
                </div>
              </div> */}

              {/* Donor Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
                />
              </div>

              {/* Donation Message */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Share your thoughts or dedication..."
                  className="w-full px-4 py-2 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold resize-none"></textarea>
              </div>

              {/* Donate Button */}
              <Button
                variant="sacred"
                size="lg"
                className="w-full text-lg py-4"
                onClick={handleDonate}>
                <Heart className="w-5 h-5 mr-2" />
                Donate Now
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Your donation is secure and helps support our temple's mission
                of spiritual growth and community service.
              </p>
            </CardContent>
          </Card>
        </div>

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
