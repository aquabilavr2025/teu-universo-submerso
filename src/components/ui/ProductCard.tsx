import { Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  description?: string;
  category?: string;
  quantity?: number;
  stock?: number | null;
  showWhatsAppButton?: boolean;
  showAddToCart?: boolean;
  href?: string;
}

const ProductCard = ({
  image,
  name,
  price,
  description,
  category,
  quantity,
  stock,
  href,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const buildProductUrl = () => {
    const params = new URLSearchParams();
    params.set("nome", name);
    params.set("preco", price);
    if (image) params.set("imagem", image);
    if (description) params.set("descricao", description);
    if (stock !== null && stock !== undefined) params.set("stock", String(stock));
    if (category) params.set("categoria", category);
    if (href) params.set("origem", href);
    return `/produto?${params.toString()}`;
  };

  const handleCardClick = () => {
    navigate(buildProductUrl());
  };

  const displayStock = stock ?? quantity;

  const getStockLabel = (value: number | null | undefined): string | null => {
    if (value === null || value === undefined) return null;
    return value === 1 ? "Em Stock" : "Sob Encomenda";
  };

  const getStockClasses = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return "";
    return value === 1
      ? "bg-green-100 text-green-700"
      : "bg-amber-100 text-amber-700";
  };

  const stockLabel = getStockLabel(displayStock);
  const stockClasses = getStockClasses(displayStock);

  return (
    <Card
      className="group overflow-hidden bg-card border border-border/40 rounded-2xl shadow-card hover:shadow-glow transition-smooth hover:-translate-y-1 h-full flex flex-col cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="aspect-[4/5] overflow-hidden bg-muted shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>

      <CardContent className="p-5 flex flex-col flex-1 gap-3">
        {(category || stockLabel) && (
          <div className="flex items-center gap-2 flex-wrap">
            {category && (
              <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                {category}
              </span>
            )}
            {stockLabel && (
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${stockClasses}`}
              >
                <Package className="w-3 h-3" />
                {stockLabel}
              </span>
            )}
          </div>
        )}

        <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-2 tracking-tight">
          {name}
        </h3>

        <div className="flex-1" />

        <div className="pt-3 border-t border-border/30">
          <p className="font-body text-xl font-bold text-foreground">{price}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;