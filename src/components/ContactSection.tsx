import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from './Forms/ContactForm';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="lg:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Visit
            <span className="bg-gradient-to-r md:text-5xl from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
              Our Temple
            </span>
          </h2>
          <p className="lg:text-xl md:text-4xl text-muted-foreground max-w-2xl mx-auto">
            We invite you to join our spiritual community. Our doors are always
            open to those seeking peace, wisdom, and divine connection.
          </p>
        </div>

        <div className="grid md:grid-cols-1 md:p-16 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-temple-gold/20 hover:shadow-temple transition-[var(--transition-sacred)]">
              <CardHeader>
                <CardTitle className="flex items-center text-temple-earth md:text-5xl lg:text-xl">
                  <MapPin className="lg:w-5 lg:h-5 md:w-10 md:h-10 mr-2 text-temple-gold" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground md:text-4xl lg:text-base">
                  Shree Raghavendra Swami Temple
                  <br />
                  Puttige Moodbidri,
                  <br />
                  Karnataka 574227
                </p>
              </CardContent>
            </Card>

            <Card className="border-temple-gold/20 hover:shadow-temple transition-[var(--transition-sacred)]">
              <CardHeader>
                <CardTitle className="flex items-center text-temple-earth  md:text-5xl lg:text-xl">
                  <Phone className="lg:w-5 lg:h-5 md:w-10 md:h-10 mr-2 text-temple-gold" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground md:text-4xl lg:text-base">
                  Main: (+91) 84336 21215
                  <br />
                </p>
              </CardContent>
            </Card>

            <Card className="border-temple-gold/20 hover:shadow-temple transition-[var(--transition-sacred)]">
              <CardHeader>
                <CardTitle className="flex items-center text-temple-earth md:text-5xl lg:text-xl">
                  <Mail className="lg:w-5 lg:h-5 md:w-10 md:h-10 mr-2 text-temple-gold" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground md:text-4xl lg:text-base">
                  info@raghavendra-temple.org
                  <br />
                  events@raghavendra-temple.org
                </p>
              </CardContent>
            </Card>

            <Card className="border-temple-gold/20 hover:shadow-temple transition-[var(--transition-sacred)]">
              <CardHeader>
                <CardTitle className="flex items-center text-temple-earth md:text-5xl lg:text-xl">
                  <Clock className="lg:w-5 lg:h-5 md:w-10 md:h-10 mr-2 text-temple-gold" />
                  Temple Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground space-y-1 md:text-4xl lg:text-base">
                  <p>Monday - Friday: 5:00 AM - 9:00 PM</p>
                  <p>Saturday: 6:00 AM - 10:00 PM</p>
                  <p>Sunday: 5:00 AM - 10:00 PM</p>
                  <p className="text-temple-bronze font-semibold mt-2">
                    Open daily for prayer
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <ContactForm />
          {/* <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-temple-gold/10 to-temple-purple/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-temple-earth mb-2">
                  Any Queries?
                </h3>
                <p className="text-muted-foreground mb-4"></p>
                <Button variant="temple" size="sm">
                  Call (+91) 8433621215
                </Button>
              </div>
            </div> */}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
