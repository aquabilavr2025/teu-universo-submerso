import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, MessageCircle, Package, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { ProductItem } from "@/hooks/useGoogleSheet";

interface ProductDetailModalProps {
  product: ProductItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: string;
  showAddToCart?: boolean;
  showWhatsAppButton?: boolean;
}

const parsePriceToNumber = (price: string): number => {
  const cleanPrice = price.replace("€", "").replace(",", ".").trim();
  return parseFloat(cleanPrice) || 0;
};

const generateId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
};

const ProductDetailModal = ({
  product,
  open,
  onOpenChange,
  category,
  showAddToCart = false,
  showWhatsAppButton = false,
}: ProductDetailModalProps) => {
  const cart = useCart();

  if (!product) return null;

  const whatsappNumber = "351938589917";
  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de encomendar: ${product.name} - Preço: ${product.price}`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleAddToCart = () => {
    cart.addItem({
      id: generateId(product.name),
      name: product.name,
      price: product.price,
      priceValue: parsePriceToNumber(product.price),
      image: product.image,
    });
    toast.success(`${product.name} adicionado ao carrinho!`, { duration: 2000 });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>

        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 rounded-full bg-background/80 backdrop-blur-sm p-1.5 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>

        {/* Product Info */}
        <div className="p-6 space-y-4">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {category && (
              <Badge variant="secondary">{category}</Badge>
            )}
            {product.stock !== null && (
              <Badge variant={product.stock > 0 ? "default" : "destructive"} className={product.stock > 0 ? "bg-green-600 hover:bg-green-700" : ""}>
                <Package className="w-3 h-3 mr-1" />
                {product.stock > 0 ? `${product.stock} em stock` : "Esgotado"}
              </Badge>
            )}
          </div>

          {/* Name & Price */}
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground tracking-tight">
              {product.name}
            </h2>
            <p className="text-2xl font-bold text-primary mt-1">{product.price}</p>
          </div>

          {/* Description */}
          {product.description && (
            <div className="border-t border-border/30 pt-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Descrição</h3>
              <p className="text-sm text-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {showAddToCart && (
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-full transition-bounce hover:scale-105"
              >
                <ShoppingCart className="w-4 h-4" />
                Adicionar ao carrinho
              </Button>
            )}
            {showWhatsAppButton && (
              <Button
                asChild
                className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2 rounded-full"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  Encomendar
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
