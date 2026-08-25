import { Link, Navigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import CatalogBreadcrumbs from "@/components/catalog/CatalogBreadcrumbs";
import { LEGACY_PLANT_TABS, PLANT_SUBCATEGORIES } from "@/lib/plantCategories";
import { ArrowRight, FlaskConical, Leaf, Paperclip } from "lucide-react";

const ICONS = {
  "in-vitro": FlaskConical,
  "em-clip": Paperclip,
  "em-vaso": Leaf,
} as const;

const Plantas = () => {
  const [searchParams] = useSearchParams();
  const legacyTab = searchParams.get("tab");

  if (legacyTab && LEGACY_PLANT_TABS[legacyTab]) {
    return <Navigate to={`/plantas/${LEGACY_PLANT_TABS[legacyTab]}`} replace />;
  }

  return (
    <Layout>
      <PageHero
        title="Plantas Aquáticas"
        subtitle="Transforma o teu aquário num jardim subaquático com as nossas plantas naturais."
      />

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <CatalogBreadcrumbs items={[{ label: "Plantas" }]} />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PLANT_SUBCATEGORIES.map((subcategory) => {
              const Icon = ICONS[subcategory.slug as keyof typeof ICONS] ?? Leaf;
              return (
                <Link
                  key={subcategory.slug}
                  to={`/plantas/${subcategory.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-8 transition-smooth hover:shadow-soft"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full gradient-ocean">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>

                  <h2 className="font-heading text-xl font-semibold text-foreground">
                    Plantas {subcategory.label}
                  </h2>

                  <p className="mt-3 flex-1 text-sm text-muted-foreground">
                    {subcategory.subtitle}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Ver plantas
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Plantas;
