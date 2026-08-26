import { ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import ProductGrid from "@/components/catalog/ProductGrid";
import CatalogBreadcrumbs, { Crumb } from "@/components/catalog/CatalogBreadcrumbs";
import { useGoogleSheet, type ProductItem } from "@/hooks/useGoogleSheet";

export interface CategoryPageTemplateProps {
  /** Exact Google Sheet tab name feeding this page. */
  sheet: string;
  title: string;
  subtitle?: string;
  /** Canonical route of the page, used for breadcrumbs and product links. */
  href: string;
  breadcrumbs?: Crumb[];
  emptyMessage?: string;
  /** Optional extra content rendered between the breadcrumbs and the grid. */
  children?: ReactNode;
}

const CategoryPageTemplate = ({
  sheet,
  title,
  subtitle,
  href,
  breadcrumbs,
  emptyMessage = "Nenhum produto disponível de momento.",
  children,
}: CategoryPageTemplateProps) => {
  const { data: inventory, isLoading, isError, refetch, isFetching } =
    useGoogleSheet(sheet);

  const items: ProductItem[] = inventory ?? [];

  return (
    <Layout>
      <PageHero title={title} subtitle={subtitle} />

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <CatalogBreadcrumbs items={breadcrumbs ?? [{ label: title }]} />

          {children}

          <ProductGrid
            items={items}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching && !isLoading}
            refetch={refetch}
            href={href}
            emptyMessage={emptyMessage}
          />
        </div>
      </section>
    </Layout>
  );
};

export default CategoryPageTemplate;
