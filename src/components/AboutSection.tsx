import { Card, CardContent } from '@/components/ui/card';
import { SPIRITUAL_CARDS } from '@/common/appConstants';
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-earth">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-8xl font-bold text-foreground mb-6">
            Our Sacred
            <span className="block bg-gradient-to-r md:text-6xl lg:text-lg from-temple-gold to-temple-purple bg-clip-text text-transparent mb-6">
              Heritage
            </span>
          </h2>
          <p className="text-xl lg:text-xl md:text-4xl text-muted-foreground max-w-2xl mx-auto">
            For over centuries, our temple has been a beacon of spiritual light,
            welcoming all who seek peace, wisdom, and divine connection.
          </p>
        </div>

        <div className="grid md:grid-cols-1 md:p-16 lg:grid-cols-3 gap-8">
          {SPIRITUAL_CARDS?.map((item, idx) => (
            <Card
              className="text-center p-8 hover:shadow-temple transition-[var(--transition-sacred)] border-temple-gold/20"
              key={idx}>
              <CardContent className="pt-6">
                <div className="text-6xl mb-4">{item?.icon}</div>
                <h3 className="lg:text-2xl md:text-6xl font-semibold text-temple-earth mb-4">
                  {item?.title}
                </h3>
                <p className="text-muted-foreground lg:text-lg md:text-4xl">
                  {item?.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto bg-card border border-temple-gold/30 rounded-lg p-8 shadow-sacred">
            <blockquote className="lg:text-2xl md:text-4xl text-temple-earth italic mb-4">
              Always keep faith in Hari (Lord Vishnu) and the Guru
            </blockquote>
            <cite className="text-temple-bronze md:text-4xl lg:text-lg font-semibold">
              - Shree Raghavendra Swami
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
