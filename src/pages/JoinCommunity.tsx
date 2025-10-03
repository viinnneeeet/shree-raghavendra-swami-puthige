import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Book, Star, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FormFields } from '@/components/Forms/FormFields';
import { volunteerFormFields } from './constants';
import { COMMUNITY_BENEFITS, TEMPLE_HISTORY } from '@/common/appConstants';
import { VolunteerFormData } from '@/types/volunteer';
import { MISSION_POINTS } from '@/common/appConstants';

const JoinCommunity = () => {
  const [formData, setFormData] = useState<VolunteerFormData>({
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

  const isDisabled = () => {
    let isDisable = false;

    if (
      !formData?.name ||
      !formData?.address ||
      !formData?.email ||
      !formData?.phone ||
      !formData?.interests ||
      !formData?.availability
    ) {
      isDisable = true;
    }
    return isDisable;
  };

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
          <p className="lg:text-xl md:text-4xl text-muted-foreground max-w-2xl mx-auto">
            Become part of our spiritual family and contribute to the temple's
            mission of spreading divine grace and community service.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <Card className="border-temple-gold/20 shadow-sacred mb-8">
              <CardHeader>
                <CardTitle className="lg:text-2xl md:text-5xl text-temple-earth">
                  Our Temple History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 lg:text-xl md:text-4xl">
                  Shree Raghavendra Swami Temple has been a beacon of spiritual
                  light for nearly four decades, serving devotees and the
                  community with unwavering dedication to spiritual growth and
                  social service.
                </p>

                <div className="lg:space-y-4 md:space-y-8">
                  {TEMPLE_HISTORY.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start lg:space-x-4 md:space-x-8">
                      <Badge
                        variant="outline"
                        className="border-temple-gold text-temple-gold min-w-fit lg:text-sm md:text-4xl">
                        {item.year}
                      </Badge>
                      <div>
                        <h4 className="font-semibold lg:text-sm md:text-4xl text-temple-earth">
                          {item.event}
                        </h4>
                        <p className="lg:text-sm md:text-4xl text-muted-foreground">
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
                <CardTitle className="lg:text-2xl md:text-5xl text-temple-earth">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 lg:text-base md:text-4xl">
                  To create a sacred space where individuals can connect with
                  the divine, learn ancient wisdom, and serve the community with
                  love and compassion.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  {MISSION_POINTS?.map((point, index) => (
                    <li
                      className="flex items-center md:text-4xl lg:text-lg"
                      key={index}>
                      <Star className="lg:w-4 lg:h-4 md:w-8 md:h-8 mr-2 text-temple-gold " />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Membership Form */}
          <Card className="border-temple-gold/20 shadow-sacred">
            <CardHeader>
              <CardTitle className="lg:text-2xl md:text-5xl text-temple-earth">
                Community Membership Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormFields
                fields={volunteerFormFields}
                formData={formData}
                setFormData={setFormData}
                handleCheckboxChange={(id, option, checked) => {
                  setFormData({
                    ...formData,
                    [id]: checked
                      ? [...(formData[id] as string[]), option]
                      : (formData[id] as string[]).filter((i) => i !== option),
                  });
                }}
                wrapperClass={'space-y-6'}
              />
              <div className="space-y-2 mt-4">
                <Button
                  type="submit"
                  className="w-full"
                  variant="sacred"
                  onClick={handleSubmit}
                  disabled={isDisabled()}>
                  Submit Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Benefits */}
        <div>
          <h2 className="lg:text-3xl md:text-5xl font-bold text-center mb-8 text-temple-earth">
            Community Benefits
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-12 lg:gap-6">
            {COMMUNITY_BENEFITS.map((benefit, index) => (
              <Card
                key={index}
                className="border-temple-gold/20 shadow-sacred text-center">
                <CardContent className="pt-6">
                  <benefit.icon className="lg:w-12 lg:h-12 md:h-24 md:w-24 mx-auto mb-4 text-temple-gold" />
                  <h3 className="font-semibold text-temple-earth mb-2 lg:text-lg md:text-4xl">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground lg:text-base md:text-3xl">
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
            <CardTitle className="lg:text-2xl md:text-5xl text-temple-earth text-center">
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <MapPin className="lg:w-8 lg:h-8 md:h-16 md:w-16 text-temple-gold" />
                <h4 className="font-semibold text-temple-earth lg:text-base md:text-5xl">
                  Visit Us
                </h4>
                <p className="lg:text-sm md:text-4xl text-muted-foreground">
                  123 Divine Path, Sacred Hills
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Clock className="lg:w-8 lg:h-8 md:h-16 md:w-16 text-temple-gold" />
                <h4 className="font-semibold text-temple-earth lg:text-base md:text-5xl">
                  Office Hours
                </h4>
                <p className="lg:text-sm md:text-4xl text-muted-foreground">
                  Mon-Fri: 9 AM - 6 PM
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Users className="lg:w-8 lg:h-8 md:h-16 md:w-16 text-temple-gold" />
                <h4 className="font-semibold text-temple-earth lg:text-base md:text-5xl">
                  Community
                </h4>
                <p className="lg:text-sm md:text-4xl text-muted-foreground">
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
