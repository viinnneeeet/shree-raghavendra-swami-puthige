import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useState } from 'react';
import { EVENTS_DATA } from '@/common/appConstants';
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Events
            <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
              Calendar
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with all upcoming temple events, festivals, and
            spiritual gatherings throughout the year.
          </p>
        </div>

        {/* Month Selection */}
        <Card className="mb-8 border-temple-gold/20 shadow-sacred">
          <CardHeader>
            <CardTitle className="text-2xl text-temple-earth flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-temple-gold" />
              Select Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
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
          <h2 className="text-3xl font-bold mb-8 text-temple-earth">
            {months[selectedMonth]} {selectedYear} Events
          </h2>

          {getEventsForMonth(selectedMonth).length === 0 ? (
            <Card className="border-temple-gold/20 shadow-sacred">
              <CardContent className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-temple-gold/50" />
                <h3 className="text-xl font-semibold text-temple-earth mb-2">
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
                  className="border-temple-gold/20 shadow-sacred hover:shadow-temple transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        variant="outline"
                        className={`border ${getEventColor(event.type)}`}>
                        {event.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <CardTitle className="text-xl text-temple-earth">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2 text-temple-gold" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2 text-temple-gold" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="w-4 h-4 mr-2 text-temple-gold" />
                        Expected: {event.attendees} devotees
                      </div>
                    </div>

                    <div className="flex space-x-2">
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
            <CardTitle className="text-2xl text-temple-earth">
              Upcoming Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-temple-gold/10 rounded-lg">
                <h4 className="font-semibold text-temple-earth">
                  Next Festival
                </h4>
                <p className="text-temple-gold font-medium">Ram Navami</p>
                <p className="text-sm text-muted-foreground">April 10, 2024</p>
              </div>
              <div className="text-center p-4 bg-temple-purple/10 rounded-lg">
                <h4 className="font-semibold text-temple-earth">
                  Monthly Retreat
                </h4>
                <p className="text-temple-purple font-medium">
                  Meditation Weekend
                </p>
                <p className="text-sm text-muted-foreground">
                  Last weekend of every month
                </p>
              </div>
              <div className="text-center p-4 bg-temple-sunset/10 rounded-lg">
                <h4 className="font-semibold text-temple-earth">
                  Community Service
                </h4>
                <p className="text-temple-sunset font-medium">
                  Monthly Service
                </p>
                <p className="text-sm text-muted-foreground">
                  15th of every month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EventsCalendar;
