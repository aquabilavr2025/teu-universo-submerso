import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import ProductCard from "@/components/ui/ProductCard";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";
import { useGoogleSheet } from "@/hooks/useGoogleSheet";
import { AlertCircle, RefreshCw, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestesMedicamentos = () => {
  const { data: inventory, isLoading, isError, refetch, isFetching } = useGoogleSheet("Testes/Medicamentos");

  return (
    <Layout>
      <PageHero
        title="Testes/Medicamentos"
        subtitle="• Kits de teste rigorosos\n• Medicamentos especializados\n• Monitorize a saúde aquática"
      />

      {/* Intro Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FlaskConical className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4 tracking-tight">
              A Química da Água é o Segredo de um Aquário Saudável
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed text-lg">
              Manter os parâmetros da água estáveis — pH, amónia, nitritos e nitratos — é essencial para a saúde e bem-estar dos teus peixes e plantas. 
              Testes regulares permitem-te detetar problemas antes que se tornem críticos, enquanto os medicamentos certos garantem uma resposta rápida e eficaz a doenças comuns. 
              Na AquaBila, encontras tudo o que precisas para manter o teu ecossistema aquático em equilíbrio perfeito.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {isFetching && !isLoading && (
            <div className="flex items-center justify-center gap-2 mb-6 text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span className="text-sm">A atualizar inventário...</span>
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <h3 className="text-lg font-medium mb-2">Erro ao carregar inventário</h3>
              <p className="text-muted-foreground mb-4">
                Não foi possível obter os dados. Por favor, tenta novamente.
              </p>
              <Button onClick={() => refetch()} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Tentar novamente
              </Button>
            </div>
          ) : !inventory || inventory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FlaskConical className="h-16 w-16 text-muted-foreground/40 mb-6" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Em breve</h3>
              <p className="text-muted-foreground max-w-md">
                Os nossos testes e medicamentos estão a ser adicionados. Volta em breve para conferires a nossa gama completa!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {inventory.map((item, index) => (
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

export default TestesMedicamentos;
