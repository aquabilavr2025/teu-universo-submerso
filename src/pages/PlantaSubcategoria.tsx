import { Navigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import ProductGrid from "@/components/catalog/ProductGrid";
import CatalogBreadcrumbs from "@/components/catalog/CatalogBreadcrumbs";
import { useGoogleSheet } from "@/hooks/useGoogleSheet";
import { PLANT_SUBCATEGORIES } from "@/lib/plantCategories";
import { Link } from "react-router-dom";

const PlantaSubcategoria = () => {
  const { slug } = useParams<{ slug: string }>();
  const subcategory = PLANT_SUBCATEGORIES.find((item) => item.slug === slug);

  const { data: inventory, isLoading, isError, refetch, isFetching } =
    useGoogleSheet(subcategory?.sheet ?? "plantas-vaso");

  if (!subcategory) {
    return <Navigate to="/plantas" replace />;
  }

  return (
    <Layout>
      <PageHero
        title={`Plantas ${subcategory.label}`}
        subtitle={subcategory.subtitle}
      />

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <CatalogBreadcrumbs
            items={[
              { label: "Plantas", href: "/plantas" },
              { label: subcategory.label },
            ]}
          />

          <div className="mb-10 flex flex-wrap gap-2">
            {PLANT_SUBCATEGORIES.map((item) => (
              <Link
                key={item.slug}
                to={`/plantas/${item.slug}`}
                className={`rounded-lg px-4 py-2 text-sm transition-smooth ${
                  item.slug === subcategory.slug
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <ProductGrid
            items={inventory}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching && !isLoading}
            refetch={refetch}
            href={`/plantas/${subcategory.slug}`}
            emptyMessage="Estamos a preparar novos produtos para esta subcategoria. Volta em breve!"
          />
        </div>
      </section>
    </Layout>
  );
};

export default PlantaSubcategoria;
