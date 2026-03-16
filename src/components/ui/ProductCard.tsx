import { ShoppingCart, MessageCircle, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
  href?: string; // If provided, clicking the card opens this URL in a new tab
}

// Parse price string to number (e.g., "2,50€" -> 2.5)
const parsePriceToNumber = (price: string): number => {
  const cleanPrice = price.replace("€", "").replace(",", ".").trim();
  return parseFloat(cleanPrice) || 0;
};

// Generate unique ID from name
const generateId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
};

const ProductCard = ({
  image,
  name,
  price,
  description,
  category,
  quantity,
  stock,
  showWhatsAppButton = false,
  showAddToCart = false,
  href,
}: ProductCardProps) => {
  const cart = useCart();
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

  const whatsappNumber = "351938589917";
  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de encomendar: ${name} - Preço: ${price}`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    cart.addItem({
      id: generateId(name),
      name,
      price,
      priceValue: parsePriceToNumber(price),
      image,
    });
    toast.success(`${name} adicionado ao carrinho!`, {
      duration: 2000,
    });
  };

  const displayStock = stock ?? quantity;

  // Helper to convert numeric stock to status label
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
    <>
      <Card
        className="group overflow-hidden bg-card border border-border/40 rounded-2xl shadow-card hover:shadow-glow transition-smooth hover:-translate-y-1 h-full flex flex-col cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="aspect-[4/3] overflow-hidden bg-muted shrink-0">
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
        <CardContent className="p-5 flex flex-col flex-1 gap-2">
          {/* Category & Stock badges */}
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

          {/* Product name */}
          <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-2 tracking-tight">
            {name}
          </h3>

          {/* Description - distinct block, never overlaps image */}
          {description && (
            <div className="rounded-lg bg-muted/40 px-3 py-2">
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
          )}

          {/* Spacer to push price/button to bottom */}
          <div className="flex-1" />

          {/* Price and buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-border/30">
            <p className="font-body text-xl font-bold text-foreground">{price}</p>
            {showAddToCart && (
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-full px-4 transition-bounce hover:scale-105"
              >
                <ShoppingCart className="w-4 h-4" />
                Adicionar
              </Button>
            )}
            {showWhatsAppButton && !showAddToCart && (
              <Button
                asChild
                size="sm"
                className="bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2 rounded-full px-4"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  Encomendar
                </a>
              </Button>
            )}
          </div>

          {(showWhatsAppButton || showAddToCart) && (
            <p className="text-xs text-muted-foreground text-center pt-2">
              {showAddToCart
                ? "Adicione ao carrinho e finalize via WhatsApp"
                : "Atendimento personalizado via WhatsApp"}
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
