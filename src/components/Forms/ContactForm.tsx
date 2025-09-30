import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  };
  const [state, setState] = useState(initialState);
  const { toast } = useToast();
  const handleChange = (key: string, value: string) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    toast({
      title: 'Contact Form Submitted',
      description: 'Our team will reach out to you',
      variant: 'success',
    });
    setState(initialState);
  };
  return (
    <div>
      <Card className="border-temple-gold/20 shadow-sacred">
        <CardHeader>
          <CardTitle className="text-temple-earth lg:text-2xl md:text-5xl">
            Send Us a Message
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block lg:text-sm md:text-4xl font-medium text-foreground mb-2">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-4 lg:py-2 md:py-6 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
                value={state?.firstName || ''}
                name="firstName"
                onChange={(e) => {
                  handleChange(e?.target?.name, e?.target?.value);
                }}
              />
            </div>
            <div>
              <label className="block lg:text-sm md:text-4xl font-medium text-foreground mb-2">
                Last Name
              </label>
              <input
                type="text"
                className="w-full lg:py-2 md:py-6 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
                value={state?.lastName || ''}
                name="lastName"
                onChange={(e) => {
                  handleChange(e?.target?.name, e?.target?.value);
                }}
              />
            </div>
          </div>

          <div>
            <label className="block lg:text-sm md:text-4xl font-medium md:font-extrabold text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full lg:py-2 md:py-6 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
              value={state?.email || ''}
              name="email"
              onChange={(e) => {
                handleChange(e?.target?.name, e?.target?.value);
              }}
            />
          </div>

          <div>
            <label className="block lg:text-sm md:text-4xl font-medium text-foreground mb-2">
              Phone (Optional)
            </label>
            <input
              type="tel"
              className="w-full lg:py-2 md:py-6 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
              value={state?.phone || ''}
              name="phone"
              onChange={(e) => {
                handleChange(e?.target?.name, e?.target?.value);
              }}
            />
          </div>

          <div>
            <label className="block lg:text-sm md:text-4xl font-medium text-foreground mb-2">
              Message
            </label>
            <textarea
              rows={5}
              className="w-full lg:py-2 md:py-6 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold resize-none md:placeholder:text-3xl lg:placeholder:text-sm"
              placeholder="How can we help you on your spiritual journey?"
              value={state?.message || ''}
              name="message"
              onChange={(e) => {
                handleChange(e?.target?.name, e?.target?.value);
              }}></textarea>
          </div>

          <Button
            variant="sacred"
            size="lg"
            className="w-full"
            onClick={handleSubmit}
            disabled={
              !state?.email ||
              !state?.firstName ||
              !state?.lastName ||
              !state?.message
            }>
            Send Message
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
