import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import ProductGrid from "@/components/catalog/ProductGrid";
import CatalogBreadcrumbs from "@/components/catalog/CatalogBreadcrumbs";
import { useGoogleSheet } from "@/hooks/useGoogleSheet";

const JixSobo = () => {
  const { data: inventory, isLoading, isError, refetch, isFetching } =
    useGoogleSheet("Jix/Sobo");

  return (
    <Layout>
      <PageHero
        title="Jix/Sobo"
        subtitle="Equipamento e acessórios das marcas Jix e Sobo, selecionados para o teu aquário."
      />

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <CatalogBreadcrumbs items={[{ label: "Jix/Sobo" }]} />

          <ProductGrid
            items={inventory}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching && !isLoading}
            refetch={refetch}
            href="/jix-sobo"
            emptyMessage="Nenhum produto Jix/Sobo disponível de momento."
          />
        </div>
      </section>
    </Layout>
  );
};

export default JixSobo;
