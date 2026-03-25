import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const ProductCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-0 shadow-card bg-card rounded-2xl">
      <Skeleton className="aspect-[4/5] w-full" />

      <CardContent className="p-5 space-y-3">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-7 w-20 pt-2" />
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;