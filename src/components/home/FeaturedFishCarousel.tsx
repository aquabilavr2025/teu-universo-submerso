import { useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/ui/ProductCard";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";
import type { ProductItem } from "@/hooks/useGoogleSheet";

interface FeaturedFishCarouselProps {
  fish: ProductItem[];
  isLoading: boolean;
}

// Fisher-Yates shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const FeaturedFishCarousel = ({ fish, isLoading }: FeaturedFishCarouselProps) => {
  // Randomize fish selection on each mount
  const randomizedFish = useMemo(() => {
    if (!fish || fish.length === 0) return [];
    // Filter fish with images for better carousel experience
    const withImages = fish.filter((f) => f.image && f.image.length > 0);
    const pool = withImages.length >= 6 ? withImages : fish;
    return shuffleArray(pool).slice(0, Math.min(12, pool.length));
  }, [fish]);

  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (randomizedFish.length === 0) {
    return (
      <p className="col-span-3 text-center text-muted-foreground">
        Peixes em destaque a carregar...
      </p>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 6000, // 6 seconds per slide
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {randomizedFish.map((fish, index) => (
          <CarouselItem
            key={`${fish.name}-${index}`}
            className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <div className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard
                image={fish.image}
                name={fish.name}
                price={fish.price}
                showAddToCart
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-4" />
      <CarouselNext className="hidden md:flex -right-4" />
    </Carousel>
  );
};

export default FeaturedFishCarousel;
