import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-earth">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Sacred
            <span className="block bg-gradient-to-r from-temple-gold to-temple-purple bg-clip-text text-transparent">
              Heritage
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            For over centuries, our temple has been a beacon of spiritual light,
            welcoming all who seek peace, wisdom, and divine connection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center p-8 hover:shadow-temple transition-[var(--transition-sacred)] border-temple-gold/20">
            <CardContent className="pt-6">
              <div className="text-6xl mb-4">🏛️</div>
              <h3 className="text-2xl font-semibold text-temple-earth mb-4">
                Ancient Wisdom
              </h3>
              <p className="text-muted-foreground">
                Preserving timeless teachings and spiritual practices passed
                down through generations of devoted practitioners.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-temple transition-[var(--transition-sacred)] border-temple-gold/20">
            <CardContent className="pt-6">
              <div className="text-6xl mb-4">🧘</div>
              <h3 className="text-2xl font-semibold text-temple-earth mb-4">
                Inner Peace
              </h3>
              <p className="text-muted-foreground">
                Offering prayer, and contemplative practices to nurture
                spiritual growth and inner tranquility.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-temple transition-[var(--transition-sacred)] border-temple-gold/20">
            <CardContent className="pt-6">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-2xl font-semibold text-temple-earth mb-4">
                Community Unity
              </h3>
              <p className="text-muted-foreground">
                Building bridges of understanding and compassion among all
                peoples, fostering a spirit of universal brotherhood.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto bg-card border border-temple-gold/30 rounded-lg p-8 shadow-sacred">
            <blockquote className="text-2xl md:text-3xl text-temple-earth italic mb-4">
              Always keep faith in Hari (Lord Vishnu) and the Guru
            </blockquote>
            <cite className="text-temple-bronze font-semibold">
              - Shree Raghavendra Swami
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
