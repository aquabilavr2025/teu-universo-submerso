import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShoppingCart, Package, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { parseDescriptionBullets } from "@/lib/utils";

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
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <a
          href={backPath}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao catálogo
        </a>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
          {/* Imagem maior */}
          <div className="w-full max-w-[520px] mx-auto overflow-hidden rounded-3xl bg-muted shadow-card">
            <div className="aspect-[4/5]">
              <img
                src={image || "/placeholder.svg"}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>
          </div>

          {/* Detalhes */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 flex-wrap">
              {category && <Badge variant="secondary">{category}</Badge>}

              {stock !== null && !isNaN(stock) && (
                <Badge
                  variant={stock === 1 ? "default" : "secondary"}
                  className={
                    stock === 1
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-amber-500 hover:bg-amber-600 text-white"
                  }
                >
                  <Package className="w-3 h-3 mr-1" />
                  {stock === 1 ? "Em Stock" : "Sob Encomenda"}
                </Badge>
              )}
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight">
              {name}
            </h1>

            <p className="text-4xl md:text-5xl font-bold text-primary">{price}</p>

            <Button
              onClick={handleAddToCart}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-full px-6 transition-bounce hover:scale-105"
            >
              <ShoppingCart className="w-4 h-4" />
              Adicionar ao carrinho
            </Button>

            <Accordion type="multiple" className="w-full">
              <AccordionItem value="descricao">
                <AccordionTrigger className="text-sm font-medium">
                  Descrição
                </AccordionTrigger>
                <AccordionContent>
                  {description ? (
                    <div className="space-y-2">
                      {parseDescriptionBullets(description).map((text, idx) => (
                        <p key={idx} className="text-foreground leading-relaxed">
                          {text}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Sem descrição disponível.</p>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Produto;