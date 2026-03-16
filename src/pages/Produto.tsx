import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, MessageCircle, Package, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const parsePriceToNumber = (price: string): number => {
  const cleanPrice = price.replace("€", "").replace(",", ".").trim();
  return parseFloat(cleanPrice) || 0;
};

const generateId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
};

const Produto = () => {
  const [searchParams] = useSearchParams();
  const { addItem } = useCart();

  const name = searchParams.get("nome") || "";
  const price = searchParams.get("preco") || "";
  const image = searchParams.get("imagem") || "";
  const description = searchParams.get("descricao") || "";
  const stockStr = searchParams.get("stock");
  const stock = stockStr !== null ? parseInt(stockStr, 10) : null;
  const category = searchParams.get("categoria") || "";
  const backPath = searchParams.get("origem") || "/";

  const whatsappNumber = "351938589917";
  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de encomendar: ${name} - Preço: ${price}`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleAddToCart = () => {
    addItem({
      id: generateId(name),
      name,
      price,
      priceValue: parsePriceToNumber(price),
      image,
    });
    toast.success(`${name} adicionado ao carrinho!`, { duration: 2000 });
  };

  if (!name) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <p className="text-muted-foreground">Produto não encontrado.</p>
          <Button variant="outline" className="mt-4" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back button */}
        <a
          href={backPath}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao catálogo
        </a>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="aspect-square overflow-hidden rounded-2xl bg-muted shadow-card">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {category && <Badge variant="secondary">{category}</Badge>}
              {stock !== null && !isNaN(stock) && (
                <Badge
                  variant={stock === 1 ? "default" : "secondary"}
                  className={stock === 1 ? "bg-green-600 hover:bg-green-700" : "bg-amber-500 hover:bg-amber-600 text-white"}
                >
                  <Package className="w-3 h-3 mr-1" />
                  {stock === 1 ? "Em Stock" : "Sob Encomenda"}
                </Badge>
              )}
            </div>

            {/* Name */}
            <h1 className="font-heading text-3xl font-bold text-foreground tracking-tight leading-tight">
              {name}
            </h1>

            {/* Price */}
            <p className="text-4xl font-bold text-primary">{price}</p>

            {/* Description */}
            {description && (
              <div className="border-t border-border/30 pt-5">
                <h2 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                  Descrição
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">{description}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-full transition-bounce hover:scale-105"
              >
                <ShoppingCart className="w-4 h-4" />
                Adicionar ao carrinho
              </Button>
              <Button
                asChild
                className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2 rounded-full"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  Encomendar
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Produto;
