import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  description?: string;
  category?: string;
}

const ProductCard = ({ image, name, price, description, category }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-border/50 gradient-card shadow-card hover:shadow-glow transition-smooth hover:-translate-y-2">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
        />
      </div>
      <CardContent className="p-5 space-y-3">
        {category && (
          <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
            {category}
          </span>
        )}
        <h3 className="font-heading text-xl font-semibold text-foreground line-clamp-1">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}
        <p className="font-body text-lg font-bold text-primary">{price}</p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
