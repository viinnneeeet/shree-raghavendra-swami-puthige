import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { isOnlyNumber } from '@/common/commonFuction';

type DonationState = {
  firstName: string;
  lastName: string;
  selectedAmount: string;
  customAmount: string;
  email: string;
  message: string;
};
const DonationForm = (props) => {
  const initialState = {
    firstName: '',
    lastName: '',
    selectedAmount: '',
    customAmount: '',
    email: '',
    message: '',
  };
  const [state, setState] = useState<DonationState>(initialState);
  const { toast } = useToast();
  const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

  const handleDonate = () => {
    toast({
      title: 'Thank you for donating',
      description: `Amount of ${state?.selectedAmount || state?.customAmount}`,
      variant: 'warning',
    });
    setState(initialState);
  };

  const handleChange = (key: string, value: string) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-temple-gold/20 shadow-sacred">
        <CardHeader className="text-center">
          <CardTitle className="text-temple-earth text-2xl flex items-center justify-center">
            <Heart className="w-6 h-6 mr-2 text-temple-gold" />
            Make a Donation
          </CardTitle>
          <p className="text-muted-foreground">
            Every contribution, no matter the size, makes a meaningful
            difference
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Suggested Amounts */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Choose an amount:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {suggestedAmounts?.map((amount) => (
                <Button
                  key={amount}
                  variant={
                    state?.selectedAmount?.toString() === amount?.toString()
                      ? 'temple'
                      : 'outline'
                  }
                  className="h-12"
                  onClick={() => {
                    handleChange('customAmount', '');
                    if (
                      state?.selectedAmount?.toString() === amount?.toString()
                    ) {
                      handleChange('selectedAmount', '');
                      return;
                    }
                    handleChange('selectedAmount', amount?.toString());
                  }}>
                  ₹ {amount}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Or enter a custom amount:
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                ₹
              </span>
              <input
                type="text"
                placeholder="0.00"
                value={state?.customAmount || ''}
                name="customAmount"
                onChange={(e) => {
                  const amount = e.target.value;
                  if (isOnlyNumber(amount, true)) {
                    handleChange(e.target.name, amount);
                  }
                }}
                disabled={state?.selectedAmount ? true : false}
                className="w-full pl-8 pr-4 py-3 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
              />
            </div>
          </div>

          {/* Donation Type */}
          {/* <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Donation frequency:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12">
                    One-time
                  </Button>
                  <Button variant="outline" className="h-12">
                    Monthly
                  </Button>
                </div>
              </div> */}

          {/* Donor Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
                value={state?.firstName}
                name="firstName"
                onChange={(e) => {
                  handleChange(e?.target?.name, e?.target?.value);
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
                value={state?.lastName}
                name="lastName"
                onChange={(e) => {
                  handleChange(e?.target?.name, e?.target?.value);
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold"
              value={state?.email}
              name="email"
              onChange={(e) => {
                handleChange(e?.target?.name, e?.target?.value);
              }}
            />
          </div>

          {/* Donation Message */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Share your thoughts or dedication..."
              className="w-full px-4 py-2 border border-temple-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-temple-gold resize-none"
              value={state?.message}
              name="message"
              onChange={(e) => {
                handleChange(e?.target?.name, e?.target?.value);
              }}></textarea>
          </div>

          {/* Donate Button */}
          <Button
            variant="sacred"
            size="lg"
            className="w-full text-lg py-4"
            onClick={handleDonate}
            disabled={
              !state?.firstName ||
              !state?.lastName ||
              !(state?.selectedAmount || state?.customAmount) ||
              !state?.email
            }>
            <Heart className="w-5 h-5 mr-2" />
            Donate Now
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Your donation is secure and helps support our temple's mission of
            spiritual growth and community service.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationForm;
