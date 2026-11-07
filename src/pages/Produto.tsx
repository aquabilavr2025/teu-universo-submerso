import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { useAllProducts } from "@/hooks/useProductSearch";
import {
  getProductCategory,
  getProductPath,
  getProductSlug,
} from "@/lib/productRoute";

const Produto = () => {
  const { category, subcategory, id, slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addItem } = useCart();
  const { data: products = [], isLoading, isError } = useAllProducts();
  const routeCategory = [category, subcategory].filter(Boolean).join("/");
  const categoryProducts = products.filter(
    (item) => getProductCategory(item.categoryPath) === routeCategory,
  );
  const product =
    categoryProducts.find((item) => item.routeId === id) ??
    categoryProducts.find((item) => getProductSlug(item.name) === slug);

  useEffect(() => {
    if (!product) return;

    const canonicalPath = getProductPath(
      product.categoryPath,
      product.routeId,
      product.name,
    );
    if (location.pathname !== canonicalPath) {
      navigate(canonicalPath, { replace: true, state: location.state });
    }
  }, [location.pathname, location.state, navigate, product]);

  const handleBack = () => {
    const from = (location.state as { from?: unknown } | null)?.from;
    if (typeof from === "string" && from.startsWith("/") && !from.startsWith("//")) {
      navigate(from);
      return;
    }

    if (location.key !== "default") {
      navigate(-1);
      return;
    }

    navigate("/", { replace: true });
  };

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      priceValue: product.priceValue,
      image: product.image,
    });
    toast.success(`${product.name} adicionado ao carrinho!`, { duration: 2000 });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <p className="text-muted-foreground">A carregar produto...</p>
        </div>
      </Layout>
    );
  }

  if (isError || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <p className="text-muted-foreground">Produto não encontrado.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={handleBack}
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
        <button
          type="button"
          onClick={handleBack}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao catálogo
        </button>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
          {/* Imagem maior */}
          <div className="w-full max-w-[520px] mx-auto overflow-hidden rounded-3xl bg-muted shadow-card">
            <div className="aspect-[4/5]">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
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
              <Badge variant="secondary">{product.category}</Badge>

              {product.stock !== null && !isNaN(product.stock) && (
                <Badge
                  variant={product.stock === 1 ? "default" : "secondary"}
                  className={
                    product.stock === 1
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-amber-500 hover:bg-amber-600 text-white"
                  }
                >
                  <Package className="w-3 h-3 mr-1" />
                  {product.stock === 1 ? "Em Stock" : "Sob Encomenda"}
                </Badge>
              )}
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="text-4xl md:text-5xl font-bold text-primary">{product.price}</p>

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
                  {product.description ? (
                    <div className="space-y-2">
                      {parseDescriptionBullets(product.description).map((text, idx) => (
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