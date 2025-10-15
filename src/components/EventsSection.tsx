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
import EventsCard from '@/pages/components/EventsCard';
import SkeletonCard from './ui/SkeletonCard';

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [state, setState] = useState({
    subscribeEmail: '',
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    status: 'upcoming',
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data = {}, isFetching } = useQuery({
    queryKey: ['events', { page, limit, filters }],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // refetch on window focus
  });
  const { eventsList = [], pagination } = data;
  useEffect(() => {
    if (eventsList?.length) {
      setEvents(eventsList);
    }
  }, [eventsList?.length]);

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
          {isFetching
            ? Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)
            : events?.map((event, index) => (
                <EventsCard event={event} index={index} key={index} />
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
