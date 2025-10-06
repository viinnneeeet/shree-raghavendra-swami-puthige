import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { formatAmount } from '@/utils/common-function';

const OfferingsCard = ({ offering, index }) => {
  return (
    <Card key={index} className="border-temple-gold/20 shadow-sacred">
      <CardContent className="pt-6">
        <div className="text-center">
          <h3 className="font-semibold text-temple-earth mb-2 md:text-5xl lg:text-lg">
            {offering.item}
          </h3>
          <p className="text-muted-foreground mb-3  md:text-4xl lg:text-sm">
            {offering.description}
          </p>
          <div className="lg:text-lg font-bold text-temple-gold mb-4 md:text-5xl">
            {offering.price ? formatAmount(+offering.price) : '-'}
          </div>
          <Button size="sm" variant="sacred" className="w-full">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfferingsCard;
