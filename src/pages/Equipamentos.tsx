import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import ProductCard from "@/components/ui/ProductCard";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";
import { useGoogleSheet } from "@/hooks/useGoogleSheet";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Equipamentos = () => {
  const {
    data: inventory,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGoogleSheet("filtragem e iluminação");

  return (
    <Layout>
      <PageHero
        title="Iluminação e Filtragem"
        subtitle="• Iluminação profissional\n• Sistemas de filtragem eficientes\n• Desempenho sem compromissos"
      />

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          {isFetching && !isLoading && (
            <div className="mb-6 flex items-center justify-center gap-2 text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />

              <span className="text-sm">
                A atualizar inventário...
              </span>
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="mb-4 h-12 w-12 text-destructive" />

              <h3 className="mb-2 text-lg font-medium">
                Erro ao carregar inventário
              </h3>

              <p className="mb-4 text-muted-foreground">
                Não foi possível obter os dados. Por favor, tenta novamente.
              </p>

              <Button
                type="button"
                onClick={() => refetch()}
                variant="outline"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Tentar novamente
              </Button>
            </div>
          ) : !inventory || inventory.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Nenhum equipamento disponível de momento.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {inventory.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="animate-fade-in"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  <ProductCard
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    stock={item.stock}
                    showAddToCart
                    href="/equipamentos"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Equipamentos;