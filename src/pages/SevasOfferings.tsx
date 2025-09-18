import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Utensils, Flower, Gift, Star, Users } from 'lucide-react';

const SevasOfferings = () => {
  const sevas = [
    {
      icon: Utensils,
      title: 'Annadana Seva',
      description: 'Sponsor meals for devotees and serve the community',
      amount: '₹2,100',
      duration: 'Daily',
      benefits: ['Community service', 'Blessed food distribution', 'Karma yoga']
    },
    {
      icon: Flower,
      title: 'Daily Pooja Seva',
      description: 'Sponsor daily prayers and rituals for spiritual blessings',
      amount: '₹501',
      duration: 'One day',
      benefits: ['Personal prayers', 'Divine blessings', 'Spiritual merit']
    },
    {
      icon: Star,
      title: 'Temple Decoration',
      description: 'Beautify the temple with flowers and decorative items',
      amount: '₹1,008',
      duration: 'Weekly',
      benefits: ['Aesthetic enhancement', 'Festival preparation', 'Divine atmosphere']
    },
    {
      icon: Gift,
      title: 'Prasada Seva',
      description: 'Sponsor sacred food offerings for all devotees',
      amount: '₹751',
      duration: 'One day',
      benefits: ['Blessed food', 'Community sharing', 'Divine grace']
    },
    {
      icon: Heart,
      title: 'Special Abhisheka',
      description: 'Sacred bath ceremony for the deity with holy materials',
      amount: '₹3,008',
      duration: 'Monthly',
      benefits: ['Spiritual purification', 'Personal prayers', 'Divine connection']
    },
    {
      icon: Users,
      title: 'Festival Sponsorship',
      description: 'Support major temple festivals and celebrations',
      amount: '₹5,100',
      duration: 'Annual',
      benefits: ['Festival organization', 'Community celebration', 'Cultural preservation']
    }
  ];

  const offerings = [
    { item: 'Fresh Fruits', price: '₹101', description: 'Seasonal fruits offering' },
    { item: 'Coconut & Flowers', price: '₹51', description: 'Traditional temple offering' },
    { item: 'Incense & Camphor', price: '₹31', description: 'Aromatic worship materials' },
    { item: 'Sacred Thread', price: '₹21', description: 'Blessed protection thread' }
  ];

  return (
    <Layout>
      <section className="py-20 bg-gradient-earth">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Sevas &
              <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
                Offerings
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Participate in sacred services and make offerings to receive divine blessings and contribute to temple activities.
            </p>
          </div>

          {/* Sevas Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-temple-earth">Sacred Sevas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sevas.map((seva, index) => (
                <Card key={index} className="border-temple-gold/20 shadow-sacred hover:shadow-temple transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <seva.icon className="w-8 h-8 text-temple-gold" />
                      <Badge variant="outline" className="border-temple-gold text-temple-gold">
                        {seva.duration}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-temple-earth">{seva.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{seva.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-temple-gold">{seva.amount}</span>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-temple-earth mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {seva.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center">
                            <Star className="w-3 h-3 mr-2 text-temple-gold" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full" variant="temple">
                      Book This Seva
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Offerings Section */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-8 text-temple-earth">Temple Offerings</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {offerings.map((offering, index) => (
                <Card key={index} className="border-temple-gold/20 shadow-sacred">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="font-semibold text-temple-earth mb-2">{offering.item}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{offering.description}</p>
                      <div className="text-lg font-bold text-temple-gold mb-4">{offering.price}</div>
                      <Button size="sm" variant="sacred" className="w-full">
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Note about payments */}
          <Card className="mt-12 border-temple-gold/20 shadow-sacred">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-temple-earth mb-4">Online Payment Information</h3>
                <p className="text-muted-foreground mb-4">
                  Secure online payment processing will be available once our payment system is configured. 
                  For now, please visit the temple directly or contact us for donation arrangements.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" className="border-temple-gold/30">
                    Contact Temple
                  </Button>
                  <Button variant="temple">
                    Visit Temple
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default SevasOfferings;