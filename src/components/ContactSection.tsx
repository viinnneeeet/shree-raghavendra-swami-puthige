import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Visit
            <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
              Our Temple
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We invite you to join our spiritual community. Our doors are always
            open to those seeking peace, wisdom, and divine connection.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-temple-gold/20 hover:shadow-temple transition-[var(--transition-sacred)]">
              <CardHeader>
                <CardTitle className="flex items-center text-temple-earth">
                  <MapPin className="w-5 h-5 mr-2 text-temple-gold" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  123 Sacred Path Lane<br />
                  Peaceful Valley, State 12345<br />
                  United States
                </p>
              </CardContent>
            </Card>

            <Card className="border-temple-gold/20 hover:shadow-temple transition-[var(--transition-sacred)]">
              <CardHeader>
                <CardTitle className="flex items-center text-temple-earth">
                  <Phone className="w-5 h-5 mr-2 text-temple-gold" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Main: (555) 123-4567<br />
                  Emergency: (555) 987-6543
                </p>
              </CardContent>
            </Card>

            <Card className="border-temple-gold/20 hover:shadow-temple transition-[var(--transition-sacred)]">
              <CardHeader>
                <CardTitle className="flex items-center text-temple-earth">
                  <Mail className="w-5 h-5 mr-2 text-temple-gold" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  info@sacredtemple.org<br />
                  events@sacredtemple.org
                </p>
              </CardContent>
            </Card>

            <Card className="border-temple-gold/20 hover:shadow-temple transition-[var(--transition-sacred)]">
              <CardHeader>
                <CardTitle className="flex items-center text-temple-earth">
                  <Clock className="w-5 h-5 mr-2 text-temple-gold" />
                  Temple Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground space-y-1">
                  <p>Monday - Friday: 5:00 AM - 9:00 PM</p>
                  <p>Saturday: 6:00 AM - 10:00 PM</p>
                  <p>Sunday: 5:00 AM - 10:00 PM</p>
                  <p className="text-temple-bronze font-semibold mt-2">
                    Open daily for prayer and meditation
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-temple-gold/20 shadow-sacred">
              <CardHeader>
                <CardTitle className="text-temple-earth text-2xl">
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-2 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold resize-none"
                    placeholder="How can we help you on your spiritual journey?"
                  ></textarea>
                </div>

                <Button variant="sacred" size="lg" className="w-full">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-temple-gold/10 to-temple-purple/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-temple-earth mb-2">
                  Need Immediate Assistance?
                </h3>
                <p className="text-muted-foreground mb-4">
                  For urgent spiritual counseling or emergency support
                </p>
                <Button variant="temple" size="sm">
                  Call (555) 987-6543
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;