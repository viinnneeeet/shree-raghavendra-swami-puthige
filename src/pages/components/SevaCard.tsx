import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Heart, Utensils, Flower, Gift, Star, Users } from 'lucide-react';
import { formatAmount } from '@/utils/common-function';
const SevaCard = ({ seva, handleBook }) => {
  const icons = [Heart, Utensils, Flower, Gift, Star, Users];

  const getRandomIcon = () => {
    const index = Math.floor(Math.random() * icons.length);
    return icons[index];
  };
  const RandomIcon = getRandomIcon();
  return (
    <Card
      key={seva?.id}
      className="border-temple-gold/20 shadow-sacred hover:shadow-temple transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between lg:mb-4 md:mb-8">
          <RandomIcon
            size={24}
            className="lg:w-8 lg:h-8 md:w-14 md:h-14 text-temple-gold"
          />
          <Badge
            variant="outline"
            className="border-temple-gold text-temple-gold md:text-4xl lg:text-base">
            {seva?.duration}
          </Badge>
        </div>
        <CardTitle className="lg:text-xl md:text-6xl text-temple-earth">
          {seva?.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 md:text-4xl lg:text-base">
          {seva?.description}
        </p>

        <div className="lg:mb-4 md:mb-8">
          <span className="lg:text-2xl md:text-5xl font-bold text-temple-gold">
            {seva?.amount ? formatAmount(+seva?.amount) : '-'}
          </span>
        </div>

        <div className="lg:mb-6 md:mb-12">
          <h4 className="font-semibold text-temple-earth lg:mb-2 md:mb-6 md:text-5xl lg:text-base">
            Benefits:
          </h4>
          <ul className="lg:space-y-1 md:space-y-4">
            {seva?.benefits?.length
              ? seva?.benefits?.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="lg:text-sm md:text-4xl text-muted-foreground flex items-center">
                    <Star className="lg:w-3 lg:h-3 md:w-8 md:h-8 mr-2 text-temple-gold" />
                    {benefit}
                  </li>
                ))
              : null}
          </ul>
        </div>

        <Button
          className="w-full"
          variant="temple"
          onClick={() => handleBook(seva)}>
          Book This Seva
        </Button>
      </CardContent>
    </Card>
  );
};

export default SevaCard;
