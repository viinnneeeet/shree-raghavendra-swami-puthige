import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Info, Heart, Clock } from 'lucide-react';

const PlanVisit = () => {
  const guidelines = [
    'Dress modestly - Traditional Indian attire preferred',
    'Remove shoes before entering the main temple',
    'Maintain silence during prayers and ceremonies',
    'Photography allowed in designated areas only',
    'Mobile phones should be on silent mode',
    'Follow the guidance of temple staff and volunteers'
  ];

  const whatToBring = [
    'Coconut and flowers for offerings (available at temple shop)',
    'Donation envelope if participating in sevas',
    'Water bottle to stay hydrated',
    'Small bag for personal belongings'
  ];

  const visitFlow = [
    { time: 'Arrival', activity: 'Park vehicle and proceed to entrance' },
    { time: '5 mins', activity: 'Remove shoes and wash hands/feet' },
    { time: '10 mins', activity: 'Visit main shrine for darshan' },
    { time: '15 mins', activity: 'Participate in aarti if timing aligns' },
    { time: '20 mins', activity: 'Collect prasada and visit temple shop' },
    { time: '25 mins', activity: 'Rest in designated areas if needed' }
  ];

  return (
    <Layout>
      <section className="py-20 bg-gradient-sacred">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Plan Your
              <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
                Visit
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Guidelines and information for first-time visitors to ensure a peaceful and meaningful temple experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Guidelines */}
            <Card className="border-temple-gold/20 shadow-sacred">
              <CardHeader>
                <CardTitle className="text-2xl text-temple-earth flex items-center">
                  <Info className="w-6 h-6 mr-3 text-temple-gold" />
                  Temple Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {guidelines.map((guideline, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-temple-gold mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{guideline}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What to Bring */}
            <Card className="border-temple-gold/20 shadow-sacred">
              <CardHeader>
                <CardTitle className="text-2xl text-temple-earth flex items-center">
                  <Heart className="w-6 h-6 mr-3 text-temple-gold" />
                  What to Bring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {whatToBring.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-temple-gold mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-temple-gold/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Tip:</strong> Temple shop is available for purchasing offerings and souvenirs
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visit Flow */}
          <Card className="border-temple-gold/20 shadow-sacred mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-temple-earth flex items-center">
                <Clock className="w-6 h-6 mr-3 text-temple-gold" />
                Typical Visit Flow (30 minutes)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {visitFlow.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-temple-gold/5 to-temple-purple/5">
                    <div className="w-16 h-16 bg-temple-gold/20 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-temple-earth text-sm">{step.time}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground">{step.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Special Notes */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-temple-gold/20 shadow-sacred">
              <CardHeader>
                <CardTitle className="text-xl text-temple-earth">For Families</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Baby changing facilities available</li>
                  <li>• Family rest areas with seating</li>
                  <li>• Kids-friendly timings: 6 PM - 7 PM</li>
                  <li>• Special programs for children during festivals</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-temple-gold/20 shadow-sacred">
              <CardHeader>
                <CardTitle className="text-xl text-temple-earth">Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Wheelchair accessible entrances</li>
                  <li>• Reserved parking for disabled visitors</li>
                  <li>• Volunteer assistance available</li>
                  <li>• Audio announcements during ceremonies</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PlanVisit;