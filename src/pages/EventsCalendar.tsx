import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useState } from 'react';
import { EVENTS_DATA, EVENTS_HIGHLIGHTS } from '@/common/appConstants';
import { TempleEvent } from '@/types/events';

const EventsCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState(EVENTS_DATA);

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

  const getEventColor = (type: string) => {
    switch (type) {
      case 'Festival':
        return 'bg-temple-sunset/20 text-temple-sunset border-temple-sunset/30';
      case 'Retreat':
        return 'bg-temple-purple/20 text-temple-purple border-temple-purple/30';
      case 'Service':
        return 'bg-temple-gold/20 text-temple-gold border-temple-gold/30';
      default:
        return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const getEventsForMonth = (month: number) => {
    return events.filter((event: TempleEvent) => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === month;
    });
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

          {getEventsForMonth(selectedMonth).length === 0 ? (
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
              {getEventsForMonth(selectedMonth).map((event, index) => (
                <Card
                  key={index}
                  className="border-temple-gold/20 shadow-sacred hover:shadow-temple transition-shadow md:mb-8">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        variant="outline"
                        className={`border ${getEventColor(
                          event.type
                        )} lg:text-base md:text-3xl`}>
                        {event.type}
                      </Badge>
                      <span className="lg:text-sm md:text-3xl text-muted-foreground">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <CardTitle className="lg:text-xl md:text-5xl text-temple-earth">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 lg:text-base md:text-4xl">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-muted-foreground lg:text-base md:text-4xl">
                        <Clock className="lg:w-4 lg:h-4 md:w-10 md:h-10 mr-2 text-temple-gold" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-muted-foreground lg:text-base md:text-4xl">
                        <MapPin className="lg:w-4 lg:h-4 md:w-10 md:h-10 mr-2 text-temple-gold" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-muted-foreground lg:text-base md:text-4xl">
                        <Users className="lg:w-4 lg:h-4 md:w-10 md:h-10 mr-2 text-temple-gold" />
                        Expected: {event.attendees} devotees
                      </div>
                    </div>

                    <div className="flex lg:space-x-2 md:space-x-6">
                      <Button variant="temple" className="flex-1">
                        Register
                      </Button>
                      <Button
                        variant="outline"
                        className="border-temple-gold/30">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
            <div className="grid md:grid-cols-3 gap-4">
              {EVENTS_HIGHLIGHTS.map(
                ({ title, name, date, bg, color }, idx) => (
                  <div key={idx} className={`text-center p-4 ${bg} rounded-lg`}>
                    <h4 className="font-semibold lg:text-base md:text-4xl text-temple-earth">
                      {title}
                    </h4>
                    <p
                      className={`${color} font-medium lg:text-sm md:text-3xl`}>
                      {name}
                    </p>
                    <p className="lg:text-sm md:text-3xl text-muted-foreground">
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
