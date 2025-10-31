import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { dummyMembers } from "@/data/dummyData";
import { Heart } from "lucide-react";

const Members = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Header Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-temple-gold/5 via-temple-lotus/5 to-temple-purple/5" />
        
        <div className="relative max-w-4xl mx-auto space-y-4 animate-fade-in">
          <Heart className="w-12 h-12 mx-auto text-temple-lotus animate-pulse" />
          <h1 className="text-5xl md:text-6xl font-heading text-foreground">
            Meet Our Lovely Team
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
            Passionate hearts building beautiful experiences
          </p>
        </div>
      </section>

      {/* Members Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {dummyMembers.map((member, index) => (
            <Card
              key={member.id}
              className="group relative overflow-hidden border-none bg-card/60 backdrop-blur-sm hover:shadow-temple transition-all duration-500 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-temple-gold/0 via-temple-lotus/0 to-temple-purple/0 group-hover:from-temple-gold/10 group-hover:via-temple-lotus/10 group-hover:to-temple-purple/10 transition-all duration-500" />
              
              <CardContent className="relative p-6 flex flex-col items-center text-center space-y-4">
                {/* Profile Image */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-temple-gold to-temple-purple rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-110" />
                  <Avatar className="w-28 h-28 border-4 border-background shadow-lg group-hover:border-temple-gold/50 transition-colors duration-300 relative">
                    <AvatarImage 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} 
                      alt={member.name}
                    />
                    <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-temple-gold to-temple-purple text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Member Info */}
                <div className="space-y-2 w-full">
                  <h3 className="text-xl font-heading text-foreground group-hover:text-temple-gold transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium px-3 py-1.5 rounded-full bg-secondary/50 inline-block">
                    {member.interest}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="w-full pt-2 border-t border-border/50 space-y-1">
                  <p className="text-xs text-muted-foreground truncate">
                    {member.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {member.phone}
                  </p>
                </div>

                {/* Joined Date Badge */}
                <div className="absolute top-4 right-4 text-xs text-muted-foreground/60 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
                  Since {new Date(member.joinedDate).getFullYear()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-4 pb-20 text-center space-y-6 animate-fade-in">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-temple-lotus/10 via-temple-purple/10 to-temple-gold/10 backdrop-blur-sm border border-temple-gold/20">
          <h2 className="text-3xl font-heading text-foreground mb-4">
            Join Our Community
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Become part of our loving family and contribute to the spiritual journey of countless devotees.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-temple-gold to-temple-saffron text-white rounded-full font-medium hover:shadow-temple transition-all duration-300 hover:scale-105">
            Get Involved
          </button>
        </div>
      </section>
    </div>
  );
};

export default Members;
