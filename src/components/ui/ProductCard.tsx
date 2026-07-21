import { Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

  const buildProductUrl = () => {
    const params = new URLSearchParams();

    params.set("nome", name);
    params.set("preco", price);

    if (image) {
      params.set("imagem", image);
    }

    if (description) {
      params.set("descricao", description);
    }

    if (stock !== null && stock !== undefined) {
      params.set("stock", String(stock));
    }

    if (category) {
      params.set("categoria", category);
    }

    if (href) {
      params.set("origem", href);
    }

    return `/produto?${params.toString()}`;
  };

  const displayStock = stock ?? quantity;

  const getStockLabel = (
    value: number | null | undefined
  ): string | null => {
    if (value === null || value === undefined) {
      return null;
    }

    return value === 1 ? "Em Stock" : "Sob Encomenda";
  };

  const getStockClasses = (
    value: number | null | undefined
  ): string => {
    if (value === null || value === undefined) {
      return "";
    }

    return value === 1
      ? "bg-green-100 text-green-700"
      : "bg-amber-100 text-amber-700";
  };

  const stockLabel = getStockLabel(displayStock);
  const stockClasses = getStockClasses(displayStock);

  const currentPage = `${location.pathname}${location.search}`;

  return (
    <Link
      to={buildProductUrl()}
      state={{ from: currentPage }}
      className="block h-full"
    >
      <Card className="group h-full cursor-pointer overflow-hidden rounded-2xl border border-border/40 bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-glow">
        <div className="aspect-[4/5] shrink-0 overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-smooth duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>

        <CardContent className="flex flex-1 flex-col gap-3 p-5">
          {(category || stockLabel) && (
            <div className="flex flex-wrap items-center gap-2">
              {category && (
                <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {category}
                </span>
              )}

              {stockLabel && (
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${stockClasses}`}
                >
                  <Package className="h-3 w-3" />
                  {stockLabel}
                </span>
              )}
            </div>
          )}

          <h3 className="line-clamp-2 font-heading text-lg font-semibold tracking-tight text-foreground">
            {name}
          </h3>

          <div className="flex-1" />

          <div className="border-t border-border/30 pt-3">
            <p className="font-body text-xl font-bold text-foreground">
              {price}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;