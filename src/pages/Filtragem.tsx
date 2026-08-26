import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import ProductGrid from "@/components/catalog/ProductGrid";
import CatalogBreadcrumbs from "@/components/catalog/CatalogBreadcrumbs";
import { useGoogleSheet } from "@/hooks/useGoogleSheet";

const Filtragem = () => {
  const { data: inventory, isLoading, isError, refetch, isFetching } =
    useGoogleSheet("Filtragem");

  return (
    <Layout>
      <PageHero
        title="Filtragem"
        subtitle="Filtros, bombas e massas filtrantes para manter a água do teu aquário sempre cristalina."
      />

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <CatalogBreadcrumbs items={[{ label: "Filtragem" }]} />

          <ProductGrid
            items={inventory ?? []}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching && !isLoading}
            refetch={refetch}
            href="/filtragem"
            emptyMessage="Nenhum produto de filtragem disponível de momento."
          />
        </div>
      </section>
    </Layout>
  );
};

export default Filtragem;
