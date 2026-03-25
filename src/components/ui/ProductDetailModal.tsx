import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShoppingCart, Package, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { ProductItem } from "@/hooks/useGoogleSheet";
import { parseDescriptionBullets } from "@/lib/utils";

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
}: ProductDetailModalProps) => {
  const cart = useCart();

  if (!product) return null;

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

        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 rounded-full bg-background/80 backdrop-blur-sm p-1.5 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {category && <Badge variant="secondary">{category}</Badge>}

            {product.stock !== null && (
              <Badge
                variant={product.stock > 0 ? "default" : "destructive"}
                className={product.stock > 0 ? "bg-green-600 hover:bg-green-700" : ""}
              >
                <Package className="w-3 h-3 mr-1" />
                {product.stock > 0 ? `${product.stock} em stock` : "Esgotado"}
              </Badge>
            )}
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground tracking-tight">
              {product.name}
            </h2>
            <p className="text-2xl font-bold text-primary mt-1">{product.price}</p>
          </div>

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="descricao">
              <AccordionTrigger className="text-sm font-medium">
                Descrição
              </AccordionTrigger>
              <AccordionContent>
                {product.description ? (
                  <ul className="space-y-2.5">
                    {parseDescriptionBullets(product.description).map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                        <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-primary/80 flex-shrink-0 mt-1.5 group-hover:bg-primary transition-colors" />
                        <span className="text-sm text-foreground leading-relaxed">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Sem descrição disponível.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="detalhes">
              <AccordionTrigger className="text-sm font-medium">
                Detalhes
              </AccordionTrigger>
              <AccordionContent>
                <div />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {showAddToCart && (
            <div className="pt-2">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-full transition-bounce hover:scale-105"
              >
                <ShoppingCart className="w-4 h-4" />
                Adicionar ao carrinho
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;