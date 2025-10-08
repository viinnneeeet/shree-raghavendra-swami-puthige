import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useState } from 'react';
import { EVENTS_HIGHLIGHTS } from '@/common/appConstants';
import { TempleEvent } from '@/types/events';
import { fetchEvents } from '@/api/events';
import { useQuery } from '@tanstack/react-query';
import EventsCard from './components/EventsCard';
import SkeletonCard from '@/components/ui/SkeletonCard';

const EventsCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear] = useState(new Date().getFullYear());
  const { data = {}, isFetching: eventsIsFetching } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // refetch on window focus
  });

  const { eventsList = [], pagination = {} } = data;
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getEventsForMonth = (month: number) => {
    return eventsList?.length
      ? eventsList?.filter((event: TempleEvent) => {
          const eventDate = new Date(event.date);
          return eventDate.getMonth() === month;
        })
      : [];
  };

  return (
    <section className="py-20 bg-gradient-sacred">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="lg:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Events
            <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
              Calendar
            </span>
          </h1>
          <p className="lg:text-xl md:text-4xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with all upcoming temple events, festivals, and
            spiritual gatherings throughout the year.
          </p>
        </div>

        {/* Month Selection */}
        <Card className="mb-8 border-temple-gold/20 shadow-sacred">
          <CardHeader>
            <CardTitle className="lg:text-2xl md:text-4xl text-temple-earth flex items-center">
              <Calendar className="lg:w-6 lg:h-6 md:w-12 md:h-12 mr-3 text-temple-gold" />
              Select Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-6 md:grid-cols-4 gap-2">
              {months.map((month, index) => (
                <Button
                  key={index}
                  variant={selectedMonth === index ? 'temple' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedMonth(index)}
                  className={
                    selectedMonth === index
                      ? ''
                      : 'border-temple-gold/30 hover:bg-temple-gold/10'
                  }>
                  {month.slice(0, 3)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Events Display */}
        <div>
          <h2 className="lg:text-3xl md:text-5xl font-bold mb-8 text-temple-earth">
            {months[selectedMonth]} {selectedYear} Events
          </h2>

          {eventsIsFetching ? (
            <div className="grid lg:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : getEventsForMonth(selectedMonth).length === 0 ? (
            <Card className="border-temple-gold/20 shadow-sacred">
              <CardContent className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-temple-gold/50" />
                <h3 className="lg:text-xl md:text-5xl font-semibold text-temple-earth mb-2">
                  No Events Scheduled
                </h3>
                <p className="text-muted-foreground">
                  No events are currently scheduled for {months[selectedMonth]}.
                  Please check other months or contact us for more information.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {getEventsForMonth(selectedMonth)?.map((event, index) => (
                <EventsCard event={event} index={index} key={index} />
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Highlights */}
        <Card className="mt-12 border-temple-gold/20 shadow-sacred">
          <CardHeader>
            <CardTitle className="lg:text-2xl md:text-5xl text-temple-earth">
              Upcoming Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-3 md:grid-cols-1 md:gap-8 lg:gap-4">
              {EVENTS_HIGHLIGHTS.map(
                ({ title, name, date, bg, color }, idx) => (
                  <div key={idx} className={`text-center p-4 ${bg} rounded-lg`}>
                    <h4 className="font-semibold lg:text-base md:text-5xl text-temple-earth">
                      {title}
                    </h4>
                    <p
                      className={`${color} font-medium lg:text-sm md:text-4xl`}>
                      {name}
                    </p>
                    <p className="lg:text-sm md:text-4xl text-muted-foreground">
                      {date}
                    </p>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EventsCalendar;
