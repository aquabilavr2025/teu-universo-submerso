import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const ProductCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-0 shadow-card bg-card">
      {/* Image skeleton */}
      <Skeleton className="aspect-[4/3] w-full" />
      
      <CardContent className="p-5 space-y-3">
        {/* Category badge skeleton */}
        <Skeleton className="h-5 w-16 rounded-full" />
        
        {/* Title skeleton */}
        <Skeleton className="h-6 w-3/4" />
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Stock skeleton */}
        <Skeleton className="h-4 w-24" />
        
        {/* Price and button skeleton */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;
