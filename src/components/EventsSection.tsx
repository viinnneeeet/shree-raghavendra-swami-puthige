import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { isValidEmail } from '@/common/commonFuction';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { TempleEvent } from '@/types/events';
import { Input } from './ui/input';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '@/api/events';

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [state, setState] = useState({
    subscribeEmail: '',
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    data: eventsData,
    isLoading: eventsIsLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // refetch on window focus
  });
  useEffect(() => {
    const upcoming = getUpcomingEvents(eventsData);
    setEvents(upcoming);
  }, []);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'Festival':
        return 'bg-temple-sunset/20 text-temple-sunset border-temple-sunset/30';
      case 'Retreat':
        return 'bg-temple-purple/20 text-temple-purple border-temple-purple/30';
      case 'Service':
        return 'bg-temple-gold/20 text-temple-gold border-temple-gold/30';
      case 'Prayer':
        return 'bg-temple-bronze/20 text-temple-bronze border-temple-bronze/30';
      default:
        return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const getUpcomingEvents = (events: TempleEvent[], count = 4) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset time → compare only date

    return events
      .filter((event) => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, count);
  };

  const handleChange = (key: string, value: string) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    if (isValidEmail(state?.subscribeEmail)) {
      toast({
        title: 'Subscribed to our Events',
        description: 'Our team will reach out to you',
        variant: 'success',
      });
      handleChange('subscribeEmail', '');
    } else {
      toast({
        title: 'Invalid Email',
        description: '',
        variant: 'danger',
      });
    }
  };

  return (
    <section
      id="events"
      className={classNames('bg-gradient-earth pb-20', {
        'pt-20': events?.length,
      })}>
      <div className="container mx-auto px-4">
        {events?.length ? (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Upcoming
              <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
                Events
              </span>
            </h2>
            <p className="lg:text-xl md:text-4xl text-muted-foreground max-w-2xl mx-auto">
              Join us for these sacred gatherings, celebrations, and
              opportunities for spiritual growth and community connection.
            </p>
          </div>
        ) : null}

        <div className="grid md:grid-cols-1 md:p-16 lg:grid-cols-2 md:gap-16 lg:gap-8 mb-12">
          {events?.map((event, index) => (
            <Card
              key={index}
              className="hover:shadow-temple hover:scale-105 transition-all duration-500 border-temple-gold/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between lg:mb-4 md:mb-8">
                  <span
                    className={`px-3 py-1 rounded-full lg:text-sm md:text-4xl font-semibold border ${getEventColor(
                      event.type
                    )}`}>
                    {event.type}
                  </span>
                </div>
                <CardTitle className="text-temple-earth lg:text-xl md:text-5xl">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="lg:space-y-4 md:space-y-8">
                <div className="flex items-center text-muted-foreground lg:text-lg md:text-4xl">
                  <Calendar className="lg:w-4 lg:h-4 md:w-10 md:h-10 mr-2 text-temple-gold " />
                  {event.date}
                </div>
                <div className="flex items-center text-muted-foreground lg:text-lg md:text-4xl">
                  <Clock className="lg:w-4 lg:h-4 md:w-10 md:h-10 mr-2 text-temple-gold" />
                  {event.time}
                </div>
                <div className="flex items-center text-muted-foreground lg:text-lg md:text-4xl">
                  <MapPin className="lg:w-4 lg:h-4 md:w-10 md:h-10 mr-2 text-temple-gold" />
                  {event.location}
                </div>
                <p className="text-muted-foreground lg:text-lg md:text-4xl">
                  {event.description}
                </p>
                <Button
                  variant="temple"
                  className="w-full"
                  onClick={() => {
                    navigate('/register-event');
                  }}>
                  Register for Event
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-card border border-temple-gold/30 rounded-lg p-8 max-w-2xl mx-auto shadow-sacred">
            <h3 className="lg:text-2xl md:text-5xl font-semibold text-temple-earth mb-4">
              Stay Connected
            </h3>
            <p className="lg:text-lg md:text-4xl text-muted-foreground mb-6">
              Subscribe to our newsletter to receive updates about upcoming
              events, spiritual teachings, and community announcements.
            </p>
            <div className="flex gap-2 lg:max-w-md md:max-w-5xl mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:px-4 lg:py-2 md:py-4 md:px-4 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
                value={state?.subscribeEmail || ''}
                name="subscribeEmail"
                onChange={(e) => {
                  const value = e?.target?.value;
                  handleChange(e?.target?.name, value);
                }}
              />
              <Button
                variant="sacred"
                disabled={!state?.subscribeEmail}
                className=""
                onClick={handleSubmit}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
