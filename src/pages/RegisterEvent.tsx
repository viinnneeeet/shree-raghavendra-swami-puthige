import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { EVENTS_DATA } from '@/common/appConstants';
import { FormFields } from '@/components/Forms/FormFields';
import { eventFormFields } from './constants';
import { EventRegistrationFormData } from '@/types/eventRegistration';

const RegisterEvent = () => {
  const [formData, setFormData] = useState<EventRegistrationFormData>({
    name: '',
    email: '',
    phone: '',
    event: '',
    message: '',
  });
  const { toast } = useToast();

  const [eventsOptions, setEvetsOptions] = useState([]);

  useEffect(() => {
    const options = EVENTS_DATA?.map((item) => {
      return {
        label: item?.title,
        value: item?.title,
      };
    });
    setEvetsOptions(options);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Registration Submitted',
      description: 'We will contact you with confirmation details.',
      variant: 'default',
    });
    setFormData({ name: '', email: '', phone: '', event: '', message: '' });
  };

  const isDisabled = () => {
    let isDisable = false;
    if (
      !formData?.email ||
      !formData?.name ||
      !formData?.phone ||
      !formData?.event
    ) {
      isDisable = true;
    }
    return isDisable;
  };

  return (
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
            Join us for sacred gatherings and spiritual experiences at our
            temple.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto border-temple-gold/20 shadow-sacred">
          <CardHeader>
            <CardTitle className="text-2xl text-temple-earth text-center">
              Event Registration Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormFields
              fields={eventFormFields(eventsOptions)}
              formData={formData}
              setFormData={setFormData}
              wrapperClass="space-y-6"
            />

            <Button
              type="submit"
              className="w-full mt-4"
              variant="sacred"
              disabled={isDisabled()}
              onClick={handleSubmit}>
              Register for Event
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RegisterEvent;
