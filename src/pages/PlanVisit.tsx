import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Info, Heart, Clock } from 'lucide-react';
import { SPECIAL_NOTES } from '@/common/appConstants';
const PlanVisit = () => {
  const guidelines = [
    'Dress modestly - Traditional Indian attire preferred',
    'Remove shoes before entering the main temple',
    'Maintain silence during prayers and ceremonies',
    'Photography allowed in designated areas only',
    'Mobile phones should be on silent mode',
    'Follow the guidance of temple staff and volunteers',
  ];

  const whatToBring = [
    'Coconut and flowers for offerings (available at temple shop)',
    'Donation envelope if participating in sevas',
    'Water bottle to stay hydrated',
    'Small bag for personal belongings',
  ];

  const visitFlow = [
    { time: 'Arrival', activity: 'Park vehicle and proceed to entrance' },
    { time: '5 mins', activity: 'Remove shoes and wash hands/feet' },
    { time: '10 mins', activity: 'Visit main shrine for darshan' },
    { time: '15 mins', activity: 'Participate in aarti if timing aligns' },
    { time: '20 mins', activity: 'Collect prasada and visit temple shop' },
    { time: '25 mins', activity: 'Rest in designated areas if needed' },
  ];

  return (
    <section className="py-20 bg-gradient-sacred">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-7xl font-bold text-foreground mb-6">
            Plan Your
            <span className="bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent ml-3">
              Visit
            </span>
          </h1>
          <p className="lg:text-xl md:text-4xl text-muted-foreground max-w-2xl mx-auto">
            Guidelines and information for first-time visitors to ensure a
            peaceful and meaningful temple experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Guidelines */}
          <Card className="border-temple-gold/20 shadow-sacred">
            <CardHeader>
              <CardTitle className="lg:text-2xl md:text-5xl text-temple-earth flex items-center">
                <Info className="lg:w-6 lg:h-6 md:w-14 md:h-14 mr-3 text-temple-gold" />
                Temple Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {guidelines.map((guideline, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="lg:w-5 lg:h-5 md:h-12 md:w-12  text-temple-gold mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground lg:text-base md:text-4xl">
                      {guideline}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* What to Bring */}
          <Card className="border-temple-gold/20 shadow-sacred">
            <CardHeader>
              <CardTitle className="lg:text-2xl md:text-5xl text-temple-earth flex items-center">
                <Heart className="lg:w-6 lg:h-6 md:h-12 md:w-12 mr-3 text-temple-gold" />
                What to Bring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {whatToBring.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="lg:w-5 lg:h-5 md:h-10 md:w-10 text-temple-gold mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground lg:text-base md:text-4xl">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-temple-gold/10 rounded-lg">
                <p className="lg:text-sm md:text-3xl text-muted-foreground">
                  <strong>Tip:</strong> Temple shop is available for purchasing
                  offerings and souvenirs
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visit Flow */}
        <Card className="border-temple-gold/20 shadow-sacred mb-12">
          <CardHeader>
            <CardTitle className="lg:text-2xl md:text-5xl text-temple-earth flex items-center">
              <Clock className="lg:w-6 lg:h-6 md:h-12 md:w-12 mr-3 text-temple-gold" />
              Typical Visit Flow (30 minutes)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {visitFlow.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-temple-gold/5 to-temple-purple/5">
                  <div className="lg:w-16 lg:h-16 md:h-36 md:w-36 bg-temple-gold/20 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-temple-earth lg:text-sm md:text-4xl">
                      {step.time}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground lg:text-sm md:text-4xl">
                      {step.activity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Special Notes */}
        <div className="grid lg:grid-cols-2 md:grid-cols-1 lg:gap-6 md:gap-12">
          {SPECIAL_NOTES?.map((note, index) => (
            <Card className="border-temple-gold/20 shadow-sacred" key={index}>
              <CardHeader>
                <CardTitle className="lg:text-xl md:text-5xl text-temple-earth">
                  {note?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="lg:space-y-2 md:space-y-4 text-muted-foreground lg:text-base md:text-4xl">
                  {note?.items?.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanVisit;
