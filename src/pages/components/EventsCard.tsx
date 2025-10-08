import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin, Users } from 'lucide-react';
import { formatTime } from '@/utils/common-function';

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

const EventsCard = ({ event, index }) => {
  return (
    <Card
      key={index}
      className="border-temple-gold/20 shadow-sacred hover:shadow-temple transition-shadow md:mb-8">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge
            variant="outline"
            className={`border capitalize ${getEventColor(
              event.type
            )} lg:text-base md:text-4xl`}>
            {event.type}
          </Badge>
          <span className="lg:text-sm md:text-4xl text-muted-foreground">
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
        <p className="text-muted-foreground lg:mb-4 md:mb-10 lg:text-base md:text-4xl">
          {event.description}
        </p>

        <div className="lg:space-y-2 md:space-y-6 lg:mb-4 md:mb-10">
          <div className="flex items-center text-muted-foreground lg:text-base md:text-4xl">
            <Clock className="lg:w-4 lg:h-4 md:w-10 md:h-10 mr-2 text-temple-gold" />
            {event.time ? formatTime(event.time) : ''}
          </div>
          <div className="flex items-center text-muted-foreground lg:text-base md:text-4xl">
            <MapPin className="lg:w-4 lg:h-4 md:w-10 md:h-10 mr-2 text-temple-gold" />
            {event.location}
          </div>
          <div className="flex items-center text-muted-foreground lg:text-base md:text-4xl">
            <Users className="lg:w-4 lg:h-4 md:w-10 md:h-10 mr-2 text-temple-gold" />
            Expected: {event?.participants} devotees
          </div>
        </div>

        <div className="flex lg:space-x-2 md:space-x-6">
          <Button variant="temple" className="flex-1">
            Register
          </Button>
          <Button variant="outline" className="border-temple-gold/30">
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsCard;
