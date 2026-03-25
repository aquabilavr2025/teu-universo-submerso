import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import ProductCard from "@/components/ui/ProductCard";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";
import { useGoogleSheet } from "@/hooks/useGoogleSheet";
import { AlertCircle, RefreshCw, Leaf, FlaskConical, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const PLANT_CATEGORIES = [
  { id: "plantas-vaso", label: "Plantas em Vaso", icon: Leaf },
  { id: "plantas-vitro", label: "Plantas in Vitro", icon: FlaskConical },
  { id: "plantas-clip", label: "Plantas em Clip", icon: Paperclip },
] as const;

type PlantCategoryId = typeof PLANT_CATEGORIES[number]["id"];

const PlantCategoryContent = ({ categoryId }: { categoryId: PlantCategoryId }) => {
  const { data: inventory, isLoading, isError, refetch, isFetching } = useGoogleSheet(categoryId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
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
    );
  }

  if (!inventory || inventory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <Leaf className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Em breve</h3>
        <p className="text-muted-foreground max-w-md">
          Estamos a preparar novos produtos para esta categoria. Volta em breve!
        </p>
      </div>
    );
  }

  return (
    <>
      {isFetching && (
        <div className="flex items-center justify-center gap-2 mb-6 text-muted-foreground">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span className="text-sm">A atualizar inventário...</span>
        </div>
      )}
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
            />
          </div>
        ))}
      </div>
    </>
  );
};

const Plantas = () => {
  const [activeTab, setActiveTab] = useState<PlantCategoryId>("plantas-vaso");

  return (
    <Layout>
      <PageHero
        title="Plantas Aquáticas"
        subtitle="Transforma o teu aquário num jardim subaquático com as nossas plantas naturais."
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as PlantCategoryId)} className="w-full">
            <TabsList className="w-full max-w-2xl mx-auto mb-10 h-auto flex-wrap bg-muted/50 p-1.5 rounded-xl">
              {PLANT_CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex-1 min-w-[140px] py-3 px-4 gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.label}</span>
                    <span className="sm:hidden">{category.label.split(' ').slice(-1)[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {PLANT_CATEGORIES.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <PlantCategoryContent categoryId={category.id} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Plantas;
