import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const RegisterEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event: '',
    message: ''
  });
  const { toast } = useToast();

  const events = [
    'Spring Equinox Celebration',
    'Meditation Retreat Weekend', 
    'Community Service Day',
    'Full Moon Prayer Circle'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Registration Submitted',
      description: 'We will contact you with confirmation details.',
      variant: 'default',
    });
    setFormData({ name: '', email: '', phone: '', event: '', message: '' });
  };

  return (
    <Layout>
      <section className="py-20 bg-gradient-sacred min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Register for
              <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
                Events
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join us for sacred gatherings and spiritual experiences at our temple.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto border-temple-gold/20 shadow-sacred">
            <CardHeader>
              <CardTitle className="text-2xl text-temple-earth text-center">
                Event Registration Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-temple-gold/30 focus:ring-temple-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-temple-gold/30 focus:ring-temple-gold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="border-temple-gold/30 focus:ring-temple-gold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event">Select Event *</Label>
                  <Select value={formData.event} onValueChange={(value) => setFormData({ ...formData, event: value })}>
                    <SelectTrigger className="border-temple-gold/30">
                      <SelectValue placeholder="Choose an event" />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map((event) => (
                        <SelectItem key={event} value={event}>
                          {event}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Special Requirements (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                    className="border-temple-gold/30 focus:ring-temple-gold"
                  />
                </div>

                <Button type="submit" className="w-full" variant="sacred">
                  Register for Event
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterEvent;