import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Book, Star, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const JoinCommunity = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    interests: [] as string[],
    experience: '',
    availability: '',
    message: '',
  });
  const { toast } = useToast();

  const interests = [
    'Daily Prayers & Aarti',
    'Festival Organization',
    'Community Service',
    'Teaching & Education',
    'Music & Bhajans',
    'Temple Maintenance',
    'Event Management',
    'Youth Programs',
  ];

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, interest]
        : prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Application Submitted',
      description: 'Thank you for your interest! We will contact you soon.',
      variant: 'default',
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      interests: [],
      experience: '',
      availability: '',
      message: '',
    });
  };

  const templeHistory = [
    {
      year: '1985',
      event: 'Temple Foundation',
      description: 'Established by devoted spiritual seekers',
    },
    {
      year: '1990',
      event: 'First Major Festival',
      description: 'Celebrated first grand Raghavendra Jayanti',
    },
    {
      year: '2000',
      event: 'Community Expansion',
      description: 'Built community hall and education center',
    },
    {
      year: '2015',
      event: 'Digital Outreach',
      description: 'Launched online services and virtual programs',
    },
  ];

  const communityBenefits = [
    {
      icon: Heart,
      title: 'Spiritual Growth',
      description: 'Regular prayers, meditation, and spiritual guidance',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Strong network of like-minded spiritual seekers',
    },
    {
      icon: Book,
      title: 'Learning Opportunities',
      description: 'Educational programs on scriptures and traditions',
    },
    {
      icon: Star,
      title: 'Service Opportunities',
      description: 'Participate in community service and temple activities',
    },
  ];

  return (
    <section className="py-20 bg-gradient-sacred">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Join Our
            <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
              Community
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Become part of our spiritual family and contribute to the temple's
            mission of spreading divine grace and community service.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Temple History & Mission */}
          <div>
            <Card className="border-temple-gold/20 shadow-sacred mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-temple-earth">
                  Our Temple History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Shree Raghavendra Swami Temple has been a beacon of spiritual
                  light for nearly four decades, serving devotees and the
                  community with unwavering dedication to spiritual growth and
                  social service.
                </p>

                <div className="space-y-4">
                  {templeHistory.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <Badge
                        variant="outline"
                        className="border-temple-gold text-temple-gold min-w-fit">
                        {item.year}
                      </Badge>
                      <div>
                        <h4 className="font-semibold text-temple-earth">
                          {item.event}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-temple-gold/20 shadow-sacred">
              <CardHeader>
                <CardTitle className="text-2xl text-temple-earth">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  To create a sacred space where individuals can connect with
                  the divine, learn ancient wisdom, and serve the community with
                  love and compassion.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-temple-gold" />
                    Preserve and share spiritual traditions
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-temple-gold" />
                    Foster community unity and support
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-temple-gold" />
                    Provide spiritual guidance and education
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-temple-gold" />
                    Serve humanity through selfless service
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Membership Form */}
          <Card className="border-temple-gold/20 shadow-sacred">
            <CardHeader>
              <CardTitle className="text-2xl text-temple-earth">
                Community Membership Form
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
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
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
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className="border-temple-gold/30 focus:ring-temple-gold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="border-temple-gold/30 focus:ring-temple-gold"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Areas of Interest (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {interests.map((interest) => (
                      <div
                        key={interest}
                        className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={formData.interests.includes(interest)}
                          onCheckedChange={(checked) =>
                            handleInterestChange(interest, checked as boolean)
                          }
                        />
                        <Label htmlFor={interest} className="text-sm">
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select
                    value={formData.availability}
                    onValueChange={(value) =>
                      setFormData({ ...formData, availability: value })
                    }>
                    <SelectTrigger className="border-temple-gold/30">
                      <SelectValue placeholder="Select your availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekdays">Weekdays</SelectItem>
                      <SelectItem value="weekends">Weekends Only</SelectItem>
                      <SelectItem value="evenings">
                        Evenings After Work
                      </SelectItem>
                      <SelectItem value="flexible">
                        Flexible Schedule
                      </SelectItem>
                      <SelectItem value="festivals">
                        Festivals & Special Events
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Why do you want to join our community?
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Share your spiritual journey and motivations..."
                    className="border-temple-gold/30 focus:ring-temple-gold"
                  />
                </div>

                <Button type="submit" className="w-full" variant="sacred">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Community Benefits */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8 text-temple-earth">
            Community Benefits
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityBenefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-temple-gold/20 shadow-sacred text-center">
                <CardContent className="pt-6">
                  <benefit.icon className="w-12 h-12 mx-auto mb-4 text-temple-gold" />
                  <h3 className="font-semibold text-temple-earth mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <Card className="mt-12 border-temple-gold/20 shadow-sacred">
          <CardHeader>
            <CardTitle className="text-2xl text-temple-earth text-center">
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <MapPin className="w-8 h-8 text-temple-gold" />
                <h4 className="font-semibold text-temple-earth">Visit Us</h4>
                <p className="text-sm text-muted-foreground">
                  123 Divine Path, Sacred Hills
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Clock className="w-8 h-8 text-temple-gold" />
                <h4 className="font-semibold text-temple-earth">
                  Office Hours
                </h4>
                <p className="text-sm text-muted-foreground">
                  Mon-Fri: 9 AM - 6 PM
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Users className="w-8 h-8 text-temple-gold" />
                <h4 className="font-semibold text-temple-earth">Community</h4>
                <p className="text-sm text-muted-foreground">
                  1000+ Active Members
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default JoinCommunity;
