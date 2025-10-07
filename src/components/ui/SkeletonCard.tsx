import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => {
  return (
    <Card className="border-temple-gold/20 shadow-sacred">
      <CardContent className="pt-6">
        <div className="text-left lg:space-y-6 md:space-y-12">
          <Skeleton className="lg:h-8 md:h-16 w-3/4  bg-muted/60" />
          <Skeleton className="lg:h-10 md:h-20 w-5/6  bg-muted/50" />
          <Skeleton className="lg:h-6 md:h-12 w-1/2  bg-muted/40" />
          <Skeleton className="lg:h-16 md:h-32 w-full bg-muted/40 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
