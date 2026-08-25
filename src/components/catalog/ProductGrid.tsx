import ProductCard from "@/components/ui/ProductCard";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import type { ProductItem } from "@/hooks/useGoogleSheet";

interface ProductGridProps {
  items?: ProductItem[];
  isLoading: boolean;
  isError: boolean;
  isFetching?: boolean;
  refetch: () => void;
  href: string;
  emptyMessage?: string;
}

const ProductGrid = ({
  items,
  isLoading,
  isError,
  isFetching,
  refetch,
  href,
  emptyMessage = "Nenhum produto disponível de momento.",
}: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
        <h3 className="mb-2 text-lg font-medium">Erro ao carregar inventário</h3>
        <p className="mb-4 text-muted-foreground">
          Não foi possível obter os dados. Por favor, tenta novamente.
        </p>
        <Button type="button" onClick={refetch} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <p className="text-center text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <>
      {isFetching && (
        <div className="mb-6 flex items-center justify-center gap-2 text-muted-foreground">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span className="text-sm">A atualizar inventário...</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ProductCard
              image={item.image}
              name={item.name}
              price={item.price}
              description={item.description}
              stock={item.stock}
              showAddToCart
              href={href}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
